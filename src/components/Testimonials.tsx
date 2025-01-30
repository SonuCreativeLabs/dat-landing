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

interface TestimonialProps {
  name: string;
  rating: number;
  comment: string;
  location?: string;
}

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
    message: '',
    location: '',
    service_type: 'appliance_rental'
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const { data: testimonials, isLoading, error: queryError } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved')
        .eq('archived', false)
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
        message: formData.message.trim(),
        status: 'pending',
        created_at: new Date().toISOString(),
        archived: false,
        location: formData.location,
        service_type: formData.service_type
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

      setFormData({
        name: '',
        rating: 5,
        message: '',
        location: '',
        service_type: 'appliance_rental'
      });
      setIsModalOpen(false);
      toast.success("Message sent successfully!", {
        duration: 3000,
        position: "top-center",
        className: "bg-white text-gray-900",
      });
    } catch (error: any) {
      console.error('Error submitting testimonial:', {
        error,
        formData,
      });
      toast.error(error?.message || 'There was an error submitting your testimonial. Please try again.');
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
          
          {/* Enhanced Justdial Rating Badge */}
          <div className="flex items-center justify-center gap-4">
            <motion.a
              href="https://www.justdial.com/Chennai/Dreams-AIR-Tech-Velacheri/044PXX44-XX44-240828150456-T6D3_BZDET"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-white/90 p-2 rounded-lg">
                <img src="/justdial-logo.png" alt="Justdial" className="w-6 h-6" />
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">4.4</span>
                  <div className="flex">
                    {[1, 2, 3, 4].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 text-yellow-400 fill-current drop-shadow" 
                      />
                    ))}
                    <div className="relative">
                      <Star className="w-5 h-5 text-gray-400/30 fill-current" />
                      <div className="absolute inset-0 overflow-hidden w-[40%]">
                        <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="font-medium">76 Reviews</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/60">View on Justdial</span>
                  <svg
                    className="w-4 h-4 text-white/60 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </motion.a>
          </div>

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
            {testimonials?.map((testimonial: TestimonialData) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                      <span className="text-2xl font-semibold text-gray-600">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
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
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-800">Share Your Experience</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
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