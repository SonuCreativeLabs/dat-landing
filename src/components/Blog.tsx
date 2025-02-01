import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Loader2, User, Phone, MapPin, Tag } from 'lucide-react';
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
import { Button } from "./ui/button";
import { format } from "date-fns";
import { CONTACT_INFO } from '@/config/contact';
import { BLOG_IMAGES } from '@/config/assets';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

// Hardcoded blog posts until Supabase is set up
const defaultPosts = [
  {
    id: '1',
    title: "Top 5 Signs Your AC Needs Professional Repair",
    description: "Learn the warning signs that indicate your air conditioner needs immediate professional attention to avoid costly breakdowns.",
    image: BLOG_IMAGES.AC_REPAIR,
    imageAlt: "Broken air conditioner showing signs of repair needs",
    category: "AC Maintenance",
    readTime: "5 min read",
    content: `Is your air conditioner not performing as well as it used to? Here are 5 warning signs that indicate your AC needs professional repair:

1. Unusual Noises
• Grinding, squealing, or banging sounds indicate mechanical problems
• Clicking noises might mean electrical component issues
• Any new or strange sound should be checked immediately

2. Weak or Warm Air Flow
• Reduced cooling performance
• Air coming out isn't as cold as it should be
• Some rooms are colder than others

3. High Energy Bills
• Sudden spike in electricity consumption
• AC running longer than usual
• Poor efficiency due to potential internal issues

4. Water Leaks
• Water pooling around your indoor unit
• Excessive condensation
• Ice formation on coils

5. Strange Odors
• Musty smell indicating mold growth
• Burning smell suggesting electrical issues
• Any unusual odor requires immediate attention

Don't wait until your AC completely breaks down. Regular maintenance and timely repairs can extend your unit's life and save money in the long run.`,
    date: new Date().toISOString(),
    keywords: ['AC repair', 'AC maintenance', 'air conditioner service', 'AC problems'],
    status: 'published' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: "The Ultimate Guide to Renting an AC in Chennai",
    description: "Everything you need to know about renting an air conditioner in Chennai - from choosing the right model to maintenance tips.",
    image: BLOG_IMAGES.AC_RENTAL,
    imageAlt: "Modern air conditioner rental service",
    category: "AC Rental",
    readTime: "7 min read",
    content: `Looking to rent an AC in Chennai? Here's your comprehensive guide to making the right choice:

1. Choosing the Right AC Type
• Window AC: Perfect for single rooms
• Split AC: Ideal for larger spaces
• Portable AC: Great for temporary cooling needs

2. Determining the Right Capacity
• Up to 150 sq ft: 1 ton AC
• 150-250 sq ft: 1.5 ton AC
• Above 250 sq ft: 2 ton or higher

3. Rental Terms & Benefits
• Flexible rental periods
• Free installation and maintenance
• No long-term commitments
• Cost-effective cooling solution

4. Maintenance & Support
• Regular servicing included
• 24/7 technical support
• Quick replacement if needed
• Professional cleaning services

5. Cost Considerations
• Monthly rental fees
• Security deposit
• Electricity consumption
• Installation charges (if any)

6. Why Choose Dreams Air Tech?
• Premium AC brands
• Expert installation
• Regular maintenance
• Reliable customer support
• Competitive pricing

Contact us today to find the perfect AC rental solution for your needs!`,
    date: new Date().toISOString(),
    keywords: ['AC rental', 'air conditioner rent', 'AC services Chennai', 'cooling solutions'],
    status: 'published' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: "Why Renting Appliances Makes Sense for Modern Homes",
    description: "Discover the benefits of renting home appliances and how it can be a smart financial decision for your household.",
    image: BLOG_IMAGES.APPLIANCE_RENTAL,
    imageAlt: "Modern household appliances for rent",
    category: "Appliance Rental",
    readTime: "6 min read",
    content: `Thinking about renting appliances instead of buying? Here's why it might be the smart choice for your home:

1. Financial Benefits
• No large upfront costs
• Predictable monthly expenses
• No maintenance or repair costs
• Tax benefits for businesses

2. Latest Technology Access
• Regular upgrades available
• Try before you buy
• Access to premium brands
• Stay up-to-date with technology

3. Maintenance & Support
• Professional servicing included
• Quick repairs or replacements
• Regular maintenance checks
• Extended warranty coverage

4. Flexibility
• Short-term commitments
• Easy upgrades
• Relocation support
• Seasonal usage options

5. Available Appliances
• Air Conditioners
• Refrigerators
• Washing Machines
• Water Purifiers
• Microwave Ovens

6. Perfect For
• Temporary residents
• Students
• Young professionals
• Small businesses
• Home offices

Contact Dreams Air Tech today to explore our appliance rental options!`,
    date: new Date().toISOString(),
    keywords: ['appliance rental', 'home appliances', 'rental services', 'modern living'],
    status: 'published' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Refrigerator Not Cooling? Common Problems & Quick Fixes',
    description: 'Experiencing issues with your refrigerator\'s cooling? Learn about common problems and their solutions, from dirty condenser coils to faulty thermostats.',
    image: BLOG_IMAGES.REFRIGERATOR_REPAIR,
    imageAlt: "Refrigerator repair and maintenance guide",
    category: 'Refrigerator Maintenance',
    readTime: '6 min read',
    content: `Is your refrigerator not cooling properly? A non-functional fridge can spoil food, waste money, and cause inconvenience. Here are some common reasons why your fridge isn't cooling and how you can fix it:

1. Dirty or Blocked Condenser Coils
• Problem: Dust buildup on the condenser coils can reduce cooling efficiency.
• Fix: Clean the coils using a vacuum or a dry cloth to improve cooling performance.

2. Overloaded Fridge
• Problem: Storing too many items blocks airflow, preventing cold air from circulating.
• Fix: Remove excess food and ensure air can flow freely inside.

3. Faulty Thermostat
• Problem: If the thermostat is set too low or is faulty, the fridge may not cool properly.
• Fix: Adjust the thermostat settings and test if cooling improves. If not, the thermostat may need replacement.

4. Broken Door Seal (Gasket Issue)
• Problem: A loose or damaged door seal allows cold air to escape, making the fridge warm.
• Fix: Inspect the seal and replace it if necessary. You can test by placing a paper between the door—if it slips out easily, the seal needs to be changed.

5. Low Refrigerant (Gas Leak)
• Problem: If your fridge is not cooling at all, it could be due to low refrigerant levels.
• Fix: A professional technician must refill the gas and check for leaks.`,
    date: new Date().toISOString(),
    read_time: '6 min read',
    image_url: '/blog/fridge-repair-guide.jpg',
    keywords: ['refrigerator repair', 'fridge maintenance', 'cooling problems', 'appliance service'],
    slug: 'refrigerator-not-cooling-common-problems-quick-fixes',
    status: 'published' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Washing Machine Not Working? Common Problems & Quick Fixes!',
    description: 'Discover solutions to common washing machine problems, from startup issues to drainage problems. Learn when to DIY and when to call a professional.',
    image: BLOG_IMAGES.WASHING_MACHINE_REPAIR,
    imageAlt: "Professional washing machine repair service",
    category: 'Washing Machine Maintenance',
    readTime: '5 min read',
    content: `A washing machine breakdown can be frustrating, especially when you have a pile of laundry waiting. If your washing machine isn't working properly, don't worry! Here are some common washing machine problems and how you can fix them.

1. Washing Machine Won't Start
• Problem: If your machine doesn't turn on, it could be due to a faulty power connection, damaged power cord, or a broken control board.
• Fix:
• Check if the power supply is properly connected.
• Test the socket with another device to see if it's working.
• If the power cord is fine, you may need a technician to inspect the control board.

2. Water Not Draining Properly
• Problem: If the water remains in the drum after a wash cycle, there may be a clogged drain hose or a faulty drain pump.
• Fix:
• Check if the drain hose is blocked with lint, small objects, or dirt.
• Clean the drain filter regularly to prevent clogging.
• If the issue persists, you may need a drain pump repair or replacement.

3. Washing Machine Making Loud Noise or Vibrating
• Problem: If your washing machine is too noisy or shaking excessively, the drum might be unbalanced, or there could be a loose part inside.
• Fix:
• Make sure your washing machine is placed on a level surface.
• Do not overload the machine with too many clothes.
• If the noise continues, a technician can inspect the drum and bearings.

4. Clothes Are Not Cleaning Properly
• Problem: If your clothes come out dirty after washing, it could be due to low detergent, hard water deposits, or a dirty drum.
• Fix:
• Use the right amount of detergent based on the load size.
• Clean the drum by running an empty cycle with hot water and vinegar.
• If your area has hard water, consider installing a water softener for better cleaning.

5. Water Leaking from the Machine
• Problem: Water leakage can be due to a loose hose, worn-out door seal, or a damaged pump.
• Fix:
• Check if the hose connections are tight and not leaking.
• Inspect the rubber door gasket for cracks or dirt buildup.
• If the leakage continues, a technician can replace the damaged parts.`,
    date: new Date().toISOString(),
    read_time: '5 min read',
    image_url: '/blog/washing-machine-repair.jpg',
    keywords: ['washing machine repair', 'washing machine problems', 'appliance service', 'washing machine maintenance'],
    slug: 'washing-machine-not-working-common-problems-quick-fixes',
    status: 'published' as const,
    created_at: new Date().toISOString(),
  },
];

