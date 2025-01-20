import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
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
        .from("contact_submissions")
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#D3E4FD] to-white" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-[#0EA5E9] mb-6"
          >
            Get in Touch with Us
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8 bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-[#0EA5E9]" />
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-[#0EA5E9]" />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-gray-600">info@dreamsairtech.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MessageSquare className="w-6 h-6 text-[#0EA5E9]" />
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <Input
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Textarea
              placeholder="Your Message"
              className="min-h-[120px]"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white transition-colors"
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