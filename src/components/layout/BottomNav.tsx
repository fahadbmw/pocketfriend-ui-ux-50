import { motion } from "framer-motion";
import { Home, Tag, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Tag, label: "Deals", path: "/category" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-foreground/10"
    >
      <div className="container flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <Icon
                  className={`w-6 h-6 nav-icon ${
                    isActive ? "text-primary" : "text-foreground/60"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-primary" : "text-foreground/60"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
