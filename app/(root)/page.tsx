import HeroSection from "@/Components/Hero";
import CareerChoicesSection from "@/Components/CarrierChoicesSection";
import WhyUs from "@/Components/WhyUs";
import React from "react";
import NewsEventsCarousel from "@/Components/NewsEvents";
import StatsCounter from "@/Components/StatsCounter";
import UniversitiesCarousel from "@/Components/Universities";
import StudentSuccessCarousel from "@/Components/StudentSuccess";
import CountriesCarousel from "@/Components/Countries";

export default async function page() {
  return (
    <main>
      <HeroSection />
      <CareerChoicesSection />
      <WhyUs />
      <NewsEventsCarousel />
      <StatsCounter />
      <UniversitiesCarousel />
      <StudentSuccessCarousel />
      <CountriesCarousel />
    </main>
  );
}
