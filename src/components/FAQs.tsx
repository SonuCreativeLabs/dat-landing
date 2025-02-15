import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, HelpCircle, Phone, X } from 'lucide-react';
import { Container } from './Container';
import { CONTACT_INFO } from '@/config/contact';

const faqs = [
  {
    question: "What areas in Chennai do you service?",
    answer: "We proudly offer appliance services across key areas in Velachery, Adyar, OMR, Tambaram, and Guindy, among others. For a complete list of locations, visit our [Areas We Serve] page."
  },
  {
    question: "What are your AC rental plans and pricing?",
    answer: "We offer flexible AC rental plans starting from ₹999/month. For more information on different models and pricing, please contact us directly for a customized quote."
  },
  {
    question: "Do you provide emergency AC repair services?",
    answer: "Yes, we provide 24/7 emergency AC repair services to ensure you're never without comfort when you need it the most. Call us anytime at 9043726424 for immediate assistance."
  },
  {
    question: "What brands of appliances do you service?",
    answer: "We service a wide range of top appliance brands including Samsung, LG, Whirlpool, Voltas, and more. If your brand isn't listed, feel free to ask – we may still be able to help!"
  },
  {
    question: "What's included in your appliance rental service?",
    answer: "Our appliance rental service includes free delivery, installation, and maintenance. You also get the benefit of damage protection and flexible rental terms."
  },
  {
    question: "How do I book a service?",
    answer: "Booking a service is easy! Simply call us at 9043726424, or click here to book your service online. We'll confirm your appointment at your convenience."
  },
  {
    question: "Do you offer AMC (Annual Maintenance Contract) plans?",
    answer: "Yes, we offer Annual Maintenance Contracts (AMCs) for ACs, refrigerators, washing machines, and more. These plans help keep your appliances in top condition while saving you on repair costs."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept a variety of payment methods including credit/debit cards, UPI, net banking, and cash. For rental services, we also offer EMI options for select appliances."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={false}
      className="border border-white/20 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm hover:shadow-sm transition-shadow duration-200"
      style={{ minHeight: '80px' }}
    >
      <button
        onClick={onClick}
        className={`flex justify-between items-center w-full p-6 text-left transition-colors duration-200 ${isOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
      >
        <div className="flex items-center gap-4 flex-1">
          <motion.div
            initial={false}
            className={`flex-shrink-0 w-10 h-10 rounded-full ${isOpen ? 'bg-white' : 'bg-white/20'} flex items-center justify-center transition-colors duration-200`}
          >
            {isOpen ? (
              <X className={`w-5 h-5 text-[#003366]`} />
            ) : (
              <Plus className={`w-5 h-5 text-white`} />
            )}
          </motion.div>
          <span className={`text-lg font-semibold ${isOpen ? 'text-white' : 'text-white/90'} transition-colors duration-200`}>
            {question}
          </span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-6 pl-20 text-white/80">
              {answer.includes('[Areas We Serve]') ? (
                <>
                  {answer.split('[Areas We Serve]')[0]}
                  <a href="#about" className="text-white hover:text-white/90 font-medium">
                    Areas We Serve
                  </a>
                  {answer.split(']')[1]}
                </>
              ) : answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="w-full py-24 bg-gradient-to-b from-[#003366] via-[#002B5B] to-[#001B3B] relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/80 font-semibold text-sm uppercase tracking-wider">
              FAQs
            </span>
          </div>
          <h2 className="mt-3 text-4xl font-bold text-white mb-6">
            ❓ Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Find answers to common questions about our services, rentals, and support. If you can't find what you're looking for, don't hesitate to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative z-10"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-white/80 mb-8">
            Our support team is always here to assist you! Whether it's about a service, a rental, or a product, feel free to reach out.
          </p>
          <a
            href={`tel:${CONTACT_INFO.PHONE}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#003366] rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Phone className="w-5 h-5" />
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs; 