import { motion, AnimatePresence } from "framer-motion";
import { BRAND_ASSETS } from "@/config/assets";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { CONTACT_INFO } from '@/config/contact';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Update active section based on scroll position with mobile-friendly offset
      const sections = ["about", "services", "products", "testimonials", "blog", "faqs", "contact"];
      let currentSection = "";
      
      const offset = window.innerWidth < 768 ? 100 : 150; // Adjusted offset for mobile
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
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
      // Close mobile menu immediately
      setIsMenuOpen(false);
      
      // Get dynamic header height and offset
      const headerHeight = window.innerWidth < 768 ? 64 : 80;
      const mobileOffset = window.innerWidth < 768 ? 16 : 0;
      
      // Calculate position with improved accuracy
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - mobileOffset;

      // Add a small delay to ensure menu is closed before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 50);
    }
  };

  const scrollToTop = () => {
    // Close mobile menu immediately
    setIsMenuOpen(false);
    
    // Add a small delay to ensure menu is closed before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 50);
  };

  // Header animation variants
  const headerVariants = {
    initial: { 
      backgroundColor: "#001B3B",
    },
    scrolled: { 
      backgroundColor: "#001B3B",
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
  const navigation = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "products", label: "Products" },
    { id: "testimonials", label: "Testimonials" },
    { id: "blog", label: "Blog" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate={scrolled ? "scrolled" : "initial"}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-[#001B3B]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="w-32 md:w-40 relative p-2 cursor-pointer"
          >
            <img 
              src={BRAND_ASSETS.LOGO}
              alt="Dreams Air Tech Logo" 
              className="w-full h-full object-contain relative z-10 drop-shadow-lg"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item, i) => (
              <motion.button
                key={item.id}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={i}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  activeSection === item.id ? "text-blue-400" : "text-white"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.a
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              custom={navigation.length}
              href={`tel:${CONTACT_INFO.PHONE}`}
              className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-[#001B3B] transition-colors"
            >
              Contact Us
            </motion.a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 hover:bg-white/10 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#001B3B]"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === item.id
                      ? "text-blue-400 bg-white/10"
                      : "text-white hover:text-blue-400 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={`tel:${CONTACT_INFO.PHONE}`}
                className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-[#001B3B] bg-white hover:bg-white/90 mt-4"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;