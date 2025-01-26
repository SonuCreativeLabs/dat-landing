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

interface TestimonialProps {
  name: string;
  rating: number;
  comment: string;
  location?: string;
}

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Homeowner",
    content: "Exceptional service! They installed my AC and have been maintaining it perfectly. The rental options are very convenient.",
    rating: 5,
    image: "/testimonials/person1.jpg"
  },
  {
    name: "Priya Sharma",
    role: "Business Owner",
    content: "Great experience with their refrigerator rental service. Professional team and prompt support whenever needed.",
    rating: 5,
    image: "/testimonials/person2.jpg"
  },
  {
    name: "Mohammed Ali",
    role: "Restaurant Owner",
    content: "Their commercial appliance solutions are top-notch. The maintenance service is reliable and efficient.",
    rating: 5,
    image: "/testimonials/person3.jpg"
  },
  {
    name: "Lakshmi Venkat",
    role: "Apartment Resident",
    content: "Very satisfied with their water purifier service. The team is knowledgeable and professional.",
    rating: 5,
    image: "/testimonials/person4.jpg"
  },
  {
    name: "Suresh Patel",
    role: "Property Manager",
    content: "Managing multiple properties becomes easier with their appliance rental and maintenance services.",
    rating: 5,
    image: "/testimonials/person5.jpg"
  }
];

type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert'];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
    location: '',
    service_type: 'rental'
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const { data: testimonials, isLoading, error: queryError } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
      }

      return data || [];
    }
  });

  if (queryError) {
    console.error('Query error:', queryError);
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const scrollAmount = 400; // Adjust this value based on your card width + gap
    const container = containerRef.current;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", handleWheel);
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('Submitting testimonial with data:', formData);
      
      const testimonialData: TestimonialInsert = {
        name: formData.name.trim(),
        rating: Number(formData.rating),
        message: formData.comment.trim(),
        location: (formData.location || 'Chennai').trim(),
        service_type: formData.service_type.trim(),
        status: 'pending'
      };

      console.log('Formatted testimonial data:', testimonialData);

      const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonialData)
        .select();

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Successfully submitted testimonial:', data);

      // Reset form and show success
      setFormData({
        name: '',
        rating: 5,
        comment: '',
        location: '',
        service_type: 'rental'
      });
      setIsModalOpen(false);
      alert('Thank you for your feedback! Your testimonial will be reviewed and published soon.');
    } catch (error) {
      console.error('Error submitting testimonial:', {
        error,
        formData,
        supabaseUrl: supabase.supabaseUrl,
        // Don't log the key for security
        authHeader: 'Bearer [REDACTED]'
      });
      alert('There was an error submitting your testimonial. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section id="testimonials" className="relative py-20 bg-gradient-to-b from-[#0EA5E9] to-[#0284C7]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0EA5E9]/10 via-[#0284C7]/30 to-[#0EA5E9]/80" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <h2 className="text-4xl font-bold text-white">Client Testimonials</h2>
          <p className="text-white/80">
            Hear what our satisfied customers have to say about their experience with Dreams Air Tech.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative px-4"
        >
          <Swiper
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            mousewheel
            keyboard
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {testimonials?.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id || index}>
                <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                      <span className="text-2xl font-semibold text-gray-600">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">{testimonial.location || 'Chennai'}</p>
                      <p className="text-gray-500 text-sm capitalize">{testimonial.service_type}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{testimonial.message}</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-white/90 text-lg mb-6">
            Join our growing family of satisfied customers today!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-white text-[#0EA5E9] rounded-lg font-semibold hover:bg-white/90 transition-all duration-300"
          >
            Share Your Experience
          </button>
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
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
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
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
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
                      <option value="rental">Rental</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="installation">Installation</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Submit Review
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonials;