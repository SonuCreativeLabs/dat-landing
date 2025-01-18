import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary-foreground rounded-full">
            Welcome to Dreams Air Tech
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Transform Your Home with Smart Appliances
          </h1>
          <p className="text-lg sm:text-xl text-secondary-foreground mb-8 max-w-2xl mx-auto">
            Experience comfort and convenience with our premium range of home appliances. Sales, service, and rentals all in one place.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            Explore Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;