const getCTAContent = (category: string) => {
  switch (category) {
    case 'AC Maintenance':
      return {
        title: "Need AC Repair? Contact Dreams Air Tech Today!",
        description: "If your AC shows any of these signs, don't wait for a breakdown. Call Dreams Air Tech today for quick and reliable AC repair services in Chennai!"
      };
    case 'AC Rental':
      return {
        title: "Need an AC on Rent? Book Now!",
        description: "Stay cool this summer with our affordable AC rental services. Contact us today!"
      };
    case 'Refrigerator Maintenance':
      return {
        title: "Need Refrigerator Repair? Call Dreams Air Tech!",
        description: "If your refrigerator isn't cooling, don't wait for food to spoil! Our expert technicians can fix the issue quickly and affordably."
      };
    case 'Washing Machine Maintenance':
      return {
        title: "Need a Washing Machine Repair? Contact Dreams Air Tech Today!",
        description: "If your washing machine is not working properly, don't wait for a major breakdown. Our expert technicians can fix any issue quickly and affordably."
      };
    case 'Appliance Rental':
      return {
        title: "Looking for Appliance Rentals? Contact Us Today!",
        description: "Enjoy hassle-free rentals with quick installation and free servicing."
      };
    default:
      return {
        title: "Need Professional Appliance Services? Contact Us Today!",
        description: "Our expert technicians are ready to help with all your appliance needs."
      };
  }
};

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const { data: posts = defaultPosts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        return defaultPosts;
      }
      return data.length > 0 ? data : defaultPosts;
    }
  });

  if (isLoading) {
    return (
      <div id="blog" className="bg-gray-50">
        <Container>
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <Section className="bg-gray-50" id="blog">
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Latest from Our Blog
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Expert tips, guides, and insights about AC maintenance, appliance care, and smart rental solutions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-[#f8f9fa]" />
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="w-full h-full transform hover:scale-105 transition-transform duration-300"
                  style={{
                    objectFit: post.category === 'AC Rental' ? 'cover' : 
                             post.category === 'Washing Machine Maintenance' ? 'contain' : 'cover',
                    objectPosition: post.category === 'Washing Machine Maintenance' ? 'center' : 'center',
                    padding: post.category === 'Washing Machine Maintenance' ? '0.5rem' : '0',
                    backgroundColor: post.category === 'Refrigerator Maintenance' ? '#ffffff' :
                                   post.category === 'Washing Machine Maintenance' ? '#ffffff' :
                                   post.category === 'AC Maintenance' ? '#e9ecef' :
                                   post.category === 'Appliance Rental' ? '#f8f9fa' : '#ffffff'
                  }}
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2 flex-1">{post.description}</p>
                <button 
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors mt-auto group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost(post);
                  }}
                >
                  Read More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog Post Modal */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedPost && (
              <div className="space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-3xl">{selectedPost.title}</DialogTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedPost.read_time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {(() => {
                          try {
                            return format(new Date(selectedPost.date), 'MMM d, yyyy');
                          } catch (error) {
                            return 'Date not available';
                          }
                        })()}
                      </span>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {selectedPost.category}
                    </span>
                  </div>
                </DialogHeader>

                <div className="prose prose-blue max-w-none">
                  {(selectedPost.content || '').split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}

                  {/* CTA Section */}
                  <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                    {(() => {
                      const cta = getCTAContent(selectedPost.category);
                      return (
                        <>
                          <h3 className="text-xl font-semibold text-blue-900 mb-4">
                            {cta.title}
                          </h3>
                          <p className="text-blue-700 mb-6">
                            {cta.description}
                          </p>
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center gap-3 text-blue-600">
                              <Phone className="w-5 h-5 text-blue-500" />
                              <a
                                href={`tel:${CONTACT_INFO.PHONE}`}
                                className="font-semibold hover:text-blue-700"
                              >
                                Call Us Now: {CONTACT_INFO.PHONE}
                              </a>
                            </div>
                            <span className="text-gray-400">•</span>
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <MapPin className="w-5 h-5 text-blue-500" />
                              <span>Serving: Velachery, OMR, Adyar, Tambaram, and surrounding localities. We cover a service radius of 20km from Velachery.</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
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

        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience Our Professional Services?
          </h3>
          <p className="text-gray-600 text-lg mb-8">
            Book your service now and get expert assistance for all your appliance needs
          </p>
          <a
            href={`tel:${CONTACT_INFO.PHONE}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            <Phone className="w-6 h-6" />
            Book Your Service
          </a>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Blog; 