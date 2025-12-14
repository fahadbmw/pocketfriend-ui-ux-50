import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface DealCardProps {
  id: string;
  image: string;
  name: string;
  description: string;
  discount: number;
  rating: number;
  location: string;
  index?: number;
}

const DealCard = ({
  id,
  image,
  name,
  description,
  discount,
  rating,
  location,
  index = 0,
}: DealCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="parallax-container"
    >
      <Link to={`/deal/${id}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="card-premium overflow-hidden parallax-item"
        >
          {/* Image Container */}
          <div className="relative h-40 overflow-hidden">
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            
            {/* Discount Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute top-3 right-3 badge-discount"
            >
              {discount}% OFF
            </motion.div>

            {/* Rating */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span className="text-xs font-semibold text-foreground">{rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-foreground text-base mb-1 truncate">
              {name}
            </h3>
            <p className="text-foreground/60 text-sm mb-3 line-clamp-1">
              {description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-foreground/50">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">{location}</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium py-2 px-4 text-xs"
              >
                View Deal
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default DealCard;
