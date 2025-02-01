import { motion } from 'framer-motion';
import { 
  Refrigerator, 
  WashingMachine, 
  Fan, 
  Droplets,
  Wrench,
  ShoppingBag,
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const services = [
  {
    title: 'Appliance Sales',
    description: 'Purchase brand-new or pre-owned home appliances from leading manufacturers at the best prices, backed by reliable after-sales support.',
    icon: ShoppingBag,
    features: [
      'Brand-new appliances from top manufacturers',
      'Quality-tested pre-owned appliances',
      'Competitive pricing with exclusive deals',
      'Free delivery and professional installation',
      'Extended warranty options for peace of mind',
      'EMI options available for new appliances'
    ],
    appliances: [
      { icon: Refrigerator, name: 'Refrigerator' },
      { icon: WashingMachine, name: 'Washing Machine' },
      { icon: Fan, name: 'Air Conditioner' },
      { icon: Droplets, name: 'Water Purifier' }
    ]
  },
  {
    title: 'Appliance Service',
    description: 'Our certified technicians provide quick, reliable, and professional appliance repair services with genuine spare parts and comprehensive maintenance plans.',
    icon: Wrench,
    features: [
      'Trained & certified technicians',
      'Annual Maintenance Contracts (AMC) for worry-free service',
      'Preventive maintenance to extend appliance life',
      'Use of genuine spare parts for durability',
      'Same-day service available for urgent repairs',
      '90-day service warranty for all repairs'
    ],
    appliances: [
      { icon: Refrigerator, name: 'Refrigerator' },
      { icon: WashingMachine, name: 'Washing Machine' },
      { icon: Fan, name: 'Air Conditioner' },
      { icon: Droplets, name: 'Water Purifier' }
    ]
  },
  {
    title: 'Appliance Rental',
    description: 'Need a temporary appliance? Our hassle-free rental service offers convenient, flexible, and cost-effective options with full maintenance coverage.',
    icon: Clock,
    features: [
      'Flexible rental plans – monthly & yearly options',
      'Free maintenance included throughout rental period',
      'Easy upgrade options for latest models',
      'Damage protection available for added security',
      'Professional installation and setup',
      'Regular maintenance included'
    ],
    appliances: [
      { icon: Refrigerator, name: 'Refrigerator' },
      { icon: WashingMachine, name: 'Washing Machine' },
      { icon: Fan, name: 'Air Conditioner' },
      { icon: Droplets, name: 'Water Purifier' }
    ]
  }
];

const Services = () => {
  return (
    <section id="services" className="relative py-20 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/appliances-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0EA5E9]/10 via-[#0284C7]/30 to-[#0EA5E9]/80" />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10">
            🛠 Our Services
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            Comprehensive Appliance Solutions
          </h2>
          <p className="text-lg text-white/90">
            Your One-Stop Destination for Home Appliance Sales, Service & Rentals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 
                          hover:bg-white/20 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                          hover:shadow-[0_8px_30px_rgba(14,165,233,0.3)] hover:-translate-y-1"
              >
                {/* Appliance Icons at Top */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                  {service.appliances.map((appliance, i) => {
                    const ApplianceIcon = appliance.icon;
                    return (
                      <motion.div
                        key={appliance.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index * 0.1) + (i * 0.1) }}
                        className="bg-gradient-to-br from-white to-white/90 backdrop-blur rounded-xl p-2.5 
                                 shadow-lg group-hover:shadow-xl transition-all duration-300
                                 group-hover:ring-2 ring-[#0EA5E9]/20"
                        title={appliance.name}
                      >
                        <ApplianceIcon className="w-5 h-5 text-[#0EA5E9]" />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Service Icon and Title */}
                <div className="flex items-center gap-4 mb-6 mt-6">
                  <div className="bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-xl p-3.5 shadow-lg group-hover:shadow-[#0EA5E9]/20">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-white/80 mb-8 group-hover:text-white/90 transition-colors">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="bg-[#0EA5E9]/20 rounded-lg p-1">
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                      </div>
                      <span className="text-white/80 text-sm leading-tight group-hover:text-white/90 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                  <div className="bg-[#0EA5E9] rounded-lg p-2 shadow-lg">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;