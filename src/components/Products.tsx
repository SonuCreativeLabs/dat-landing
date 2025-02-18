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
      className="w-full py-12 sm:py-12 bg-gradient-to-b from-[#003366] via-[#003D7A] to-[#004b8f] relative overflow-hidden z-[3] -mt-1"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Premium Home Appliances for Sale & Rent
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
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
                       bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] 
                       text-white rounded-xl font-semibold 
                       hover:from-[#38BDF8] hover:to-[#0EA5E9]
                       transition-all duration-300 
                       shadow-[0_0_20px_rgba(14,165,233,0.3)] 
                       hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]
                       hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now: {CONTACT_INFO.PHONE_DISPLAY}</span>
            </a>
          </div>
          <p className="text-sm text-white/60">
            Contact us for detailed pricing and availability
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
