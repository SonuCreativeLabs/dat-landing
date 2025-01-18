import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, Tool, Package, ShoppingCart } from "lucide-react";

const features = [
  {
    title: "Sales",
    description: "Great deals on top appliances.",
    icon: ShoppingCart,
  },
  {
    title: "Service",
    description: "Expert repairs and maintenance.",
    icon: Tool,
  },
  {
    title: "Rentals",
    description: "Flexible plans for your needs.",
    icon: Package,
  },
];

const AboutUs = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6"
          >
            Why Choose Dreams Air Tech?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-secondary-foreground max-w-2xl mx-auto"
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
            >
              <Card className="relative h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <feature.icon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-secondary-foreground">{feature.description}</p>
                  <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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