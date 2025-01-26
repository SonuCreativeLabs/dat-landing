import { motion } from "framer-motion";
import { BRAND_ASSETS } from "@/config/assets";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-40"
          >
            <img 
              src={BRAND_ASSETS.LOGO}
              alt="Dreams Air Tech Logo" 
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-8"
          >
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-600 hover:text-[#0EA5E9] transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-gray-600 hover:text-[#0EA5E9] transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-600 hover:text-[#0EA5E9] transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-gray-600 hover:text-[#0EA5E9] transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284C7] transition-colors"
            >
              Contact Us
            </button>
          </motion.nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-4 bg-white border-t border-gray-100"
          >
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:text-[#0EA5E9] hover:bg-gray-50 transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:text-[#0EA5E9] hover:bg-gray-50 transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:text-[#0EA5E9] hover:bg-gray-50 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:text-[#0EA5E9] hover:bg-gray-50 transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-2 bg-[#0EA5E9] text-white hover:bg-[#0284C7] transition-colors mx-4 rounded-lg"
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
