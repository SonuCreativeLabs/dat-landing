import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { HERO_IMAGES } from "@/config/assets";
import AboutUs from "@/components/AboutUs";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import Contact from "@/components/Contact";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const products = [
  {
    title: "Air Conditioners",
    description: "Wide range of energy-efficient ACs for all spaces. Available in Split AC (1 to 2 Ton), Window AC (1 to 1.5 Ton), and Cassette AC for commercial use. Features include anti-bacterial filters, inverter technology, and smart climate control.",
    features: [
      "5-star rated energy efficiency",
      "Auto-cleaning & Anti-bacterial filters",
      "Smart temperature control with WiFi",
      "Professional installation included"
    ],
    price: "₹2,999",
    imageUrl: HERO_IMAGES.AC
  },
  {
    title: "Refrigerators",
    description: "Premium refrigerators with advanced cooling. Choose from Single Door (180L-250L), Double Door (250L-500L), and Side-by-Side (500L+) models. Features include digital inverter technology and convertible storage options.",
    features: [
      "Digital Inverter Technology",
      "Multi-door convertible storage",
      "Frost-free operation",
      "10-year compressor warranty"
    ],
    price: "₹1,999",
    imageUrl: HERO_IMAGES.FRIDGE
  },
  {
    title: "Washing Machines",
    description: "High-efficiency washing machines for every need. Available in Front Load (6-9kg), Top Load (6-11kg), and Semi-Automatic variants. Advanced features include steam wash, quick wash, and fabric care programs.",
    features: [
      "Multiple wash programs (15+)",
      "Steam wash & Quick wash",
      "Inverter motor technology",
      "5-year motor warranty"
    ],
    price: "₹1,499",
    imageUrl: HERO_IMAGES.WASHING_MACHINE
  },
  {
    title: "Water Purifiers",
    description: "Advanced water purification systems with multi-stage filtration. RO+UV+UF technology with TDS control. Capacity ranges from 7L to 15L. Smart indicators for filter change and tank full alerts.",
    features: [
      "RO+UV+UF purification",
      "Mineral retention technology",
      "Real-time TDS monitoring",
      "1-year comprehensive warranty"
    ],
    price: "₹799",
    imageUrl: HERO_IMAGES.WATER_PURIFIER
  }
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dreams Air Tech - AC, Refrigerator, Washing Machine Sales, Service & Rentals in Chennai</title>
        <meta name="description" content="Leading provider of AC, Refrigerator, Washing Machine, and Water Purifier sales, service, and rentals in Chennai. Professional installation, maintenance, and 24/7 support for all home appliances." />
        <meta name="keywords" content="AC sales Chennai, AC service Chennai, AC rental Chennai, Refrigerator sales Chennai, Fridge service Chennai, Washing Machine rental Chennai, Water Purifier service Chennai, home appliance rental Chennai, appliance maintenance Chennai, AC repair Chennai, Washing Machine repair Chennai, Fridge repair Chennai, Water Purifier maintenance Chennai, home appliance service Chennai" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dreams Air Tech - Home Appliance Sales, Service & Rentals in Chennai" />
        <meta property="og:description" content="Professional AC, Refrigerator, Washing Machine, and Water Purifier sales, service, and rentals. Expert installation and 24/7 support in Chennai." />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dreams Air Tech - Home Appliance Solutions in Chennai" />
        <meta name="twitter:description" content="Your trusted partner for AC, Refrigerator, Washing Machine, and Water Purifier sales, service, and rentals in Chennai." />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://dreamsairtech.com" />
        
        {/* Location tags */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        <meta name="geo.position" content="13.0827;80.2707" />
        <meta name="ICBM" content="13.0827, 80.2707" />
      </Helmet>

      <main className="min-h-screen">
        <Header />
        <Hero />
        <AboutUs />
        <AnnouncementBanner />
        <Services />
        
        {/* Products Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
              <p className="text-gray-600">
                Explore our range of quality appliances available for sale and rental
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5" />
                Call Now to Rent
              </a>
            </motion.div>
          </div>
        </section>

        <Testimonials />
        <Contact />
        <Footer />
        <WhatsAppButton phoneNumber="+919876543210" />
      </main>
    </>
  );
};

export default Index;