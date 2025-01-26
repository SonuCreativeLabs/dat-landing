import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { motion, useAnimation } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SupabaseTest from "@/components/SupabaseTest";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SupabaseTest />
      <Hero />
      <AboutUs />
      <AnnouncementBanner />
      <Services />
      
      {/* Rental Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
            >
              Our Products
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            >
              Available for Rent
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Explore our range of high-quality appliances available for rent
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <ProductCard
              title="Air Conditioners"
              description="Stay cool with our energy-efficient AC units. We offer window ACs and split ACs from trusted brands."
              price="₹1,499"
              features={[
                "Latest models from top brands",
                "Energy-efficient 3-star & 5-star",
                "Professional installation",
              ]}
            />
            <ProductCard
              title="Refrigerators"
              description="Keep your food fresh with our modern refrigerators. Choose from single-door and double-door options."
              price="₹999"
              features={[
                "Multiple sizes (180L to 565L)",
                "Energy star rated models",
                "Advanced cooling technology",
              ]}
            />
            <ProductCard
              title="Washing Machines"
              description="Make laundry day easier with our fully-automatic washing machines. Front-load and top-load options."
              price="₹799"
              features={[
                "Front & top load options",
                "6kg to 9kg capacity",
                "Water & energy efficient",
              ]}
            />
            <ProductCard
              title="Water Purifiers"
              description="Ensure safe and clean drinking water with our RO+UV water purifiers. Advanced filtration technology."
              price="₹599"
              features={[
                "RO+UV+UF purification",
                "7-stage filtration",
                "TDS controller",
              ]}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button
              onClick={() => window.location.href = 'tel:+919876543210'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Phone className="w-6 h-6" />
              Call Now to Rent Your Appliance
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <Testimonials />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
          <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white opacity-20" />
          <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-white opacity-20" />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-white opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-white/20 text-white rounded-full backdrop-blur-sm"
              >
                Get in Touch
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold text-white mb-4"
              >
                Contact Us
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-lg text-blue-100 max-w-2xl mx-auto"
              >
                Have questions about our services? We'd love to hear from you. 
                Send us a message and we'll get back to you shortly.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 backdrop-blur-sm bg-white/95"
            >
              <div className="grid md:grid-cols-5 gap-8">
                {/* Contact Info */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Information</h3>
                    <p className="text-gray-600">Fill out the form and we will get back to you within 24 hours.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span>+91 6379496755</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span>dreamsairtech21@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="text-sm">15, 1st Main Rd, Udayam Nagar, Velachery, Chennai, Tamil Nadu 600042</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>24/7 Service Available</span>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="md:col-span-3">
                  <Contact />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="6379496755" />

      <Footer />
    </div>
  );
};

export default Index;