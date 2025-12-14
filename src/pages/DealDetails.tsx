import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Percent,
  QrCode,
  Sparkles,
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import BottomNav from "@/components/layout/BottomNav";
import { getRestaurantById, deals } from "@/data/restaurants";

const DealDetails = () => {
  const { restaurantId, dealId } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  
  const restaurant = getRestaurantById(restaurantId || "");
  const deal = deals.find((d) => d.id === dealId);

  if (!restaurant || !deal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/60">Deal not found</p>
          <Link to="/" className="text-primary mt-4 inline-block">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-64"
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        
        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link to={`/restaurant/${restaurantId}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full glass"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full glass"
          >
            <Share2 className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>

        {/* Floating Deal Badge */}
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-primary rounded-2xl"
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(32 100% 50% / 0.4)",
                  "0 0 40px hsl(32 100% 50% / 0.6)",
                  "0 0 20px hsl(32 100% 50% / 0.4)",
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <div className="relative px-6 py-3 bg-primary rounded-2xl flex items-center gap-2">
              <Percent className="w-6 h-6 text-primary-foreground" />
              <span className="text-xl font-bold text-primary-foreground">{restaurant.discount}% OFF</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 pt-6 pb-36"
      >
        {/* Restaurant Info */}
        <div className="text-center mb-6">
          <p className="text-foreground/60 text-sm mb-1">{restaurant.name}</p>
          <p className="text-foreground/40 text-xs">{restaurant.location}</p>
        </div>

        {/* Deal Title Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-6 mb-4 relative overflow-hidden"
        >
          {/* Shimmer Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
          
          <div className="relative z-10">
            {/* Deal Header */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="p-3 rounded-xl bg-primary/20"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 hsl(32 100% 50% / 0.4)",
                    "0 0 20px 10px hsl(32 100% 50% / 0)",
                  ]
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Percent className="w-6 h-6 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  {deal.title}
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                  </motion.span>
                </h1>
                {deal.validUntil && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <p className="text-foreground/50 text-sm">Valid until {deal.validUntil}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Deal Description */}
            <p className="text-foreground/80 text-base leading-relaxed">
              {deal.description}
            </p>
          </div>
        </motion.div>

        {/* Terms & Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-premium p-5 mb-4"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Terms & Conditions
          </h3>
          <div className="space-y-3">
            {deal.terms.map((term, index) => (
              <motion.div 
                key={index} 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70 text-sm">{term}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How to Redeem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-premium p-5 mb-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            How to Redeem
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">1</span>
              </div>
              <p className="text-foreground/70 text-sm">Visit {restaurant.name} at {restaurant.address}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">2</span>
              </div>
              <p className="text-foreground/70 text-sm">Show the QR code to staff before placing your order</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">3</span>
              </div>
              <p className="text-foreground/70 text-sm">Enjoy your {restaurant.discount}% discount on your meal!</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSaved(!isSaved)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
              isSaved 
                ? "bg-primary/20 text-primary border border-primary" 
                : "btn-outline-white"
            }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? "fill-primary" : ""}`} />
            {isSaved ? "Saved!" : "Save Deal"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 btn-premium flex items-center justify-center gap-2 relative overflow-hidden py-4"
          >
            {/* Pulsating glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary to-orange-light rounded-xl"
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(32 100% 50% / 0.4)",
                  "0 0 40px hsl(32 100% 50% / 0.6)",
                  "0 0 20px hsl(32 100% 50% / 0.4)",
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <span className="relative z-10 flex items-center gap-2 font-semibold">
              <QrCode className="w-5 h-5" />
              Redeem Discount
            </span>
          </motion.button>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default DealDetails;
