import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, Wrench, Package, ShoppingCart } from "lucide-react";

const features = [
  {
    title: "Sales",
    description: "Great deals on top appliances.",
    icon: ShoppingCart,
  },
  {
    title: "Service",
    description: "Expert repairs and maintenance.",
    icon: Wrench,
  },
  {
    title: "Rentals",
    description: "Flexible plans for your needs.",
    icon: Package,
  },
];

const AboutUs = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-blue-100 text-blue-600 rounded-full"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-blue-900 mb-6"
          >
            Why Choose Dreams Air Tech?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            With years of expertise in home appliances, we prioritize quality service and customer satisfaction. Our team of certified professionals ensures your appliances run efficiently, providing peace of mind for your home.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="relative h-full overflow-hidden group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50 border-blue-100">
                <CardContent className="p-8">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-12 h-12 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-blue-900">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;