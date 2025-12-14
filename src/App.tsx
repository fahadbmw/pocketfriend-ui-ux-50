import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroSplash from "./components/IntroSplash";
import Index from "./pages/Index";
import Category from "./pages/Category";
import DealDetails from "./pages/DealDetails";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import Wallet from "./pages/Wallet";
import QRScanner from "./pages/QRScanner";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import DiscountsHistory from "./pages/DiscountsHistory";
import TermsPolicies from "./pages/TermsPolicies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <IntroSplash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category" element={<Category />} />
            <Route path="/deal/:id" element={<DealDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/qr" element={<QRScanner />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
            <Route path="/discounts-history" element={<DiscountsHistory />} />
            <Route path="/terms-policies" element={<TermsPolicies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
