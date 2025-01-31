import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

type BlogPostStatus = 'draft' | 'published';

interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  image_url: string;
  category: string;
  keywords: string[];
  slug: string;
  status: BlogPostStatus;
}

interface BlogPostFormData {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  image_url: string;
  category: string;
  keywords: string;
  status: BlogPostStatus;
}

const BlogManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    read_time: '',
    image_url: '',
    category: '',
    keywords: '',
    status: 'draft'
  });

  const queryClient = useQueryClient();

  // Fetch blog posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    }
  });

  // Create blog post
  const createMutation = useMutation({
    mutationFn: async (newPost: BlogPostFormData) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          ...newPost,
          slug: newPost.title.toLowerCase().replace(/\s+/g, '-'),
          keywords: newPost.keywords.split(',').map(k => k.trim())
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      setIsDialogOpen(false);
      resetForm();
      toast.success('Blog post created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create blog post');
      console.error('Error creating blog post:', error);
    }
  });

  // Update blog post
  const updateMutation = useMutation({
    mutationFn: async (post: BlogPostFormData) => {
      if (!selectedPost) throw new Error('No post selected for update');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...post,
          slug: post.title.toLowerCase().replace(/\s+/g, '-'),
          keywords: post.keywords.split(',').map(k => k.trim())
        })
        .eq('id', selectedPost.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      setIsDialogOpen(false);
      resetForm();
      toast.success('Blog post updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update blog post');
      console.error('Error updating blog post:', error);
    }
  });

  // Delete blog post
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Blog post deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete blog post');
      console.error('Error deleting blog post:', error);
    }
  });

  // Toggle post status
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BlogPostStatus }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Blog post status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update blog post status');
      console.error('Error updating blog post status:', error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPost) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      read_time: '',
      image_url: '',
      category: '',
      keywords: '',
      status: 'draft'
    });
    setSelectedPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData({
      ...post,
      keywords: post.keywords.join(', ')
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleStatus = (id: string, currentStatus: BlogPostStatus) => {
    const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
    toggleStatusMutation.mutate({ id, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Excerpt</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Enter post excerpt"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter post content"
                  className="min-h-[200px]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Read Time</label>
                  <Input
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    placeholder="e.g., 5 min read"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="Enter image URL"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Enter category"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Keywords</label>
                  <Input
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="Enter keywords (comma-separated)"
                    required
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedPost ? 'Update Post' : 'Create Post'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                    {post.title}
                  </h3>
                  <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                    {post.status}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>{post.read_time}</span>
                </div>
                <div className="pt-4 border-t flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(post)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleStatus(post.id, post.status)}
                  >
                    {post.status === 'draft' ? (
                      <Eye className="w-4 h-4 mr-2" />
                    ) : (
                      <EyeOff className="w-4 h-4 mr-2" />
                    )}
                    {post.status === 'draft' ? 'Publish' : 'Unpublish'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts?.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">No blog posts yet</h3>
          <p className="text-gray-500 mt-2">Create your first blog post to get started</p>
        </div>
      )}
    </div>
  );
};

export default BlogManager; 