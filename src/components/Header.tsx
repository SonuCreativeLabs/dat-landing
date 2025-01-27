import { motion, AnimatePresence } from "framer-motion";
import { BRAND_ASSETS } from "@/config/assets";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Update active section based on scroll position with offset
      const sections = ["about", "services", "products", "testimonials", "contact"];
      let currentSection = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjusted offset for better section detection
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Add offset for header height
      const headerHeight = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
    setActiveSection(id);
  };

  // Header animation variants
  const headerVariants = {
    initial: { 
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
    },
    scrolled: { 
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(16px)",
    },
  };

  // Navigation item variants
  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  // Navigation items
  const navItems = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "products", label: "Products" },
    { id: "testimonials", label: "Testimonials" },
  ];

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate={scrolled ? "scrolled" : "initial"}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/30"
      style={{
        boxShadow: scrolled 
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" 
          : "0 2px 4px rgba(255, 255, 255, 0.2)",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(10px)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(10px)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo with enhanced visibility */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="w-40 relative p-2"
          >
            <div className="absolute inset-0 bg-white/60 rounded-lg filter blur-md" />
            <img 
              src={BRAND_ASSETS.LOGO}
              alt="Dreams Air Tech Logo" 
              className="w-full h-full object-contain relative z-10 drop-shadow-lg"
            />
          </motion.div>

          {/* Desktop Navigation with enhanced text */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                custom={i}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                onClick={() => scrollToSection(item.id)}
                className={`relative text-gray-900 font-semibold hover:text-[#0EA5E9] transition-colors ${
                  activeSection === item.id ? "text-[#0EA5E9]" : ""
                }`}
              >
                <span className="relative z-10 drop-shadow-sm">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0EA5E9] shadow-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            
            {/* Contact Button with enhanced visibility */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 4px 15px rgba(14, 165, 233, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2.5 bg-[#0EA5E9] text-white rounded-lg flex items-center space-x-2 hover:bg-[#0284C7] transition-colors relative overflow-hidden shadow-lg"
              style={{
                background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
              }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
              <span className="relative z-10 font-semibold">Contact Us</span>
              <ChevronRight className="w-4 h-4 relative z-10" />
            </motion.button>
          </nav>

          {/* Mobile Menu Button with enhanced visibility */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-900 p-2 relative"
          >
            <div className="absolute inset-0 bg-white/60 rounded-lg filter blur-sm" />
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation with enhanced visibility */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-white/30 shadow-lg"
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 text-gray-900 font-medium hover:text-[#0EA5E9] hover:bg-white/70 transition-colors ${
                    activeSection === item.id ? "text-[#0EA5E9] bg-white/50" : ""
                  }`}
                >
                  <span className="flex items-center">
                    <ChevronRight className={`w-4 h-4 mr-2 transition-transform ${
                      activeSection === item.id ? "rotate-90" : ""
                    }`} />
                    {item.label}
                  </span>
                </motion.button>
              ))}
              
              {/* Mobile Contact Button with enhanced visibility */}
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={() => scrollToSection("contact")}
                className="w-full px-4 py-3 mt-2 mb-4 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white hover:from-[#0284C7] hover:to-[#0EA5E9] transition-all mx-4 rounded-lg relative overflow-hidden shadow-lg"
                style={{ maxWidth: "calc(100% - 2rem)" }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center font-semibold">
                  Contact Us
                  <ChevronRight className="w-4 h-4 ml-2" />
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
