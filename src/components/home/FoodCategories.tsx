import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import allCategoryLogo from "@/assets/all-category-logo.png";
import pizzaIcon from "@/assets/pizza-icon.png";
import burgerIcon from "@/assets/burger-icon.png";
import kebabIcon from "@/assets/kebab-icon.png";

const categories = [
  { id: "all", name: "All", icon: allCategoryLogo, gradient: "from-primary/20 to-orange-500/20" },
  { id: "pizza", name: "Pizza", icon: pizzaIcon, gradient: "from-red-500/20 to-orange-500/20" },
  { id: "burgers", name: "Burgers", icon: burgerIcon, gradient: "from-yellow-500/20 to-orange-500/20" },
  { id: "kebabs", name: "Kebabs", icon: kebabIcon, gradient: "from-amber-500/20 to-red-500/20" },
  { id: "continental", name: "Continental", emoji: "🍽️", gradient: "from-blue-500/20 to-purple-500/20" },
];

const FoodCategories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      return () => scrollContainer.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 120;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="px-4 py-6">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-lg font-bold text-foreground mb-4"
      >
        Food Categories
      </motion.h2>

      <div className="relative">
        {/* Left Arrow - Desktop Only */}
        {!isMobile && canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-card/90 backdrop-blur-sm border border-border/30 rounded-full shadow-lg hover:bg-primary/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category, index) => (
            <Link key={category.id} to={`/category?type=${category.id}`} className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`category-btn bg-gradient-to-br ${category.gradient} w-[72px] h-[88px]`}
              >
                {category.icon ? (
                  <motion.img
                    src={category.icon}
                    alt={category.name}
                    className="w-14 h-14 object-contain"
                    whileHover={{
                      y: [0, -4, 0],
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.5, ease: "easeInOut" }
                    }}
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ) : (
                  <motion.span
                    className="text-4xl"
                    whileHover={{
                      y: [0, -4, 0],
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.5, ease: "easeInOut" }
                    }}
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {category.emoji}
                  </motion.span>
                )}
                <span className="text-xs font-medium text-foreground/90 text-center">
                  {category.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Right Arrow - Desktop Only */}
        {!isMobile && canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-card/90 backdrop-blur-sm border border-border/30 rounded-full shadow-lg hover:bg-primary/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default FoodCategories;
