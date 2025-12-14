import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const Favorites = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Favorite Deals</h1>
          <p className="text-muted-foreground">Your saved deals will appear here</p>
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Favorites;
