import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Star, 
  Heart, 
  Share2, 
  Phone, 
  Globe, 
  Navigation,
  ChevronLeft,
  ChevronRight,
  Pizza,
  UtensilsCrossed,
  Sparkles
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import BottomNav from "@/components/layout/BottomNav";
import DealCard from "@/components/restaurant/DealCard";
import { getRestaurantById, getDealsByRestaurantId } from "@/data/restaurants";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const restaurant = getRestaurantById(id || "");
  const restaurantDeals = getDealsByRestaurantId(id || "");

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/60">Restaurant not found</p>
          <Link to="/" className="text-primary mt-4 inline-block">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === restaurant.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? restaurant.gallery.length - 1 : prev - 1
    );
  };

  const openInMaps = () => {
    const encodedAddress = encodeURIComponent(restaurant.address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-80"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={restaurant.gallery[currentImageIndex]}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Floating Food Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1, y: [0, -8, 0] }}
          transition={{ 
            delay: 0.5, 
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
          }}
          className="absolute top-20 right-8"
        >
          <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm">
            <Pizza className="w-6 h-6 text-primary" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1, y: [0, -6, 0] }}
          transition={{ 
            delay: 0.8, 
            y: { repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }
          }}
          className="absolute top-32 left-8"
        >
          <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
          </div>
        </motion.div>
        
        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full glass"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
          </Link>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full glass"
            >
              <Share2 className="w-5 h-5 text-foreground" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSaved(!isSaved)}
              className="p-3 rounded-full glass"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${isSaved ? "fill-primary text-primary" : "text-foreground"}`}
              />
            </motion.button>
          </div>
        </div>

        {/* Carousel Controls */}
        {restaurant.gallery.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {restaurant.gallery.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-primary" : "bg-foreground/30"
                  }`}
                  animate={index === currentImageIndex ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 -mt-12 relative z-10 pb-36"
      >
        {/* Main Info Card */}
        <div className="card-premium p-6 mb-4">
          {/* Name & Rating */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {restaurant.name}
              </h1>
              <p className="text-primary font-medium">{restaurant.tagline}</p>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="flex items-center gap-1.5 bg-primary/20 px-3 py-2 rounded-xl"
            >
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="font-bold text-foreground text-lg">{restaurant.rating}</span>
            </motion.div>
          </div>
          
          {/* Rating stars with reviews */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(restaurant.rating)
                      ? "fill-primary text-primary"
                      : i < restaurant.rating
                      ? "fill-primary/50 text-primary"
                      : "text-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-foreground/60 text-sm">
              Based on {restaurant.reviews} reviews — trending favorite!
            </span>
          </div>

          {/* Cuisine Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {restaurant.cuisine.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-secondary/50 text-foreground/80 text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-foreground/80 text-sm leading-relaxed mb-4">
            {restaurant.fullDescription}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {restaurant.features.map((feature) => (
              <motion.span
                key={feature}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 rounded-full glass text-foreground/70 text-xs font-medium border border-border/30"
              >
                {feature}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="card-premium p-4 mb-4">
          {/* Address */}
          <motion.button
            whileHover={{ backgroundColor: "hsl(217 60% 22%)" }}
            whileTap={{ scale: 0.98 }}
            onClick={openInMaps}
            className="w-full flex items-center gap-3 mb-4 p-3 -m-3 rounded-xl transition-colors"
          >
            <div className="p-2.5 rounded-full bg-primary/20">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-foreground font-medium text-sm">{restaurant.suburb}, {restaurant.state} {restaurant.postcode}</p>
              <p className="text-foreground/50 text-xs">{restaurant.address}</p>
            </div>
            <Navigation className="w-4 h-4 text-primary" />
          </motion.button>
          
          {/* Divider */}
          <div className="h-px bg-border/30 my-3" />
          
          {/* Hours */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              className="p-2.5 rounded-full bg-primary/20"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <Clock className="w-5 h-5 text-primary" />
            </motion.div>
            <div>
              <p className="text-foreground font-medium text-sm">Open Today</p>
              <p className="text-foreground/50 text-xs">{restaurant.hours.today}</p>
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-border/30 my-3" />
          
          {/* Phone */}
          <a href={`tel:${restaurant.phone}`} className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-full bg-primary/20">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium text-sm">Call Restaurant</p>
              <p className="text-foreground/50 text-xs">{restaurant.phone}</p>
            </div>
          </a>
          
          {/* Website */}
          {restaurant.website && (
            <>
              <div className="h-px bg-border/30 my-3" />
              <a 
                href={restaurant.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <div className="p-2.5 rounded-full bg-primary/20">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Visit Website</p>
                  <p className="text-foreground/50 text-xs truncate">{restaurant.website}</p>
                </div>
              </a>
            </>
          )}
        </div>

        {/* Distance */}
        {restaurant.distance && (
          <div className="card-premium p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-primary/20">
                <Navigation className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">Distance</p>
                <p className="text-foreground/50 text-xs">
                  Approx {restaurant.distance} km from your location
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Deals Section */}
        {restaurantDeals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Available Deals</h2>
            </div>
            
            <div className="space-y-3">
              {restaurantDeals.map((deal, index) => (
                <DealCard 
                  key={deal.id} 
                  deal={deal} 
                  restaurant={restaurant} 
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default RestaurantDetails;
