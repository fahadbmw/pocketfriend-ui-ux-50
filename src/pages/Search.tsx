import { useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search restaurants, deals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background/50 border-foreground/20 rounded-full text-base placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
          
          <div className="text-center py-8">
            <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {query ? `Searching for "${query}"...` : "Start typing to search"}
            </p>
          </div>
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Search;
