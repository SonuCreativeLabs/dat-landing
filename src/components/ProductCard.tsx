import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  imageUrl?: string;
}

const ProductCard = ({ title, description, features, price, imageUrl }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden w-full"
    >
      <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Image Coming Soon
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-0.5 rounded-full text-sm font-medium">
          {price}/mo
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        
        <div className="space-y-1">
          <div className="text-xs text-gray-500">Key Features:</div>
          <ul className="text-sm space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-1 text-gray-700">
                <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;