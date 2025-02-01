import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Expert AC Service Technicians",
    description: "Our certified professionals in Chennai bring years of experience in AC repair, refrigerator service, and appliance maintenance"
  },
  {
    title: "Quality Appliance Service",
    description: "We provide genuine parts and follow manufacturer guidelines for all AC repairs, installations, and water purifier services in Chennai"
  },
  {
    title: "24/7 Customer Support",
    description: "Round-the-clock emergency AC repair and appliance service in Velachery, OMR, Adyar, and Tambaram with flexible scheduling"
  },
  {
    title: "Affordable Service Solutions",
    description: "Best AC service rates in Chennai with transparent billing, affordable AC rentals, and cost-effective maintenance packages"
  }
];

const AboutUs = () => {
  return (
    <section className="w-full py-20 bg-white" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                Chennai's Most Trusted <br />
                <span className="text-blue-600">AC & Appliance Service Expert</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-600"
              >
                Looking for reliable AC service in Chennai? Dreams Air Tech has been providing top-rated 
                AC repair, refrigerator service, and washing machine repair solutions across Chennai for over a decade. 
                From emergency AC repairs to regular maintenance and affordable AC rentals, we're your one-stop solution 
                for all home appliance needs in Velachery, OMR, Adyar, and Tambaram regions.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-8"
          >
            {[
              { number: "8+", label: "Years of AC Service Excellence" },
              { number: "5000+", label: "Satisfied Customers in Chennai" },
              { number: "24/7", label: "Emergency AC Repair Support" },
              { number: "100%", label: "Service Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;