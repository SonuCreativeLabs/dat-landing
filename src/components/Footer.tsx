import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/config/contact';
import { ASSETS } from '@/config/assets';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 w-fit">
              <img 
                src={ASSETS.LOGO.MINI} 
                alt={ASSETS.LOGO.ALT}
                className="w-20 h-20 object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Dreams Air Tech</h3>
              <p className="text-white/80 mt-2">
                Your trusted partner for all home appliance needs - Sales, Service, and Rentals
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-white/80 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#products" className="text-white/80 hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white/90 shrink-0 mt-1" />
                <div>
                  <p className="text-white/80">{CONTACT_INFO.PHONE}</p>
                  <p className="text-sm text-white/60">Mon-Sat 9am to 8pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white/90 shrink-0 mt-1" />
                <div>
                  <p className="text-white/80">{CONTACT_INFO.EMAIL}</p>
                  <p className="text-sm text-white/60">Online support</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/90 shrink-0 mt-1" />
                <p className="text-white/80">
                  {CONTACT_INFO.ADDRESS.STREET}, {CONTACT_INFO.ADDRESS.AREA}, {CONTACT_INFO.ADDRESS.CITY}
                </p>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/80">
            &copy; {new Date().getFullYear()} Dreams Air Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;