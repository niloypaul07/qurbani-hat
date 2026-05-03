"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/homepage/HeroSection";
import FeaturedAnimals from "@/components/homepage/FeaturedAnimals";
import QurbaniTips from "@/components/homepage/QurbaniTips";
import TopBreeds from "@/components/homepage/TopBreeds";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturedAnimals />
      <QurbaniTips></QurbaniTips>
      <TopBreeds></TopBreeds>
      <Footer />
    </div>
  );
}