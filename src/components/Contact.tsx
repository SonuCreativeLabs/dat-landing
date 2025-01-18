import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Phone, Mail, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6"
          >
            Get in Touch with Us
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-secondary-foreground">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-secondary-foreground">info@dreamsairtech.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MessageSquare className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-secondary-foreground">+91 98765 43210</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input placeholder="Your Name" />
            <Input placeholder="Phone Number" type="tel" />
            <Textarea placeholder="Your Message" className="min-h-[120px]" />
            <Button type="submit" className="w-full">
              Submit Inquiry
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;