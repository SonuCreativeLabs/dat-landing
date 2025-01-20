import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type ContactSubmission = Database['public']['Tables']['contact_submissions']['Insert'];

const Contact = () => {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });

      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Get in Touch with Us
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-gray-600">info@dreamsairtech.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MessageSquare className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6 bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl"
            onSubmit={handleSubmit}
          >
            <Input
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white/80"
            />
            <Input
              placeholder="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-white/80"
            />
            <Textarea
              placeholder="Your Message"
              className="min-h-[120px] bg-white/80"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit Inquiry"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;