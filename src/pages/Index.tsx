import { useEffect } from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import ProductCard from "../components/ProductCard";
import { motion, useAnimation } from "framer-motion";

const products = [
  {
    title: "Smart Air Conditioners",
    description: "Energy-efficient cooling solutions with smart controls",
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Cooling",
  },
  {
    title: "Premium Refrigerators",
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
    <div className="min-h-screen bg-white">
      <Hero />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary-foreground rounded-full">
              Our Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                custom={index}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Services />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary-foreground rounded-full">
            Get Started
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-8">
            Ready to Transform Your Home?
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            Contact Us Today
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Index;