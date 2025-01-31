import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Container, Section } from './Container';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Database } from '@/integrations/supabase/types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('date', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <Section id="blog" className="bg-gray-50">
        <Container>
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </Container>
      </Section>
    );
  }

  if (error) {
    console.error('Error loading blog posts:', error);
    return null;
  }

  return (
    <Section id="blog" className="bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Our Blog
          </span>
          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Expert Appliance Tips & Guides
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, maintenance tips, and expert advice on home appliances
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts?.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <span className="mx-3">•</span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {post.read_time}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>

                <button 
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Blog Post Modal */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-3xl">
            {selectedPost && (
              <div className="space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-3xl">{selectedPost.title}</DialogTitle>
                </DialogHeader>

                <div className="relative aspect-video">
                  <img
                    src={selectedPost.image_url}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {selectedPost.category}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(selectedPost.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <span className="mx-3">•</span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {selectedPost.read_time}
                  </div>
                </div>

                <div className="prose prose-blue max-w-none">
                  {selectedPost.content}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  {selectedPost.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Section>
  );
};

export default Blog; 