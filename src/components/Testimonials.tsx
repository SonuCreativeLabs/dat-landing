import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import TestimonialForm from "./TestimonialForm";
import { motion } from "framer-motion";
import type { Database } from "@/integrations/supabase/types";

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

const Testimonials = () => {
  const [showForm, setShowForm] = useState(false);

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["approved-testimonials"],
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

  if (isLoading || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-4 text-lg text-gray-600"
          >
            Read testimonials from our satisfied customers
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 flex-grow">{testimonial.message}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500 capitalize">
                  {testimonial.service_type.replace(/_/g, ' ')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
    </section>
  );
};

export default Testimonials;