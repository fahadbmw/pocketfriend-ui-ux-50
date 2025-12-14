import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, Star, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DealCard from "@/components/home/DealCard";
import pizzaImg from "@/assets/pizza-restaurant.jpg";
import burgerImg from "@/assets/burger-restaurant.jpg";
import kebabImg from "@/assets/kebab-restaurant.jpg";
import continentalImg from "@/assets/continental-restaurant.jpg";

const categoryData: Record<string, { title: string; emoji: string; image: string }> = {
  pizza: { title: "Pizza Deals", emoji: "🍕", image: pizzaImg },
  burgers: { title: "Burger Deals", emoji: "🍔", image: burgerImg },
  kebabs: { title: "Kebab Deals", emoji: "🥙", image: kebabImg },
  continental: { title: "Continental Deals", emoji: "🍽️", image: continentalImg },
};

const allDeals = [
  { id: "1", image: pizzaImg, name: "Bella Italia", description: "Wood-fired Neapolitan pizzas", discount: 35, rating: 4.8, location: "Sydney CBD", category: "pizza" },
  { id: "2", image: pizzaImg, name: "Pizza Paradise", description: "Gourmet pizza with premium toppings", discount: 45, rating: 4.7, location: "Melbourne", category: "pizza" },
  { id: "3", image: burgerImg, name: "Grill Masters", description: "Premium Angus beef burgers", discount: 50, rating: 4.9, location: "Melbourne", category: "burgers" },
  { id: "4", image: burgerImg, name: "Burger Barn", description: "Classic American-style burgers", discount: 30, rating: 4.6, location: "Brisbane", category: "burgers" },
  { id: "5", image: kebabImg, name: "Sultan's Kitchen", description: "Authentic Middle Eastern cuisine", discount: 40, rating: 4.7, location: "Brisbane", category: "kebabs" },
  { id: "6", image: kebabImg, name: "Istanbul Grill", description: "Traditional Turkish kebabs", discount: 35, rating: 4.8, location: "Perth", category: "kebabs" },
  { id: "7", image: continentalImg, name: "The Grand Table", description: "Fine dining continental", discount: 25, rating: 4.9, location: "Perth", category: "continental" },
  { id: "8", image: continentalImg, name: "Maison Blanche", description: "French-inspired cuisine", discount: 20, rating: 4.9, location: "Sydney", category: "continental" },
];

const Category = () => {
  const [searchParams] = useSearchParams();
  const categoryType = searchParams.get("type") || "pizza";
  const category = categoryData[categoryType] || categoryData.pizza;
  
  const filteredDeals = allDeals.filter(deal => deal.category === categoryType);

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
            <p className="text-foreground/60 text-sm">{filteredDeals.length} restaurants available</p>
          </motion.div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 mb-6"
        >
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary text-primary"
            >
              <Filter className="w-4 h-4" />
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

        {/* Top Rated Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-4 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <h2 className="text-lg font-bold text-foreground">Top Rated {category.title}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDeals.map((deal, index) => (
              <DealCard key={deal.id} {...deal} index={index} />
            ))}
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Category;
