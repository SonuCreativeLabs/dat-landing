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
    <div className="w-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-6 py-2 mb-6 text-sm font-medium bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/30"
            >
              Client Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              Don't just take our word for it - hear what our satisfied customers have to say about their experience with us
            </motion.p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative px-8 md:px-12">
            <div
              ref={containerRef}
              className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-8"
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-none w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] snap-start px-2"
                >
                  <div
                    className="bg-gradient-to-br from-white/95 via-white/90 to-white/80 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-white/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 h-full flex flex-col relative overflow-hidden group hover:-translate-y-1"
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl">
                      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 via-transparent to-transparent rotate-12 transform origin-top-left group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-100/20 via-transparent to-transparent -rotate-12 transform origin-bottom-right group-hover:scale-150 transition-transform duration-500"></div>
                    </div>
                    
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white p-3 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 relative">
                          <div className="absolute inset-0 rounded-full bg-blue-200/20 animate-pulse"></div>
                          <User className="w-5 h-5 text-blue-600 relative z-10" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1 text-lg">{testimonial.name}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{testimonial.location}</p>
                        </div>
                      </div>
                      <div className="mb-8 flex-grow">
                        <div className="text-blue-600 mb-4 transform -translate-x-2">
                          <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                          </svg>
                        </div>
                        <p className="text-gray-600 leading-relaxed italic text-base lg:text-lg line-clamp-4 font-light">{testimonial.message}</p>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100/50">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`h-5 w-5 transform transition-transform group-hover:scale-110 ${
                                i < testimonial.rating ? "text-yellow-400" : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 font-medium">
                          {new Date(testimonial.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("left")}
              className="absolute -left-2 md:left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl text-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-50 hover:scale-110 transition-all duration-200 border border-white/40 z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-2 md:right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl text-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-50 hover:scale-110 transition-all duration-200 border border-white/40 z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-16"
          >
            <Button
              onClick={() => setShowForm(true)}
              className="bg-white/90 hover:bg-white text-blue-600 backdrop-blur-xl px-8 py-4 rounded-xl shadow-lg border border-white/40 font-medium hover:scale-105 transition-all duration-300"
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