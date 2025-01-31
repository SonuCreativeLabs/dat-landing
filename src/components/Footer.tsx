import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/config/contact";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dreams Air Tech</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner for all home appliance needs in Chennai. Professional sales, service, and rental solutions.
            </p>
            <div className="flex space-x-4">
              <a href={CONTACT_INFO.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition-colors">Products</a>
              </li>
              <li>
                <a href="#blog" className="text-gray-400 hover:text-white transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">AC Service & Repair</li>
              <li className="text-gray-400">Refrigerator Service</li>
              <li className="text-gray-400">Washing Machine Repair</li>
              <li className="text-gray-400">Water Purifier Maintenance</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-gray-400">{CONTACT_INFO.PHONE}</p>
                  <p className="text-sm text-gray-500">24/7 Support Available</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-gray-400">{CONTACT_INFO.EMAIL}</p>
                  <p className="text-sm text-gray-500">Send us your query anytime!</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                <p className="text-gray-400">
                  {CONTACT_INFO.ADDRESS.FULL}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Dreams Air Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;