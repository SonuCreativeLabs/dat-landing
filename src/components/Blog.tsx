import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Loader2, User, Phone, MapPin, Tag } from 'lucide-react';
import { Container } from './Container';
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

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

// Hardcoded blog posts until Supabase is set up
const defaultPosts = [
  {
    id: '1',
    title: "Top 5 Signs Your AC Needs Repair – Don't Ignore These Warnings!",
    excerpt: 'Learn about the critical warning signs that indicate your AC needs immediate repair. From weak cooling to strange noises, discover when to call a professional.',
    content: `Air conditioners are essential, especially in Chennai's hot and humid weather. However, if your AC is not working efficiently, it might be time for a repair. Here are the top 5 signs that your AC needs servicing before it completely stops working:

1. Weak or No Cooling
• If your AC is running but not cooling the room properly, there could be a gas leak, a dirty filter, or a faulty compressor.
• Solution: Call a professional technician to check and refill the refrigerant gas or clean the clogged filters.

2. Strange Noises Coming from the AC
• A well-functioning AC runs quietly. If you hear grinding, buzzing, or rattling sounds, it could be due to loose parts or a motor issue.
• Solution: Stop using the AC and contact a technician immediately to prevent further damage.

3. High Electricity Bills
• If your electricity bill suddenly spikes without any change in usage, your AC might be overworking due to a clogged filter, leaking gas, or a malfunctioning compressor.
• Solution: Regular AC maintenance and servicing can help reduce power consumption and keep bills low.

4. Unpleasant Smell or Mold Growth
• A musty or burning smell from your AC could indicate mold, bacteria, or burnt wiring.
• Solution: Clean or replace the air filters, and schedule professional AC cleaning to prevent health issues.

5. AC Keeps Turning On and Off
• Frequent on-off cycles (short cycling) can be caused by thermostat issues, dirty condenser coils, or an electrical fault.
• Solution: Get an AC expert to diagnose the issue and prevent long-term damage to the unit.`,
    date: new Date().toISOString(),
    read_time: '5 min read',
    image_url: '/blog/ac-repair-signs.jpg',
    category: 'AC Maintenance',
    keywords: ['AC repair', 'AC maintenance', 'AC problems', 'AC service Chennai'],
    slug: 'top-5-signs-ac-needs-repair',
    status: 'published' as const,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Why Renting an AC is a Smart Choice for Chennai Summers',
    excerpt: 'Discover why renting an AC could be more beneficial than buying one, especially in Chennai\'s climate. Learn about cost savings, maintenance benefits, and flexible rental plans.',
    content: `Are you thinking about buying an AC but worried about the high cost? Renting an AC is an excellent option, especially in Chennai, where summers can be unbearable. Here's why renting an AC from Dreams Air Tech makes more sense:

1. Cost-Effective & Affordable
• Buying an AC can be expensive, with costs going up to ₹40,000 or more. Renting lets you enjoy cooling comfort without high upfront costs.
• Rental plans start at affordable monthly rates, making it budget-friendly.

2. No Maintenance Hassles
• Owning an AC means dealing with servicing, gas refills, and repairs.
• With a rental, we take care of all maintenance & repairs, so you enjoy hassle-free cooling.

3. Flexible Plans
• Whether you need an AC for a month, six months, or a full year, we offer customized rental plans based on your needs.

4. Ideal for Tenants & Temporary Stays
• If you are staying in a rented house or PG, buying an AC might not be the best investment. Renting ensures you stay comfortable without any long-term commitment.

5. Quick Installation & Delivery
• When you rent from Dreams Air Tech, we offer fast installation & doorstep delivery in Chennai. No waiting, no extra charges!`,
    date: new Date().toISOString(),
    read_time: '4 min read',
    image_url: '/blog/ac-rental-benefits.jpg',
    category: 'AC Rental',
    keywords: ['AC rental', 'AC rent Chennai', 'summer cooling', 'cost savings'],
    slug: 'why-renting-ac-smart-choice-chennai-summers',
    status: 'published' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Refrigerator Not Cooling? Common Problems & Quick Fixes',
    excerpt: 'Experiencing issues with your refrigerator\'s cooling? Learn about common problems and their solutions, from dirty condenser coils to faulty thermostats.',
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
    category: 'Refrigerator Maintenance',
    keywords: ['refrigerator repair', 'fridge maintenance', 'cooling problems', 'appliance service'],
    slug: 'refrigerator-not-cooling-common-problems-quick-fixes',
    status: 'published' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Washing Machine Not Working? Common Problems & Quick Fixes!',
    excerpt: 'Discover solutions to common washing machine problems, from startup issues to drainage problems. Learn when to DIY and when to call a professional.',
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
    category: 'Washing Machine Maintenance',
    keywords: ['washing machine repair', 'washing machine problems', 'appliance service', 'washing machine maintenance'],
    slug: 'washing-machine-not-working-common-problems-quick-fixes',
    status: 'published' as const,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Why Renting Appliances is a Smart Choice for Homes & Offices',
    excerpt: 'Explore the benefits of renting home appliances instead of buying. From cost savings to maintenance-free convenience, discover why appliance rental is gaining popularity.',
    content: `Buying home appliances like ACs, refrigerators, washing machines, and water purifiers can be expensive. If you are looking for an affordable, hassle-free alternative, renting appliances is the perfect solution!

Here's why appliance rentals from Dreams Air Tech make sense:

1. Save Money – No Big Upfront Cost!
• Buying an appliance can cost thousands of rupees. When you rent, you only pay a small monthly fee, making it more budget-friendly.
• Perfect for students, working professionals, and short-term tenants.

2. No Maintenance Hassles
• Owning an appliance means spending on servicing, repairs, and gas refills.
• With rented appliances, you don't have to worry about maintenance—we take care of everything!

3. Flexible Rental Plans
• Need an appliance for a few months, a year, or longer? We offer customized rental plans to suit your needs.
• Pay monthly, quarterly, or yearly as per your convenience.

4. Ideal for Temporary Stays
• If you are in Chennai for work or studies, renting is the best choice.
• Avoid the hassle of buying, installing, and reselling appliances when you leave.

5. Quick Installation & Doorstep Delivery
• Get your AC, fridge, washing machine, or water purifier delivered and installed at your doorstep.
• Our fast delivery and hassle-free setup ensure you can start using your appliance immediately.

6. Wide Range of High-Quality Appliances

We offer top brands and models for rent:
✔ Air Conditioners (ACs) – Beat the Chennai heat with our energy-efficient ACs.
✔ Refrigerators – Keep your food fresh with our fridge rentals.
✔ Washing Machines – Say goodbye to laundry stress with our washing machine rental service.
✔ Water Purifiers – Get clean, safe drinking water with our purifier rentals.`,
    date: new Date().toISOString(),
    read_time: '4 min read',
    image_url: '/blog/appliance-rental-benefits.jpg',
    category: 'Appliance Rental',
    keywords: ['appliance rental', 'home appliances', 'rental benefits', 'cost savings', 'maintenance free'],
    slug: 'why-renting-appliances-smart-choice-homes-offices',
    status: 'published' as const,
    created_at: new Date().toISOString(),
  }
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
    <div id="blog" className="bg-gray-50 py-16 sm:py-20 md:py-24 lg:py-32">
      <Container>
        {/* Blog Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Tag className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">Blog</span>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Updates</h2>
          <p className="text-lg text-gray-600">
            Stay informed about the latest trends, tips, and news in home appliance care and maintenance.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl text-white/20">{post.category.charAt(0)}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.read_time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.keywords.slice(0, 3).map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.article>
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
                      <span>{format(new Date(selectedPost.date), 'MMM d, yyyy')}</span>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {selectedPost.category}
                    </span>
                  </div>
                </DialogHeader>

                <div className="prose prose-blue max-w-none">
                  {selectedPost.content.split('\n\n').map((paragraph, index) => (
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
    </div>
  );
};

export default Blog; 