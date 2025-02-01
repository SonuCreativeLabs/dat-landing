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
              Your trusted partner for all home appliance needs in Chennai. We offer professional sales, service, and rental solutions with 24/7 support.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <h4 className="text-sm font-medium text-gray-300">Customer Rating</h4>
              <a 
                href="https://www.justdial.com/Chennai/Dreams-AIR-Tech-Velacheri/044PXX44-XX44-240828150456-T6D3_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                    <div className="relative w-4 h-4">
                      <div className="absolute inset-0 overflow-hidden" style={{ width: '40%' }}>
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                      <Star className="w-4 h-4 text-gray-600/20" />
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors">4.4 on JustDial</span>
                </div>
                <span className="text-sm text-gray-500 mt-1 block">(Verified Reviews)</span>
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
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <a href={`tel:${CONTACT_INFO.PHONE}`} className="text-gray-400 hover:text-white transition-colors">
                    {CONTACT_INFO.PHONE}
                  </a>
                  <p className="text-sm text-gray-500">24/7 Support Available</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="text-gray-400 hover:text-white transition-colors">
                    {CONTACT_INFO.EMAIL}
                  </a>
                  <p className="text-sm text-gray-500">Send us your query anytime!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">{CONTACT_INFO.ADDRESS.FULL}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex-shrink-0" /> {/* Spacer for alignment */}
                <div>
                  <p className="text-gray-400 text-sm">
                    Service Areas: Velachery, Adyar, OMR, Tambaram, and Guindy, among others. For a complete list of locations, visit our{' '}
                    <a href="#about" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Areas We Serve
                    </a>{' '}
                    page.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
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