import { motion } from "framer-motion";
import { CheckCircle, MapPin, Star, Clock, Wallet } from "lucide-react";

const serviceAreas = [
  "Velachery", "Adambakkam", "Madipakkam", "Pallikaranai", "Perungudi", "Tharamani", "Guindy", "Saidapet",
  "Nanganallur", "Alandur", "Kottivakkam", "Ekkatuthangal", "Tambaram", "Medavakkam", "Sholinganallur", "Pallavaram",
  "Chromepet", "Thiruvanmiyur", "Anna Nagar", "Mylapore", "T. Nagar", "Mount Road (Anna Salai)", "Ramapuram",
  "Manapakkam", "Porur", "Kodambakkam", "Vadapalani"
];

const features = [
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    title: "8+ Years of Excellence",
    description: "Proven track record in AC and appliance services"
  },
  {
    icon: <Star className="w-6 h-6 text-white" />,
    title: "5000+ Happy Customers",
    description: "Trust built through reliable service"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    title: "24/7 Emergency Support",
    description: "Round-the-clock service availability"
  },
  {
    icon: <Wallet className="w-6 h-6 text-white" />,
    title: "Affordable Pricing",
    description: "Transparent and competitive rates"
  }
];

const AboutUs = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#001B3B] via-[#003366] to-[#004B8F]" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white mb-4"
              >
                About Us – <br />
                <span className="text-white/90">Dreams Air Tech</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/80 mb-6"
              >
                Chennai's Most Trusted AC & Appliance Service Provider
              </motion.p>
              <motion.div className="space-y-4">
                <p className="text-white/70">
                  Looking for reliable AC and appliance services in Chennai? At Dreams Air Tech, we specialize in AC repair, refrigerator service, washing machine repair, and water purifier solutions. With years of expertise, we provide professional installation, maintenance, and emergency support, ensuring your appliances run smoothly.
                </p>
                <p className="text-white/70">
                  From quick AC repairs to affordable appliance rentals, we offer end-to-end solutions tailored to your needs. Our team serves key locations across Chennai, delivering high-quality service with genuine spare parts and expert technicians.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="mt-1 bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Service Areas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-semibold text-white">Areas We Serve</h3>
            </div>
            <p className="text-white/80 mb-6">
              We provide AC and appliance repair, maintenance, and rental services across Chennai, covering:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {serviceAreas.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="text-white/80 text-sm">{area}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-white font-medium">
                💡 Need professional AC or appliance service in your area? Contact us today!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;