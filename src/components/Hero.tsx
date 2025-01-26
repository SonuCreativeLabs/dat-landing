import { motion } from "framer-motion";
import { Wind, Snowflake, Waves, Power, ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    {
      icon: Wind,
      title: "Air Conditioners",
      description: "Sales, Service & Rental of Split AC, Window AC, and Cassette AC in Chennai",
      delay: 0.4
    },
    {
      icon: Snowflake,
      title: "Refrigerators",
      description: "Single-door, Double-door Fridge Sales, Repair & Rental Services",
      delay: 0.5
    },
    {
      icon: Waves,
      title: "Washing Machines",
      description: "Top Load, Front Load Washing Machine Sales & Service",
      delay: 0.6
    },
    {
      icon: Power,
      title: "Water Purifiers",
      description: "RO, UV Water Purifier Installation & Maintenance",
      delay: 0.7
    }
  ];

  return (
    <section className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-gradient-to-b from-[#0EA5E9] to-[#0284C7]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0EA5E9]/10 via-[#0284C7]/30 to-[#0EA5E9]/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-full">
        <div className="grid lg:grid-cols-2 gap-12 h-full items-center py-20">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                #1 Home Appliance Solutions in Chennai
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Expert Home Appliance
              <br />
              <span className="text-sky-100">
                Sales, Service & Rentals
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/90 max-w-xl"
            >
              Chennai's trusted partner for AC, Refrigerator, Washing Machine, and Water Purifier solutions. Professional installation, maintenance, and 24/7 support at competitive prices.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0EA5E9] rounded-lg font-semibold hover:bg-white/90 transition-all duration-300"
              >
                Book Service Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-sky-600/20 backdrop-blur-sm text-white border border-white/20 rounded-lg font-semibold hover:bg-sky-600/30 transition-all duration-300"
              >
                Explore Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Service Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: service.delay }}
                className="group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <service.icon className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/80 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;