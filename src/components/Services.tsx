import { motion } from "framer-motion";
import { Check } from "lucide-react";

const services = [
  {
    title: "Sales",
    description: "Wide range of premium appliances from trusted brands",
    features: ["Expert guidance", "Best prices", "Warranty support"],
  },
  {
    title: "Service",
    description: "Professional maintenance and repair services",
    features: ["24/7 support", "Certified technicians", "Genuine parts"],
  },
  {
    title: "Rentals",
    description: "Flexible rental solutions for your needs",
    features: ["Short & long term", "Free installation", "Easy returns"],
  },
];

const Services = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-white/20 text-white rounded-full backdrop-blur-sm"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Comprehensive Solutions for Your Home
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Experience excellence in every service we provide
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <h3 className="text-2xl font-semibold mb-4 text-blue-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <Check className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;