import React from "react";
import HeroSection from "../pages/HeroSection";
import RecentPalace from "../pages/RecentPalace";
import SubHeroSection from "../pages/SubHeroSection";
import TopLikedPalace from "../pages/TopLikedPalace";
import CategoryLayout from "./CategoryLayout";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <SubHeroSection />
      <RecentPalace />
      <TopLikedPalace />
      <CategoryLayout />
    </div>
  );
};

export default HomePage;
