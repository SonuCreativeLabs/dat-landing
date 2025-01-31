import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, HelpCircle, Phone } from 'lucide-react';
import { Container } from './Container';
import { CONTACT_INFO } from '@/config/contact';

const faqs = [
  {
    question: "What areas in Chennai do you service?",
    answer: "We provide services across Chennai, with primary focus areas including Velachery, OMR, Adyar, Tambaram, and surrounding localities. We cover a service radius of 20km from Velachery."
  },  
  {
    question: "What are your AC rental plans and pricing?",
    answer: "We offer flexible AC rental plans starting from ₹999/month. Our plans include installation, maintenance, and support. Contact us for customized quotes based on your requirements and duration."
  },
  {
    question: "Do you provide emergency AC repair services?",
    answer: "Yes, we offer 24/7 emergency AC repair services in Chennai. Our expert technicians typically respond within 2-4 hours for urgent repairs."
  },
  {
    question: "What brands of appliances do you service?",
    answer: "We service all major brands including Samsung, LG, Whirlpool, Godrej, Haier, Voltas, Blue Star, and more. Our technicians are trained to handle various models and types."
  },
  {
    question: "What's included in your appliance rental service?",
    answer: "Our rental service includes delivery, installation, regular maintenance, repair coverage, and technical support. We also offer flexible rental periods and easy upgrade options."
  },
  {
    question: "How do I book a service?",
    answer: "You can book a service by calling our 24/7 helpline at +919043726424 or sending us a WhatsApp message. We'll arrange a convenient service time based on your schedule."
  },
  {
    question: "Do you offer AMC (Annual Maintenance Contract) plans?",
    answer: "Yes, we offer comprehensive AMC plans for all types of appliances. Our AMC includes regular maintenance, priority service, and discounted repairs."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including cash, UPI, credit/debit cards, and bank transfers. For rentals, we offer flexible monthly payment options."
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
      className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
    >
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full p-6 text-left group-hover:bg-blue-50/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-4 flex-1">
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 45 : 0 }}
            className={`flex-shrink-0 w-8 h-8 rounded-full ${isOpen ? 'bg-blue-600' : 'bg-blue-100'} flex items-center justify-center transition-colors duration-200`}
          >
            <Plus className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-blue-600'}`} />
          </motion.div>
          <span className={`text-lg font-semibold ${isOpen ? 'text-blue-700' : 'text-gray-900'} transition-colors duration-200`}>
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-blue-50/30"
          >
            <div className="p-6 pl-[4.5rem] border-t border-gray-200">
              <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services, rentals, and support
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
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
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
            Our support team is here to help you with any queries
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