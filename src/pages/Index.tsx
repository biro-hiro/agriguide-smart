import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import HeroSection from "@/components/home/HeroSection";
import SectionGrid from "@/components/home/SectionGrid";
import SeasonalCrops from "@/components/home/SeasonalCrops";
import QuickTips from "@/components/home/QuickTips";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="max-w-6xl mx-auto">
        <HeroSection />
        <SectionGrid />
        <SeasonalCrops />
        <QuickTips />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
