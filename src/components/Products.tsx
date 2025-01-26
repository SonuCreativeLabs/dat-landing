import React from 'react';
import { motion } from 'framer-motion';
import { HERO_IMAGES } from '@/config/assets';
import ProductCard from './ProductCard';
import { Phone } from 'lucide-react';

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

const Products: React.FC = () => {
  return (
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
  );
};

export default Products;
