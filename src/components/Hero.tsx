import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import AC3D from "./AC3D";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0EA5E9] via-[#33C3F0] to-[#D3E4FD] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 pointer-events-none" />
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-white/10 text-white rounded-full backdrop-blur-sm">
            Welcome to Dreams Air Tech
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Sales, Service, and Rentals for All Your Appliance Needs!
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Serving homes across Chennai with quality and trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 bg-white text-[#0EA5E9] rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Book a Service
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("rentals")}
              className="px-8 py-3 bg-white/10 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm"
            >
              Explore Rentals
            </motion.button>
          </div>
        </motion.div>
      </div>
      <AC3D />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="w-6 h-6 text-white" />
      </motion.div>
    </section>
  );
};

export default Hero;