import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-center h-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-64"
          >
            <img 
              src="/logo.svg" 
              alt="Dreams Air Tech Logo" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
