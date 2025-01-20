import { motion } from "framer-motion";

const WhatsAppLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
  >
    <path
      d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 1.869.518 3.668 1.475 5.235L2 22.001l4.916-1.279c1.505.882 3.22 1.348 4.946 1.348h.004c5.522 0 9.999-4.477 9.999-9.999 0-2.671-1.040-5.182-2.929-7.071s-4.4-2.929-7.071-2.929zm.001 1.5c2.137 0 4.146.832 5.657 2.343s2.343 3.52 2.343 5.657-0.832 4.146-2.343 5.657-3.52 2.343-5.657 2.343c-1.598 0-3.155-0.434-4.523-1.257l-0.324-0.195-3.352 0.874 0.891-3.242-0.215-0.342c-0.894-1.421-1.368-3.049-1.368-4.838 0-2.137 0.832-4.146 2.343-5.657s3.52-2.343 5.657-2.343zm-2.698 5.264h-0.884c-0.123 0-0.323 0.046-0.492 0.231-0.169 0.185-0.646 0.631-0.646 1.538s0.661 1.785 0.754 1.908c0.092 0.123 1.292 2.077 3.192 2.823 1.58 0.619 1.9 0.496 2.242 0.465 0.342-0.031 1.108-0.452 1.262-0.889 0.154-0.437 0.154-0.812 0.107-0.889-0.046-0.077-0.169-0.123-0.354-0.215-0.184-0.092-1.108-0.546-1.277-0.607-0.169-0.062-0.292-0.092-0.415 0.092-0.123 0.185-0.477 0.607-0.584 0.731-0.107 0.123-0.215 0.138-0.4 0.046-0.184-0.092-0.779-0.288-1.485-0.916-0.55-0.49-0.92-1.095-1.027-1.279-0.107-0.185-0.011-0.284 0.081-0.377 0.083-0.083 0.184-0.215 0.277-0.323 0.092-0.107 0.123-0.184 0.184-0.307 0.062-0.123 0.031-0.231-0.015-0.323-0.046-0.092-0.415-1.015-0.569-1.389-0.154-0.374-0.308-0.308-0.415-0.308-0.107 0-0.231-0.015-0.354-0.015z"
    />
  </svg>
);

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919876543210?text=Hi,%20I%20need%20assistance%20with%20appliance%20service"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 20px 60px rgba(37, 211, 102, 0.3)"
      }}
      className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 z-50 group"
    >
      <div className="text-white transform group-hover:rotate-12 transition-transform duration-300">
        <WhatsAppLogo />
      </div>
      <span className="absolute -left-32 bg-white px-4 py-2 rounded-lg shadow-lg text-gray-800 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with us
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
