import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
}

const ProductCard = ({ title, description, image, category }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-transform hover:scale-105"
        />
        <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-white text-sm rounded-full">
          {category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-primary-foreground mb-2">{title}</h3>
        <p className="text-secondary-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;