import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import ProductCard from './ProductCard';
import { HERO_IMAGES } from '@/config/assets';
import { CONTACT_INFO } from '@/config/contact';

const products = [
  {
    id: 'ac',
    title: <span>❄ <span className="text-blue-600">Air Conditioners</span> – Cool Your Space with Efficiency</span>,
    description: "Premium air conditioners with advanced cooling technology for ultimate comfort at home or the office. Available in Split AC, Window AC, and Cassette AC models with features like smart climate control and energy-efficient operation.",
    features: [
      "5-star energy rating for maximum efficiency",
      "Smart temperature control with WiFi",
      "Anti-bacterial filters for clean air",
      "Professional installation included"
    ],
    price: "₹999/month",
    imageUrl: HERO_IMAGES.AC
  },
  {
    id: 'fridge',
    title: <span>❄ <span className="text-blue-600">Refrigerators</span> – Keep Your Food Fresh with Superior Cooling</span>,
    description: "Choose from a wide range of modern refrigerators with superior cooling performance. Our collection includes Single Door, Double Door, and Side-by-Side models, all featuring digital inverter technology and convertible storage options.",
    features: [
      "Digital inverter technology for efficiency",
      "Convertible storage modes for flexibility",
      "Frost-free operation for convenience",
      "10-year compressor warranty"
    ],
    price: "₹599/month",
    imageUrl: HERO_IMAGES.FRIDGE
  },
  {
    id: 'washing',
    title: <span>🧺 <span className="text-blue-600">Washing Machines</span> – Efficient Cleaning with Every Wash</span>,
    description: "Our high-performance washing machines are available in Front Load, Top Load, and Semi-Automatic variants, designed to provide you with the perfect wash. Features like steam wash technology and quick wash programs make cleaning efficient and easy.",
    features: [
      "Multiple wash programs for all fabrics",
      "Steam wash technology for deep clean",
      "Energy-efficient inverter motor",
      "5-year motor warranty"
    ],
    price: "₹399/month",
    imageUrl: HERO_IMAGES.WASHING_MACHINE
  },
  {
    id: 'water',
    title: <span>💧 <span className="text-blue-600">Water Purifiers</span> – Safe & Pure Drinking Water for Your Family</span>,
    description: "Advanced water purifiers with multi-stage filtration to provide you with safe drinking water. Our purifiers use RO+UV+UF technology, a TDS controller, and mineral enrichment to enhance taste and health benefits.",
    features: [
      "RO+UV+UF purification for safety",
      "TDS controller for optimal minerals",
      "Mineral enrichment for better taste",
      "Annual maintenance included"
    ],
    price: "₹499/month",
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
            Premium Home Appliances for Sale & Rent
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of high-quality home appliances, available for sale or rental with professional maintenance. We offer affordable and flexible solutions for all your appliance needs.
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
