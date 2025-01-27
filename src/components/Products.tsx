import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import ProductCard from './ProductCard';
import { HERO_IMAGES } from '@/config/assets';
import { CONTACT_INFO } from '@/config/contact';

const products = [
  {
    title: "Air Conditioners",
    description: "Premium ACs with advanced cooling technology. Available in Split AC (1-2 Ton), Window AC (1-1.5 Ton), and Cassette AC. Features include smart climate control and energy-efficient operation. Perfect for homes and offices with professional installation and maintenance.",
    features: [
      "5-star energy rating",
      "Smart temperature control",
      "Anti-bacterial filters",
      "Professional installation"
    ],
    price: "₹2,999",
    imageUrl: HERO_IMAGES.AC
  },
  {
    title: "Refrigerators",
    description: "Modern refrigerators with superior cooling performance. Choose from Single Door (180-250L), Double Door (250-500L), and Side-by-Side (500L+) models. Features digital inverter technology and convertible storage options.",
    features: [
      "Digital inverter technology",
      "Convertible storage modes",
      "Frost-free operation",
      "10-year warranty"
    ],
    price: "₹1,999",
    imageUrl: HERO_IMAGES.FRIDGE
  },
  {
    title: "Washing Machines",
    description: "High-performance washing machines for every household. Available in Front Load (6-9kg), Top Load (6-11kg), and Semi-Automatic variants. Includes steam wash and quick wash programs for efficient cleaning.",
    features: [
      "Multiple wash programs",
      "Steam wash technology",
      "Energy efficient motor",
      "5-year warranty"
    ],
    price: "₹1,499",
    imageUrl: HERO_IMAGES.WASHING_MACHINE
  },
  {
    title: "Water Purifiers",
    description: "Advanced water purifiers with multi-stage filtration. Features RO+UV+UF technology for safe drinking water. Includes TDS controller and mineral enrichment for better taste and health benefits.",
    features: [
      "RO+UV+UF purification",
      "TDS controller",
      "Mineral enrichment",
      "Annual maintenance"
    ],
    price: "₹799",
    imageUrl: HERO_IMAGES.WATER_PURIFIER
  }
];

const Products = () => {
  return (
    <section
      id="products"
      className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium range of home appliances.
            Available for both sale and rental with professional maintenance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-16 space-y-4"
        >
          <div className="flex items-center justify-center">
            <a
              href={`tel:${CONTACT_INFO.PHONE}`}
              className="group relative inline-flex items-center gap-2 px-8 py-4 
                       bg-gradient-to-br from-[#0EA5E9] to-[#0284C7]
                       hover:from-[#0284C7] hover:to-[#0EA5E9]
                       text-white rounded-xl font-semibold 
                       transition-all duration-300 shadow-lg 
                       hover:shadow-[0_8px_30px_rgba(14,165,233,0.3)]
                       hover:-translate-y-0.5
                       backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now: {CONTACT_INFO.PHONE_DISPLAY}</span>
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Contact us for detailed pricing and availability
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
