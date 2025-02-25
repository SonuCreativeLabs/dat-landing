import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { TestimonialStatus, Testimonial, Database } from '@/integrations/supabase/types';
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Send } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from "./ui/button";
import TestimonialForm from "./TestimonialForm";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { BRAND_ASSETS } from "@/config/assets";

interface TestimonialData {
  id: string;
  created_at: string;
  name: string;
  rating: number;
  message: string;
  status: TestimonialStatus;
  admin_comment?: string;
  archived: boolean;
  service_type?: string;
  location?: string;
  source?: 'justdial' | 'website';
}

type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert'];

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialData }) => {
  const [imageError, setImageError] = useState(false);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-yellow-400 filter drop-shadow-lg" 
        />
      );
    }

    // Add partial star if needed
    if (decimal > 0) {
      stars.push(
        <div key="partial" className="relative w-4 h-4 lg:w-5 lg:h-5">
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${decimal * 100}%` }}>
            <Star className="w-full h-full text-yellow-400 fill-yellow-400 filter drop-shadow-lg" />
          </div>
          <Star className="w-full h-full text-gray-400/30 absolute inset-0" />
        </div>
      );
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400/30" 
        />
      );
    }

    return stars;
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 relative min-h-[280px] lg:min-h-[320px] backdrop-blur-sm border border-white/20 hover:border-white/40 transition-colors"
    >
      {/* JustDial Badge */}
      {testimonial.source === 'justdial' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "absolute top-4 lg:top-6 right-4 lg:right-6 flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full",
            "bg-orange-50 border border-orange-100 shadow-lg hover:shadow-xl transition-shadow"
          )}
        >
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded">
              <img 
                src={BRAND_ASSETS.JUSTDIAL} 
                alt="JustDial" 
                className="w-12 h-6 object-contain"
              />
            </div>
            <span className="text-xs lg:text-sm font-medium text-orange-600">Verified Review</span>
          </div>
        </motion.div>
      )}
      
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 lg:gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-lg"
            >
              <span className="text-xl lg:text-2xl font-bold text-blue-600">
                {testimonial.name.charAt(0)}
              </span>
            </motion.div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">{testimonial.name}</h3>
              <div className="flex items-center gap-2 text-sm lg:text-base text-gray-500 mt-0.5 lg:mt-1">
                {testimonial.service_type && (
                  <span>{testimonial.service_type.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}</span>
                )}
                {testimonial.location && (
                  <>
                    <span>•</span>
                    <span>{testimonial.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-0.5 lg:gap-1">
            {renderStars(testimonial.rating)}
          </div>
        </div>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="absolute -left-2 lg:-left-4 -top-2 text-4xl lg:text-6xl text-blue-500 font-serif"
          >
            "
          </motion.div>
          <p className="text-gray-600 text-base lg:text-lg leading-relaxed relative z-10 pl-2">
            {testimonial.message}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    message: '',
    location: '',
    service_type: 'appliance_rental'
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const testimonialData: Database['public']['Tables']['testimonials']['Insert'] = {
        name: formData.name.trim(),
        rating: Number(formData.rating),
        message: formData.message.trim(),
        status: 'pending' as TestimonialStatus,
        created_at: new Date().toISOString(),
        archived: false,
        location: formData.location,
        service_type: formData.service_type
      };

      const { error: supabaseError } = await supabase
        .from('testimonials')
        .insert(testimonialData);

      if (supabaseError) throw supabaseError;

      setFormData({
        name: '',
        rating: 5,
        message: '',
        location: '',
        service_type: 'appliance_rental'
      });
      setIsModalOpen(false);
      toast.success("Thank you for sharing your experience!");
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error('Failed to submit your testimonial. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="w-full py-12 sm:py-16 bg-[#003366] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <Container className="relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="loader"></div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="testimonials" className="w-full py-12 sm:py-12 bg-gradient-to-b from-[#004b8f] via-[#003D7A] to-[#003366] relative overflow-hidden z-[5] -mt-1">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-6"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            🌟 Client Testimonials
          </h2>
          <p className="text-lg text-white/90">
            We take pride in providing top-notch appliance services that leave our customers satisfied. Here's what some of them have to say:
          </p>
          
          {/* Rating Badge */}
          <motion.a
            href="https://www.justdial.com/Chennai/Dreams-AIR-Tech-Velacheri/044PXX44-XX44-240828150456-T6D3_BZDET"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-white p-2 rounded-lg">
              <img 
                src={BRAND_ASSETS.JUSTDIAL} 
                alt="JustDial" 
                className="w-16 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-white">4.4</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((index) => (
                    <Star 
                      key={index}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400 filter drop-shadow-lg" 
                    />
                  ))}
                  <div className="relative w-5 h-5">
                    <div className="absolute inset-0 overflow-hidden" style={{ width: '40%' }}>
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 filter drop-shadow-lg" />
                    </div>
                    <Star className="w-5 h-5 text-gray-400/30 absolute inset-0" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="font-medium">Verified Reviews</span>
                <span className="text-white/60">•</span>
                <span className="text-white/60">View on Justdial</span>
              </div>
            </div>
          </motion.a>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  {testimonial.location && (
                    <p className="text-sm text-white/80">{testimonial.location}</p>
                  )}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-white/90">{testimonial.message}</p>
              {testimonial.service_type && (
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                    {testimonial.service_type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16 space-y-4"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Join Our Growing Family of Satisfied Customers
          </h3>
          <p className="text-white/90 text-lg mb-6">
            We're committed to delivering exceptional service and building lasting relationships with our clients.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-6 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] 
              text-white rounded-xl font-semibold 
              hover:from-[#38BDF8] hover:to-[#0EA5E9] 
              transition-all duration-300 
              shadow-[0_0_20px_rgba(14,165,233,0.3)] 
              hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]
              hover:-translate-y-0.5"
          >
            Share Your Experience
          </Button>
          <p className="text-white/80 text-sm mt-4">
            Your feedback helps us grow!
          </p>
        </motion.div>

        {/* Share Experience Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Share Your Experience</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsModalOpen(false)}
                    className="hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= formData.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Experience
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Anna Nagar, Chennai"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type
                    </label>
                    <select
                      value={formData.service_type}
                      onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="appliance_sales">Appliance Sales</option>
                      <option value="appliance_service">Appliance Service</option>
                      <option value="appliance_rental">Appliance Rental</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Submit Review
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default Testimonials;