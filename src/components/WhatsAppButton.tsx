import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const WhatsAppLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 175.216 175.552"
    fill="#ffffff"
    className="w-7 h-7"
  >
    <defs>
      <linearGradient id="a" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0" stopColor="#20b038"/>
        <stop offset="1" stopColor="#60d66a"/>
      </linearGradient>
    </defs>
    <path d="M87.608 0C39.249 0 0 39.249 0 87.608c0 19.197 6.222 36.987 16.774 51.383l-11.01 32.787 33.605-10.806c13.91 9.536 30.762 15.11 48.84 15.11 48.359 0 87.608-39.249 87.608-87.608S135.967 0 87.608 0zm0 160.169c-16.774 0-32.377-5.413-45.069-14.538l-3.234-1.919-33.469 10.806 11.01-32.377-2.109-3.37C6.628 105.996 0 97.279 0 87.608 0 48.359 39.249 9.11 87.608 9.11s87.608 39.249 87.608 87.608-39.249 87.608-87.608 87.608z" fill="#fff"/>
    <path d="M87.608 14.301c-40.521 0-73.307 32.786-73.307 73.307 0 16.774 5.413 32.377 14.538 45.069l-9.491 28.189 29.008-9.346c12.147 8.017 26.685 12.729 42.413 12.729 40.521 0 73.307-32.786 73.307-73.307s-32.786-73.307-73.307-73.307z" fill="url(#a)"/>
    <path d="M126.857 107.915c-1.919 5.413-9.491 10.006-15.519 11.34-4.149 0.91-9.562 1.629-27.813-5.968-23.374-9.927-38.403-34.251-39.576-35.834-1.173-1.583-9.036-12.002-9.036-22.89s5.577-16.192 7.496-18.402c1.919-2.21 4.149-2.756 5.532-2.756s2.756 0 3.97 0.036c1.274 0.036 2.983-0.182 4.513 3.424 1.583 3.715 5.413 12.875 5.877 13.821 0.473 0.946 0.783 2.065 0.036 3.37-0.746 1.305-1.119 2.119-2.21 3.243s-2.283 2.501-3.261 3.37c-1.083 0.946-2.21 1.974-0.946 3.897 1.265 1.919 5.604 8.199 12.002 13.276 8.272 6.568 15.228 8.599 17.402 9.562 2.174 0.964 3.424 0.801 4.695-0.546s5.486-6.386 6.932-8.563c1.446-2.174 2.901-1.81 4.877-1.083 1.974 0.728 12.584 5.932 14.756 7.005 2.174 1.083 3.606 1.61 4.113 2.501 0.51 0.891 0.51 5.195-1.41 10.608z" fill="#fff"/>
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