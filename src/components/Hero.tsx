import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import AC3D from "./AC3D";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-300">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4}px`,
                height: `${Math.random() * 4}px`,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2 text-sm font-medium bg-white/10 text-white rounded-full backdrop-blur-md border border-white/20 shadow-lg"
          >
            Welcome to Dreams Air Tech
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white"
          >
            <span className="block mb-2">Sales, Service, and</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Rentals for All Your
            </span>
            <span className="block mt-2">Appliance Needs!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-light"
          >
            Serving homes across Chennai with quality and trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
            >
              Book a Service
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("rentals")}
              className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md border border-white/20 min-w-[200px]"
            >
              Explore Rentals
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Model */}
      <div className="relative z-10">
        <AC3D />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
      >
        <ArrowDown className="w-8 h-8 text-white" />
      </motion.div>

      {/* Add some decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;