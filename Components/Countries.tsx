"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CountriesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const countries = [
    {
      name: "United States",
      flag: "🇺🇸",
      image: "/usa.jpg",
      intake: "Fall: Aug-Sep | Spring: Jan",
      programs: "4,000+ institutions",
      ranking: "Top destinations: NYU, Harvard, Stanford",
    },
    {
      name: "United Kingdom",
      flag: "🇬🇧",
      image: "/uk.jpg",
      intake: "Fall: Sep-Oct | Spring: Jan",
      programs: "160+ universities",
      ranking: "Top destinations: Oxford, Cambridge, Imperial",
    },
    {
      name: "Canada",
      flag: "🇨🇦",
      image: "/canada.jpg",
      intake: "Fall: Sep | Winter: Jan",
      programs: "100+ universities",
      ranking: "Top destinations: UofT, UBC, McGill",
    },
    {
      name: "Australia",
      flag: "🇦🇺",
      image: "/australia.jpg",
      intake: "Semester 1: Feb | Semester 2: Jul",
      programs: "43 universities",
      ranking: "Top destinations: Melbourne, Sydney, ANU",
    },
    {
      name: "Germany",
      flag: "🇩🇪",
      image: "/germany.jpg",
      intake: "Winter: Oct | Summer: Apr",
      programs: "400+ institutions",
      ranking: "Top destinations: TUM, Heidelberg, LMU",
    },
    {
      name: "Japan",
      flag: "🇯🇵",
      image: "/japan.jpg",
      intake: "Spring: Apr | Fall: Sep",
      programs: "800+ universities",
      ranking: "Top destinations: Tokyo, Kyoto, Osaka",
    },
    {
      name: "South Korea",
      flag: "🇰🇷",
      image: "/korea.jpg",
      intake: "Spring: Mar | Fall: Sep",
      programs: "400+ universities",
      ranking: "Top destinations: SNU, KAIST, Yonsei",
    },
    {
      name: "France",
      flag: "🇫🇷",
      image: "/france.jpg",
      intake: "Fall: Sep | Spring: Jan",
      programs: "3,500+ institutions",
      ranking: "Top destinations: Sorbonne, ENS, Polytechnique",
    },
    {
      name: "Netherlands",
      flag: "🇳🇱",
      image: "/netherlands.jpg",
      intake: "Fall: Sep | Spring: Feb",
      programs: "50+ universities",
      ranking: "Top destinations: Delft, Amsterdam, Leiden",
    },
    {
      name: "Sweden",
      flag: "🇸🇪",
      image: "/sweden.jpg",
      intake: "Autumn: Aug | Spring: Jan",
      programs: "50+ universities",
      ranking: "Top destinations: Lund, Uppsala, KTH",
    },
  ];

  return (
    <div className="bg-[#F5F4F5] py-16 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] mb-4">
            Explore Study Destinations
          </h2>
          <p className="text-[#2C3C81]/80 text-lg max-w-3xl mx-auto">
            Discover countries offering world-class education and exceptional
            opportunities for international students.
          </p>
        </div>

        {/* Country Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="!pb-12"
          >
            {countries.map((country, index) => (
              <SwiperSlide key={index}>
                <div className="group relative h-80 rounded-xl overflow-hidden shadow-lg">
                  {/* Country Image */}
                  <div className="absolute inset-0 bg-gray-200">
                    <img
                      src={country.image}
                      alt={country.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/70">
                    {/* Always Visible Info */}
                    <div className="mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{country.flag}</span>
                        <h3 className="text-xl font-bold text-white">
                          {country.name}
                        </h3>
                      </div>
                    </div>

                    {/* Hidden Details - Reveals on Hover */}
                    <div className="max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-500">
                      <div className="pt-4 border-t border-[#B2ACCE]/30 space-y-3">
                        <div className="flex items-center text-white/90">
                          <span className="text-[#B2ACCE] mr-2">Intake:</span>
                          {country.intake}
                        </div>
                        <div className="flex items-center text-white/90">
                          <span className="text-[#B2ACCE] mr-2">
                            Institutions:
                          </span>
                          {country.programs}
                        </div>
                        <div className="flex items-center text-white/90">
                          <span className="text-[#B2ACCE] mr-2">
                            Top Schools:
                          </span>
                          {country.ranking}
                        </div>
                      </div>
                      <button className="mt-4 group flex items-center text-[#B2ACCE] hover:text-white transition-colors">
                        <span>Explore {country.name}</span>
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="group inline-flex items-center bg-[#C73D43] text-[#F5F4F5] px-8 py-3 rounded-lg font-semibold hover:bg-[#2C3C81] transition-colors">
            View All Countries
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
