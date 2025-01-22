import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type TestimonialInsert = Tables["testimonials"]["Insert"];

const SERVICE_TYPES = [
  "AC Service/Repair",
  "AC Installation",
  "AC Rental",
  "Refrigerator Service/Repair",
  "Refrigerator Rental",
  "Washing Machine Service/Repair",
  "Washing Machine Rental",
  "Water Purifier Service/Repair",
  "Water Purifier Rental",
  "Annual Maintenance Contract",
  "Other"
] as const;

const TestimonialForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState<Omit<TestimonialInsert, "id" | "status" | "created_at" | "updated_at">>({
    name: "",
    service_type: "",
    message: "",
    rating: 0,
    location: "",
    image: null
  });

  const isFormValid = formData.name && formData.service_type && formData.message && formData.location && rating > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!isFormValid) {
        throw new Error("Please fill in all fields and provide a rating");
      }

      console.log("Submitting testimonial:", { ...formData, rating });

      const { data, error } = await supabase
        .from("testimonials")
        .insert({
          ...formData,
          rating,
          status: "pending",
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw new Error("Failed to submit review. Please try again.");
      }

      console.log("Testimonial submitted successfully:", data);

      toast.success("Thank you for your review! It will be published after moderation.", {
        duration: 5000
      });

      // Reset form
      setFormData({
        name: "",
        service_type: "",
        message: "",
        rating: 0,
        location: "",
        image: null
      });
      setRating(0);
      
      // Reset form fields
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Share Your Experience</h3>
        <p className="text-gray-600 mt-2">
          Your review helps others choose reliable appliance services
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Your Location *
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="T. Nagar, Chennai"
          />
        </div>

        <div>
          <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">
            Service Used *
          </label>
          <select
            name="service_type"
            id="service_type"
            value={formData.service_type}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a service</option>
            {SERVICE_TYPES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate Our Service *
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Your Review *
          </label>
          <textarea
            name="message"
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Tell us about your experience with our service (e.g., technician's professionalism, service quality, timeliness)"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TestimonialForm;