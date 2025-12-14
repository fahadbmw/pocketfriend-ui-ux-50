import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, Star, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import RestaurantCard from "@/components/home/RestaurantCard";
import { getActiveRestaurants } from "@/data/restaurants";
import pizzaImg from "@/assets/pizza-restaurant.jpg";
import burgerImg from "@/assets/burger-restaurant.jpg";
import kebabImg from "@/assets/kebab-restaurant.jpg";
import continentalImg from "@/assets/continental-restaurant.jpg";

const categoryData: Record<string, { title: string; emoji: string; image: string }> = {
  all: { title: "All Deals", emoji: "🍽️", image: pizzaImg },
  pizza: { title: "Pizza Deals", emoji: "🍕", image: pizzaImg },
  burgers: { title: "Burger Deals", emoji: "🍔", image: burgerImg },
  kebabs: { title: "Kebab Deals", emoji: "🥙", image: kebabImg },
  continental: { title: "Continental Deals", emoji: "🍽️", image: continentalImg },
};

const Category = () => {
  const [searchParams] = useSearchParams();
  const categoryType = searchParams.get("type") || "all";
  const category = categoryData[categoryType] || categoryData.all;
  
  // Get active restaurants and filter by cuisine if needed
  const activeRestaurants = getActiveRestaurants();
  const filteredRestaurants = categoryType === "all" 
    ? activeRestaurants 
    : activeRestaurants.filter(r => 
        r.cuisine.some(c => c.toLowerCase().includes(categoryType.toLowerCase()))
      );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-28">
        {/* Category Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-48 mx-4 rounded-3xl overflow-hidden mb-6"
        >
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Back Button */}
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 left-4 p-2 rounded-full glass"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
          </Link>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-4 left-4"
          >
            <span className="text-4xl mb-2 block">{category.emoji}</span>
            <h1 className="text-2xl font-bold text-foreground">{category.title}</h1>
            <p className="text-foreground/60 text-sm">{filteredRestaurants.length} restaurants available</p>
          </motion.div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 mb-6"
        >
          <div className="flex items-center gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary text-primary"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </motion.button>
            
            {["Top Rated", "Nearest", "Best Discount"].map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full glass text-foreground/70 text-sm font-medium whitespace-nowrap"
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Restaurant Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-4"
        >
          {filteredRestaurants.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 fill-primary text-primary" />
                <h2 className="text-lg font-bold text-foreground">
                  {categoryType === "all" ? "All Restaurants" : `Top ${category.title}`}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredRestaurants.map((restaurant, index) => (
                  <RestaurantCard 
                    key={restaurant.id} 
                    restaurant={restaurant} 
                    index={index} 
                  />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl block mb-4"
              >
                {category.emoji}
              </motion.span>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No {category.title.toLowerCase()} available
              </h3>
              <p className="text-foreground/60 text-sm">
                Check back soon for amazing discounts!
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Category;
