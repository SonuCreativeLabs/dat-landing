import { Instagram, Mail, MapPin, Phone, Clock, Star } from "lucide-react";
import { CONTACT_INFO } from "@/config/contact";
import { Container } from "./Container";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dreams Air Tech</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for all home appliance needs in Chennai. Professional sales, service, and rental solutions with 24/7 support.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a 
                href="https://www.justdial.com/Chennai/Dreams-AIR-Tech-Velacheri/044PXX44-XX44-240828150456-T6D3_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-yellow-400/50'}`} />
                  ))}
                </div>
                <span>4.4 on JustDial</span>
              </a>
            </div>
            <div className="flex space-x-4 pt-2">
              <a 
                href={CONTACT_INFO.INSTAGRAM} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
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
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#blog" className="text-gray-400 hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="#faqs" className="text-gray-400 hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">AC Sales & Rental</li>
              <li className="text-gray-400">AC Service & Repair</li>
              <li className="text-gray-400">Refrigerator Sales & Rental</li>
              <li className="text-gray-400">Refrigerator Service & Repair</li>
              <li className="text-gray-400">Washing Machine Sales & Rental</li>
              <li className="text-gray-400">Washing Machine Repair</li>
              <li className="text-gray-400">Water Purifier Sales & Rental</li>
              <li className="text-gray-400">Water Purifier Maintenance</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <a href={`tel:${CONTACT_INFO.PHONE}`} className="text-gray-400 hover:text-white transition-colors">
                    {CONTACT_INFO.PHONE}
                  </a>
                  <p className="text-sm text-gray-500">24/7 Support Available</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="text-gray-400 hover:text-white transition-colors">
                    {CONTACT_INFO.EMAIL}
                  </a>
                  <p className="text-sm text-gray-500">Send us your query anytime!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-gray-400">{CONTACT_INFO.ADDRESS.FULL}</p>
                  <p className="text-sm text-gray-500 mt-2">Service Areas: Velachery, OMR, Adyar, Tambaram, and surrounding localities (20km radius from Velachery)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-gray-400">Working Hours</p>
                  <p className="text-sm text-gray-500">Mon - Sun: 9:00 AM - 9:00 PM</p>
                  <p className="text-sm text-gray-500">Emergency Service: 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Dreams Air Tech. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;