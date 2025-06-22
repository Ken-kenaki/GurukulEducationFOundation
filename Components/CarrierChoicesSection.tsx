"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CareerOption {
  title: string;
  description: string;
  icon: JSX.Element;
  countries: string[];
}

export default function CareerChoicesSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  const careerOptions: CareerOption[] = [
    {
      title: "Engineering & Technology",
      description:
        "Pursue degrees in Computer Science, Mechanical, Electrical, and more at top global universities.",
      icon: (
        <svg
          className="w-8 h-8 text-[#2C3C81]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      countries: ["USA", "Germany", "Canada", "Japan"],
    },
    {
      title: "Business & Management",
      description:
        "MBA and business degrees from world-renowned business schools and universities.",
      icon: (
        <svg
          className="w-8 h-8 text-[#2C3C81]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      countries: ["UK", "USA", "France", "Australia"],
    },
    {
      title: "Medicine & Healthcare",
      description:
        "Study medicine, nursing, or public health at prestigious medical institutions worldwide.",
      icon: (
        <svg
          className="w-8 h-8 text-[#2C3C81]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      countries: ["USA", "UK", "Australia", "Ireland"],
    },
    {
      title: "Computer Science & AI",
      description:
        "Cutting-edge programs in artificial intelligence, data science, and software engineering.",
      icon: (
        <svg
          className="w-8 h-8 text-[#2C3C81]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      countries: ["USA", "Canada", "Germany", "Sweden"],
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#F5F4F5] via-[#B2ACCE]/20 to-[#F5F4F5] py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] mb-4">
            Find What's Right For You
          </h2>
          <p className="text-[#2C3C81]/80 max-w-2xl mx-auto text-lg">
            Explore diverse career paths and find the perfect program to match
            your aspirations.
          </p>
        </div>

        <div className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
              type: "bullets",
            }}
            className="pb-12"
          >
            {careerOptions.map((career, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-[#B2ACCE]/30 hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6 md:p-8 h-full flex flex-col">
                    <div className="mb-4">{career.icon}</div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#2C3C81] mb-3">
                      {career.title}
                    </h3>
                    <p className="text-[#2C3C81]/80 mb-5 flex-grow">
                      {career.description}
                    </p>
                    <div className="mt-auto">
                      <div className="text-sm font-medium text-[#2C3C81] mb-2">
                        Popular Destinations:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {career.countries.map((country, i) => (
                          <span
                            key={i}
                            className="bg-[#B2ACCE]/20 text-[#2C3C81] px-3 py-1 rounded-full text-xs"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="swiper-pagination !relative !bottom-0 mt-8 flex justify-center gap-2" />
        </div>

        <div className="text-center mt-12">
          <button className="group flex items-center justify-center space-x-2 bg-[#C73D43] text-[#F5F4F5] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#2C3C81] hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md mx-auto">
            <span>EXPLORE ALL CAREER OPTIONS</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
