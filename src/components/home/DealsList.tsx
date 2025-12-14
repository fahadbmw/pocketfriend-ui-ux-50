import { motion } from "framer-motion";
import DealCard from "./DealCard";
import pizzaImg from "@/assets/pizza-restaurant.jpg";
import burgerImg from "@/assets/burger-restaurant.jpg";
import kebabImg from "@/assets/kebab-restaurant.jpg";
import continentalImg from "@/assets/continental-restaurant.jpg";

const deals = [
  {
    id: "1",
    image: pizzaImg,
    name: "Bella Italia",
    description: "Authentic Italian pizzas with fresh ingredients",
    discount: 35,
    rating: 4.8,
    location: "Sydney CBD",
  },
  {
    id: "2",
    image: burgerImg,
    name: "Grill Masters",
    description: "Gourmet burgers with premium Angus beef",
    discount: 50,
    rating: 4.9,
    location: "Melbourne",
  },
  {
    id: "3",
    image: kebabImg,
    name: "Sultan's Kitchen",
    description: "Traditional Middle Eastern kebabs & mezze",
    discount: 40,
    rating: 4.7,
    location: "Brisbane",
  },
  {
    id: "4",
    image: continentalImg,
    name: "The Grand Table",
    description: "Fine dining continental cuisine experience",
    discount: 25,
    rating: 4.9,
    location: "Perth",
  },
];

const DealsList = () => {
  return (
    <section className="px-4 py-6 pb-28">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-4"
      >
        <h2 className="text-lg font-bold text-foreground">Hot Deals 🔥</h2>
        <motion.button
          whileHover={{ x: 5 }}
          className="text-primary text-sm font-medium"
        >
          See All
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deals.map((deal, index) => (
          <DealCard key={deal.id} {...deal} index={index} />
        ))}
      </div>
    </section>
  );
};

export default DealsList;
