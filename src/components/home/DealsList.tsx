import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { getActiveRestaurants } from "@/data/restaurants";

const DealsList = () => {
  const activeRestaurants = getActiveRestaurants();

  return (
    <section className="px-4 py-6 pb-28">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-5"
      >
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-2xl"
          >
            🔥
          </motion.span>
          <h2 className="text-xl font-bold text-foreground">Hot Deals</h2>
        </div>
        <Link to="/deals">
          <motion.button
            whileHover={{ x: 5 }}
            className="text-primary text-sm font-semibold flex items-center gap-1"
          >
            See All
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.button>
        </Link>
      </motion.div>

      {activeRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeRestaurants.map((restaurant, index) => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant} 
              index={index} 
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-foreground/60">No deals available at the moment</p>
        </motion.div>
      )}
    </section>
  );
};

export default DealsList;
