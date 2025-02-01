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
      className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:shadow-sm transition-shadow duration-200"
      style={{ minHeight: '80px' }}
    >
      <button
        onClick={onClick}
        className={`flex justify-between items-center w-full p-6 text-left transition-colors duration-200 ${isOpen ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
      >
        <div className="flex items-center gap-4 flex-1">
          <motion.div
            initial={false}
            className={`flex-shrink-0 w-10 h-10 rounded-full ${isOpen ? 'bg-blue-600' : 'bg-blue-100'} flex items-center justify-center transition-colors duration-200`}
          >
            {isOpen ? (
              <X className={`w-5 h-5 text-white`} />
            ) : (
              <Plus className={`w-5 h-5 text-blue-600`} />
            )}
          </motion.div>
          <span className={`text-lg font-semibold ${isOpen ? 'text-blue-600' : 'text-gray-900'} transition-colors duration-200`}>
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
            <div className="p-6 pl-20 text-gray-600">
              {answer.includes('[Areas We Serve]') ? (
                <>
                  {answer.split('[Areas We Serve]')[0]}
                  <a href="#about" className="text-blue-600 hover:text-blue-700 font-medium">
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
    <div id="faqs" className="bg-gradient-to-b from-white to-blue-50/30 py-16 sm:py-20 md:py-24 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              FAQs
            </span>
          </div>
          <h2 className="mt-3 text-4xl font-bold text-gray-900 mb-6">
            ❓ Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services, rentals, and support. If you can't find what you're looking for, don't hesitate to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
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
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-8">
            Our support team is always here to assist you! Whether it's about a service, a rental, or a product, feel free to reach out.
          </p>
          <a
            href={`tel:${CONTACT_INFO.PHONE}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Phone className="w-5 h-5" />
            Contact Support
          </a>
        </motion.div>
      </Container>
    </div>
  );
};

export default FAQs; 