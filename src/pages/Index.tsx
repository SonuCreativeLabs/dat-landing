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
import Header from "@/components/Header";
import { PRODUCT_IMAGES } from "@/config/assets";

const Index = () => {
  return (
    <div className="min-h-screen w-full pt-20">
      <Header />
      <Hero />
      <AboutUs />
      <AnnouncementBanner />
      <Services />
      
      {/* Rental Section */}
      <section className="w-full py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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
              imageUrl={PRODUCT_IMAGES.AC}
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
              imageUrl={PRODUCT_IMAGES.REFRIGERATOR}
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
              imageUrl={PRODUCT_IMAGES.WASHING_MACHINE}
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
              imageUrl={PRODUCT_IMAGES.WATER_PURIFIER}
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

      <Testimonials />
      <div className="w-full bg-white">
        <Contact />
      </div>
      <Footer />
      <SupabaseTest />
    </div>
  );
};

export default Index;