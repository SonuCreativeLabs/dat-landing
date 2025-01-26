import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden w-full">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 w-full">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                animation: `twinkle ${Math.random() * 4 + 2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8"
          >
            <img 
              src="/logo.svg" 
              alt="Dreams Air Tech Logo" 
              className="w-full h-full object-contain drop-shadow-2xl" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
              <span className="block mb-2 text-white/90">Sales, Service, and</span>
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Rentals for All Your
              </span>
              <span className="block mt-2 text-white/90">Appliance Needs!</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light tracking-wide"
            >
              Serving homes across Chennai with quality and trust.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[200px] backdrop-blur-sm hover:bg-blue-50"
            >
              Book a Service
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("rentals")}
              className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-md border border-white/20 min-w-[200px] hover:bg-white/20"
            >
              Explore Rentals
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
      >
        <ArrowDown className="w-8 h-8 text-white/70 hover:text-white transition-colors" />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full filter blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;