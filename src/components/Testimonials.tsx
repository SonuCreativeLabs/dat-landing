import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
import TestimonialForm from "./TestimonialForm";

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["public-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read testimonials from our valued clients about their experiences working with us.
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Testimonials Container */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto space-x-6 pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth mx-8"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-none w-[350px] snap-center"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 h-full transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col relative">
                  {testimonial.location && (
                    <div className="absolute top-6 right-6">
                      <span className="text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                        {testimonial.location}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-semibold text-blue-600">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{testimonial.name}</h3>
                      <div className="text-sm text-gray-500">
                        {testimonial.service_type.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-gray-600 text-base leading-relaxed mb-8 flex-1">{testimonial.message}</p>
                    <div className="flex items-center gap-1 pt-4 border-t border-gray-100">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-200"
                          } transition-colors duration-200`}
                        />
                      ))}
                      <span className="ml-auto text-sm text-gray-500">
                        {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Add Experience Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Share Your Experience
          </Button>
        </div>

        {/* Testimonial Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-12"
          >
            <TestimonialForm />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;