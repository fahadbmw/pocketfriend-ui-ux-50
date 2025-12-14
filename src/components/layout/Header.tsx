import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, MapPin, ChevronDown, Heart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const locations = [
  { id: "current", label: "Current Location" },
  { id: "melbourne", label: "Melbourne" },
];

const Header = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container flex items-center justify-between gap-2 py-2">
        {/* Logo - Left */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex-shrink-0"
        >
          <img src={logo} alt="PocketFriend" className="h-12 w-auto" />
        </motion.div>

        {/* Location Selector - Center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex-1 max-w-xs"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-background/50 border border-foreground/20 rounded-full text-xs hover:border-primary transition-colors w-full max-w-[180px]">
                <MapPin className="w-3 h-3 text-primary" />
                <span className="text-foreground truncate flex-1 text-left">
                  {selectedLocation.label}
                </span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-48 bg-background border border-border z-50"
            >
              {locations.map((location) => (
                <DropdownMenuItem
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                >
                  <MapPin className="w-3 h-3 text-primary" />
                  <span>{location.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Action Icons - Right */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/favorites"
              className="flex items-center justify-center p-1.5 rounded-full border border-foreground/20 hover:border-primary transition-colors"
            >
              <Heart className="w-4 h-4 text-foreground" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/search"
              className="flex items-center justify-center p-1.5 rounded-full border border-foreground/20 hover:border-primary transition-colors"
            >
              <Search className="w-4 h-4 text-foreground" />
            </Link>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-1.5 rounded-full border border-foreground/20 hover:border-primary transition-colors"
          >
            <Bell className="w-4 h-4 text-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full flex items-center justify-center text-[8px] font-bold text-primary-foreground">
              3
            </span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
