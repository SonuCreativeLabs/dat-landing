import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
import TestimonialForm from "./TestimonialForm";
import { User } from "lucide-react";

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
    <div className="w-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400">
      <div className="w-full py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-white/20 text-white rounded-full backdrop-blur-sm"
            >
              Client Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-lg text-white/90 max-w-2xl mx-auto"
            >
              Don't just take our word for it - hear what our satisfied customers have to say
            </motion.p>
          </div>

          <div className="relative px-16 md:px-20">
            <div
              ref={containerRef}
              className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory py-8"
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-none w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] snap-start px-2"
                >
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-blue-100/50 backdrop-blur-sm p-3 rounded-full">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.message}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating ? "text-yellow-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                      <span className="ml-3 text-sm text-gray-500">
                        {new Date(testimonial.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("left")}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-200 border border-white/40"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-200 border border-white/40"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => setShowForm(true)}
              className="bg-white/80 hover:bg-white/90 text-blue-600 backdrop-blur-md px-8 py-4 rounded-xl shadow-lg border border-white/40 font-medium"
            >
              Share Your Experience
            </Button>
          </motion.div>

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
    </div>
  );
};

export default Testimonials;