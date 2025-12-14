import { motion } from "framer-motion";
import { MapPin, Star, Pizza, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import type { Restaurant } from "@/data/restaurants";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
  variant?: "default" | "compact";
}

const RestaurantCard = ({
  restaurant,
  index = 0,
  variant = "default",
}: RestaurantCardProps) => {
  // Floating food icons for visual flair
  const foodIcons = [
    { Icon: Pizza, delay: 0, position: "top-4 right-12" },
    { Icon: UtensilsCrossed, delay: 0.3, position: "bottom-16 right-4" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="parallax-container"
    >
      <Link to={`/restaurant/${restaurant.id}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -8 }}
          whileTap={{ scale: 0.98 }}
          className="card-premium overflow-hidden parallax-item relative group"
        >
          {/* Image Container */}
          <div className="relative h-44 overflow-hidden">
            <motion.img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            
            {/* Floating Food Icons */}
            {foodIcons.map(({ Icon, delay, position }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 0.6, 
                  scale: 1,
                  y: [0, -6, 0],
                }}
                transition={{ 
                  delay: delay + 0.5, 
                  type: "spring",
                  y: {
                    repeat: Infinity,
                    duration: 2.5,
                    delay: delay,
                    ease: "easeInOut"
                  }
                }}
                className={`absolute ${position} opacity-0 group-hover:opacity-60 transition-opacity`}
              >
                <div className="p-2 rounded-full bg-primary/30 backdrop-blur-sm">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              </motion.div>
            ))}
            
            {/* Discount Badge with Shimmer */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute top-3 right-3 relative overflow-hidden"
            >
              <div className="badge-discount flex items-center gap-1.5 pr-4">
                <span className="text-lg">🔥</span>
                <span>{restaurant.discount}% OFF</span>
              </div>
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
              />
            </motion.div>

            {/* Rating Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(restaurant.rating)
                        ? "fill-primary text-primary"
                        : i < restaurant.rating
                        ? "fill-primary/50 text-primary"
                        : "text-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-foreground">{restaurant.rating}</span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Restaurant Name & Tagline */}
            <div className="mb-2">
              <h3 className="font-bold text-foreground text-lg mb-0.5 truncate">
                {restaurant.name}
              </h3>
              <p className="text-primary text-sm font-medium">
                {restaurant.tagline}
              </p>
            </div>
            
            {/* Cuisine */}
            <p className="text-foreground/60 text-sm mb-3">
              {restaurant.cuisineDisplay}
            </p>
            
            {/* Location & CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-foreground/50">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{restaurant.location}</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, x: 3 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium py-2 px-5 text-sm font-semibold"
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

export default RestaurantCard;
