import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent to-white px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary-foreground rounded-full">
            Welcome to Dreams Air Tech
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Sales, Service, and Rentals for All Your Appliance Needs!
          </h1>
          <p className="text-lg sm:text-xl text-secondary-foreground mb-8 max-w-2xl mx-auto">
            Serving homes across Chennai with quality and trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Book a Service
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("rentals")}
              className="px-8 py-3 bg-accent text-primary-foreground rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Explore Rentals
            </motion.button>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="w-6 h-6 text-primary-foreground" />
      </motion.div>
    </section>
  );
};

export default Hero;