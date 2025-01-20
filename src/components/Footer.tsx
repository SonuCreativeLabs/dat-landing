import { Facebook, Instagram, Twitter, Youtube, Phone } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0EA5E9] to-[#0284C7] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Dreams Air Tech</h3>
            <p className="text-sm opacity-90">
              Your trusted partner for home appliance sales, service, and rentals in Chennai.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Services
                </a>
              </li>
              <li>
                <a href="#rentals" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Rentals
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm opacity-90">Phone: +91 98765 43210</p>
            <p className="text-sm opacity-90">Email: info@dreamsairtech.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white/80 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          <Button 
            variant="secondary"
            size="lg"
            className="animate-fade-up bg-white text-[#0EA5E9] hover:bg-white/90 hover:text-[#0284C7] transition-all duration-300 shadow-lg"
            onClick={() => window.location.href = 'tel:+919876543210'}
          >
            <Phone className="mr-2 h-5 w-5" />
            Call Us Now: +91 98765 43210
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-sm opacity-90">
            © {new Date().getFullYear()} Dreams Air Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;