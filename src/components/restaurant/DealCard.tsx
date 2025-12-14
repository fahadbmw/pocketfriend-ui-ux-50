import { motion } from "framer-motion";
import { Percent, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Deal, Restaurant } from "@/data/restaurants";

interface DealCardProps {
  deal: Deal;
  restaurant: Restaurant;
  index?: number;
}

const DealCard = ({ deal, restaurant, index = 0 }: DealCardProps) => {
  return (
    <Link to={`/restaurant/${restaurant.id}/deal/${deal.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="card-premium p-4 relative overflow-hidden cursor-pointer group"
      >
        {/* Shimmer Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
        
        <div className="relative z-10 flex items-center gap-4">
          {/* Icon */}
          <motion.div 
            className="p-3 rounded-xl bg-primary/20 flex-shrink-0"
            whileHover={{ 
              boxShadow: "0 0 20px hsl(32 100% 50% / 0.4)"
            }}
          >
            <Percent className="w-6 h-6 text-primary" />
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-foreground truncate">
                {deal.title}
              </h3>
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
              </motion.span>
            </div>
            {deal.validUntil && (
              <p className="text-foreground/50 text-xs">Valid until {deal.validUntil}</p>
            )}
            <p className="text-foreground/70 text-sm mt-1 line-clamp-2">
              {deal.description}
            </p>
          </div>
          
          {/* Arrow */}
          <motion.div
            className="flex-shrink-0"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default DealCard;
