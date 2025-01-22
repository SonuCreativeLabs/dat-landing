import { useEffect } from "react";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { motion, useAnimation } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SupabaseTest from "../components/SupabaseTest";

const products = [
  {
    title: "Air Conditioners",
    description: "Energy-efficient cooling solutions with smart controls",
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Cooling",
  },
  {
    title: "Refrigerators",
    description: "Advanced cooling technology with modern design",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Appliances",
  },
  {
    title: "Washing Machines",
    description: "Efficient cleaning with smart features",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Laundry",
  },
  {
    title: "Water Purifiers",
    description: "Advanced filtration for pure, healthy water",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Water",
  },
];

const Index = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }));
  }, [controls]);

  return (
    <div className="min-h-screen">
      <Hero />
      <AboutUs />
      <Services />
      
      {/* Rental Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-blue-100 to-white" id="rentals">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4"
            >
              Premium Appliance Rentals
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Experience the convenience of high-quality appliances without the commitment of ownership. 
              Choose from our wide range of ACs, refrigerators, washing machines, and water purifiers with flexible rental plans.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                custom={index}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full hover:from-blue-500 hover:to-blue-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              Call Now to Rent: +91 98765 43210
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      <Testimonials />
      <Contact />
      <Footer />
      <SupabaseTest />
    </div>
  );
};

export default Index;