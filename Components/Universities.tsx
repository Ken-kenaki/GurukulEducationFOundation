"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function UniversitiesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const universities = [
    {
      name: "Harvard University",
      country: "USA",
      image: "/harvard.jpg",
      intake: "Fall: Sep | Spring: Jan",
      programs: "200+ undergraduate programs",
      ranking: "#1 in World University Rankings",
    },
    {
      name: "University of Oxford",
      country: "UK",
      image: "/oxford.jpg",
      intake: "Fall: Oct | Spring: Apr",
      programs: "150+ undergraduate programs",
      ranking: "#2 in World University Rankings",
    },
    {
      name: "University of Tokyo",
      country: "Japan",
      image: "/tokyo.jpg",
      intake: "Fall: Sep | Spring: Apr",
      programs: "90+ undergraduate programs",
      ranking: "#1 in Japan",
    },
    {
      name: "Seoul National University",
      country: "South Korea",
      image: "/seoul.jpg",
      intake: "Fall: Mar | Spring: Sep",
      programs: "85+ undergraduate programs",
      ranking: "#1 in Korea",
    },
    {
      name: "Stanford University",
      country: "USA",
      image: "/stanford.jpg",
      intake: "Fall: Sep | Winter: Jan",
      programs: "180+ undergraduate programs",
      ranking: "#3 in World University Rankings",
    },
    {
      name: "University of Cambridge",
      country: "UK",
      image: "/cambridge.jpg",
      intake: "Fall: Oct | Spring: Jan",
      programs: "160+ undergraduate programs",
      ranking: "#4 in World University Rankings",
    },
    {
      name: "Kyoto University",
      country: "Japan",
      image: "/kyoto.jpg",
      intake: "Fall: Apr | Spring: Oct",
      programs: "80+ undergraduate programs",
      ranking: "#2 in Japan",
    },
    {
      name: "KAIST",
      country: "South Korea",
      image: "/kaist.jpg",
      intake: "Fall: Mar | Spring: Sep",
      programs: "60+ undergraduate programs",
      ranking: "#2 in Korea",
    },
    {
      name: "MIT",
      country: "USA",
      image: "/mit.jpg",
      intake: "Fall: Sep | Spring: Feb",
      programs: "120+ undergraduate programs",
      ranking: "#5 in World University Rankings",
    },
    {
      name: "Imperial College London",
      country: "UK",
      image: "/imperial.jpg",
      intake: "Fall: Oct | Spring: Jan",
      programs: "140+ undergraduate programs",
      ranking: "#6 in World University Rankings",
    },
  ];

  return (
    <div className="bg-[#F5F4F5] py-16 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] mb-4">
            Discover Top Courses and Universities
          </h2>
          <p className="text-[#2C3C81]/80 text-lg max-w-3xl mx-auto">
            Explore our partner institutions across the globe offering
            world-class education and exceptional opportunities for
            international students.
          </p>
        </div>

        {/* University Carousel */}
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
            {universities.map((uni, index) => (
              <SwiperSlide key={index}>
                <div className="group relative h-80 rounded-xl overflow-hidden shadow-lg">
                  {/* University Image */}
                  <div className="absolute inset-0 bg-gray-200">
                    <img
                      src={uni.image}
                      alt={uni.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/70">
                    {/* Always Visible Info */}
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {uni.name}
                      </h3>
                      <p className="text-[#B2ACCE]">{uni.country}</p>
                    </div>

                    {/* Hidden Details - Reveals on Hover */}
                    <div className="max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-500">
                      <div className="pt-4 border-t border-[#B2ACCE]/30 space-y-3">
                        <div className="flex items-center text-white/90">
                          <span className="text-[#B2ACCE] mr-2">Intake:</span>
                          {uni.intake}
                        </div>
                        <div className="flex items-center text-white/90">
                          <span className="text-[#B2ACCE] mr-2">Programs:</span>
                          {uni.programs}
                        </div>
                        <div className="flex items-center text-white/90">
                          <span className="text-[#B2ACCE] mr-2">Ranking:</span>
                          {uni.ranking}
                        </div>
                      </div>
                      <button className="mt-4 group flex items-center text-[#B2ACCE] hover:text-white transition-colors">
                        <span>Explore Programs</span>
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
            View All Universities
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
