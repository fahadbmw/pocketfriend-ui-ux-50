import { motion } from "framer-motion";
import { ArrowLeft, Flame, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import RestaurantCard from "@/components/home/RestaurantCard";
import { getActiveRestaurants } from "@/data/restaurants";

const Deals = () => {
  const activeRestaurants = getActiveRestaurants();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-28">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full glass"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </motion.button>
            </Link>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Flame className="w-6 h-6 text-primary" />
              </motion.div>
              <h1 className="text-2xl font-bold text-foreground">All Deals</h1>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-foreground/60 text-sm mb-4">
            Discover exclusive discounts at top restaurants near you
          </p>

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary text-primary"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </motion.button>
            
            {["All", "Pizza", "Pasta", "Italian"].map((filter, index) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  index === 0 
                    ? "bg-primary text-primary-foreground" 
                    : "glass text-foreground/70 hover:text-foreground"
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Restaurant Listings */}
        <div className="px-4">
          {activeRestaurants.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {activeRestaurants.map((restaurant, index) => (
                <RestaurantCard 
                  key={restaurant.id} 
                  restaurant={restaurant} 
                  index={index} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl mb-4"
              >
                🍕
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No deals available
              </h3>
              <p className="text-foreground/60 text-sm">
                Check back soon for amazing restaurant discounts!
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Deals;
