import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Container } from './Container';

const faqs = [
  {
    question: "What areas in Chennai do you service?",
    answer: "We provide services across Chennai, with primary focus areas including Velachery, OMR, Adyar, Tambaram, and surrounding localities. We cover a service radius of 25km from Chennai city center."
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
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-6 text-left"
      >
        <span className="text-lg font-semibold text-gray-900">{question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <Minus className="w-6 h-6 text-blue-600" />
          ) : (
            <Plus className="w-6 h-6 text-gray-400" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-6">
              <p className="text-gray-600">{answer}</p>
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
    <div id="faqs" className="bg-white py-16 sm:py-20 md:py-24 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            FAQs
          </span>
          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services, rentals, and support
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto divide-y divide-gray-200 rounded-2xl bg-white shadow-lg"
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
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            Still have questions? Contact our support team
          </p>
          <a
            href="tel:+919043726424"
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Support
          </a>
        </motion.div>
      </Container>
    </div>
  );
};

export default FAQs; 