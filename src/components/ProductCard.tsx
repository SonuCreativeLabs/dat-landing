import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Check, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/config/contact";
import { ReactNode } from "react";

interface ProductCardProps {
  id: string;
  title: ReactNode;
  description: string;
  features: string[];
  price: string;
  imageUrl: string;
}

const ProductCard = ({ id, title, description, features, price, imageUrl }: ProductCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription = description.split('.')[0] + '.';

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col"
    >
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="aspect-w-16 aspect-h-9"
        >
          <img
            src={imageUrl}
            alt={typeof title === 'string' ? title : 'Product Image'}
            className="w-full h-48 object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {price}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-3 min-h-[3.5rem]">
          {title}
        </h3>

        <div className={`transition-all duration-500 ease-in-out flex-grow ${isExpanded ? 'h-auto' : 'h-20 overflow-hidden'}`}>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {isExpanded ? description : shortDescription}
          </p>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Key Features:</h4>
                <ul className="grid grid-cols-1 gap-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="bg-blue-100 rounded-full p-1">
                        <Check className="w-3 h-3 text-blue-600" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Rental Price</span>
                  <span className="text-sm font-medium text-blue-600">Starts from {price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Sale Price</span>
                  <a 
                    href={`tel:${CONTACT_INFO.PHONE}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    Call for Quote
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Show More/Less Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 
                     text-sm text-gray-600 font-medium py-2 rounded-lg flex items-center justify-center gap-1
                     transition-colors duration-300 border border-gray-200"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>Show More <ChevronDown className="w-4 h-4" /></>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;