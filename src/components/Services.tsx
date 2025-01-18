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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary-foreground rounded-full">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
            Comprehensive Solutions for Your Home
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-semibold mb-4 text-primary-foreground">
                {service.title}
              </h3>
              <p className="text-secondary-foreground mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-secondary-foreground">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;