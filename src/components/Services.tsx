import { motion } from "framer-motion";
import { 
  ShoppingBag,
  Wrench,
  Clock,
  Wind,
  Snowflake,
  Waves,
  Power
} from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      icon: ShoppingBag,
      title: "Appliance Sales",
      description: "New and pre-owned home appliances at competitive prices. All products come with warranty and installation support.",
      features: [
        "New appliances from top brands",
        "Quality pre-owned appliances",
        "Extended warranty options",
        "Free delivery & installation",
        "EMI options available",
        "Best price guarantee"
      ]
    },
    {
      icon: Wrench,
      title: "Appliance Service",
      description: "Professional repair and maintenance services for all major appliance brands. Expert technicians and genuine spare parts.",
      features: [
        "Regular maintenance",
        "Emergency repairs",
        "Annual service contracts",
        "Genuine spare parts",
        "90-day service warranty",
        "24/7 support available"
      ]
    },
    {
      icon: Clock,
      title: "Appliance Rentals",
      description: "Flexible rental plans for home appliances. Choose from monthly, yearly, or customized rental periods to suit your needs.",
      features: [
        "Monthly rental plans",
        "Yearly rental options",
        "Customizable duration",
        "Free maintenance",
        "Easy upgrades",
        "Damage protection"
      ]
    }
  ];

  const applianceCategories = [
    {
      icon: Wind,
      title: "Air Conditioners",
      sales: "Split AC, Window AC, Cassette AC",
      service: "Installation, Gas Refill, Deep Cleaning",
      rental: "Monthly & Long-term Plans"
    },
    {
      icon: Snowflake,
      title: "Refrigerators",
      sales: "Single-door, Double-door Models",
      service: "Cooling Issues, Gas Charging, Parts",
      rental: "Home & Commercial Use"
    },
    {
      icon: Waves,
      title: "Washing Machines",
      sales: "Top Load, Front Load Models",
      service: "Repairs, Motor Issues, Maintenance",
      rental: "Short & Long-term Options"
    },
    {
      icon: Power,
      title: "Water Purifiers",
      sales: "RO, UV, UF Systems",
      service: "Filter Change, UV Lamp, Maintenance",
      rental: "Monthly Service Plans"
    }
  ];

  return (
    <section id="services" className="relative py-20 bg-gradient-to-b from-[#0284C7] to-[#0EA5E9]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0EA5E9]/10 via-[#0284C7]/30 to-[#0EA5E9]/80" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <h2 className="text-4xl font-bold text-white">Our Services</h2>
          <p className="text-white/80">
            Comprehensive solutions for all your home appliance needs - from sales and service to flexible rental options.
          </p>
        </motion.div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <service.icon className="w-12 h-12 text-white mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
              <p className="text-white/80 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-white/90 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white/80 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Appliance Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {applianceCategories.map((appliance, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <appliance.icon className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-4">{appliance.title}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-white/60 text-sm">Sales:</p>
                  <p className="text-white/90">{appliance.sales}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Service:</p>
                  <p className="text-white/90">{appliance.service}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Rental:</p>
                  <p className="text-white/90">{appliance.rental}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-white/90 text-lg mb-6">
            Looking for reliable appliance solutions in Chennai? Contact us now!
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-white text-[#0EA5E9] rounded-lg font-semibold hover:bg-white/90 transition-all duration-300"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;