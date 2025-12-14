import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import HeroBanner from "@/components/home/HeroBanner";
import FoodCategories from "@/components/home/FoodCategories";
import DealsList from "@/components/home/DealsList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-2">
        <HeroBanner />
        <FoodCategories />
        <DealsList />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
