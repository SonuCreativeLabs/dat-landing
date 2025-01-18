import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
}

const ProductCard = ({ title, description, image, category }: ProductCardProps) => {
  const isWaterProduct = title.toLowerCase().includes('water') || category.toLowerCase().includes('water');

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-white to-[#D3E4FD] rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={isWaterProduct ? {
            scale: 1.05,
            transition: {
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          } : {
            scale: 1.05
          }}
        />
        <span className="absolute top-4 left-4 px-3 py-1 bg-[#0EA5E9]/90 text-white text-sm rounded-full">
          {category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#0EA5E9] mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;