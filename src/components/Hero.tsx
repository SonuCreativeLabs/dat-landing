import { motion } from "framer-motion";
import { Wind, Snowflake, Waves, Power, ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    {
      icon: Wind,
      title: "Air Conditioners",
      description: "Complete AC solutions for your home and office. We offer:",
      features: [
        "Split & Window AC Sales",
        "Professional Installation",
        "Regular Maintenance",
        "Monthly/Yearly Rentals",
        "24/7 Repair Service"
      ],
      delay: 0.4,
      color: "from-blue-400/50 to-blue-600/50"
    },
    {
      icon: Snowflake,
      title: "Refrigerators",
      description: "Premium refrigerator services including:",
      features: [
        "Single & Double-door Sales",
        "Gas Refilling & Repair",
        "Door Seal Replacement",
        "Cooling Issues Fixed",
        "Short-term Rentals"
      ],
      delay: 0.5,
      color: "from-cyan-400/50 to-cyan-600/50"
    },
    {
      icon: Waves,
      title: "Washing Machines",
      description: "Expert washing machine solutions with:",
      features: [
        "Top & Front Load Sales",
        "Installation & Setup",
        "Spare Parts Available",
        "Motor Repair Service",
        "Rental Options"
      ],
      delay: 0.6,
      color: "from-sky-400/50 to-sky-600/50"
    },
    {
      icon: Power,
      title: "Water Purifiers",
      description: "Complete water purifier services:",
      features: [
        "RO & UV Purifier Sales",
        "Filter Replacement",
        "Water Quality Test",
        "Annual Maintenance",
        "Same-day Service"
      ],
      delay: 0.7,
      color: "from-indigo-400/50 to-indigo-600/50"
    }
  ];

  return (
    <section className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-gradient-to-b from-[#0EA5E9] to-[#0284C7]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0EA5E9]/10 via-[#0284C7]/30 to-[#0EA5E9]/80" />
        
        {/* Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[url('/appliances-pattern.svg')] bg-repeat bg-[length:200px_200px]"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360
            }}
            transition={{ 
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-8 h-8 text-white/20"
          >
            <Sparkles className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-full">
        <div className="grid lg:grid-cols-2 gap-16 h-full items-center py-24">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium">
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
              <span className="text-sky-100 relative">
                Sales, Service & Rentals
                <motion.div
                  className="absolute -right-8 top-0 text-yellow-400"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.div>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/90 max-w-xl leading-relaxed"
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
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0EA5E9] rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Service Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-sky-600/20 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-sky-600/30 transition-all duration-300"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                className="group p-8 rounded-2xl bg-gradient-to-br border border-white/20 hover:scale-105 transition-all duration-300 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-6"
                  >
                    <service.icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white/90">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4 group-hover:text-white">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: service.delay + (idx * 0.1) }}
                        className="flex items-center text-white/70 text-sm group-hover:text-white"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50 mr-2 group-hover:bg-white" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;