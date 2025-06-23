"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface StatData {
  value: string;
  label: string;
}

interface FloatingCard {
  position: string;
  bg: string;
  text: string;
  title: string;
  value: string;
}

export default function HeroSection(): JSX.Element {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const floatingCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textElementsRef = useRef<(HTMLElement | null)[]>([]);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [showConsultationModal, setShowConsultationModal] =
    useState<boolean>(false);
  const [showJourneyModal, setShowJourneyModal] = useState<boolean>(false);

  useEffect(() => {
    const animateElements = (): void => {
      // Animate text elements
      textElementsRef.current.forEach((el, index) => {
        if (el) {
          el.style.opacity = "0";
          el.style.transform = "translateY(30px)";
          setTimeout(() => {
            el.style.transition = "all 0.8s ease-out";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, index * 100);
        }
      });

      // Animate image container
      if (imageContainerRef.current) {
        imageContainerRef.current.style.opacity = "0";
        imageContainerRef.current.style.transform = "scale(0.9)";
        setTimeout(() => {
          if (imageContainerRef.current) {
            imageContainerRef.current.style.transition = "all 1s ease-out";
            imageContainerRef.current.style.opacity = "1";
            imageContainerRef.current.style.transform = "scale(1)";
          }
        }, 400);
      }

      // Animate buttons
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.children;
        Array.from(buttons).forEach((button, index) => {
          const buttonElement = button as HTMLElement;
          buttonElement.style.opacity = "0";
          buttonElement.style.transform = "translateY(20px)";
          setTimeout(() => {
            buttonElement.style.transition = "all 0.6s ease-out";
            buttonElement.style.opacity = "1";
            buttonElement.style.transform = "translateY(0)";
          }, 600 + index * 100);
        });
      }

      // Animate floating cards
      floatingCardsRef.current.forEach((card, index) => {
        if (card) {
          card.style.opacity = "0";
          card.style.transform = `translateY(50px) translateX(${
            index % 2 === 0 ? "30px" : "-30px"
          }) scale(0.8)`;
          setTimeout(() => {
            if (card) {
              card.style.transition =
                "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
              card.style.opacity = "1";
              card.style.transform = "translateY(0) translateX(0) scale(1)";
            }
          }, 800 + index * 150);
        }
      });
    };

    animateElements();
  }, []);

  const addToRefs =
    (
      refsArray: React.MutableRefObject<(HTMLElement | null)[]>,
      index: number
    ) =>
    (el: HTMLElement | null): void => {
      if (refsArray.current) {
        refsArray.current[index] = el;
      }
    };

  const addToFloatingRefs =
    (index: number) =>
    (el: HTMLDivElement | null): void => {
      if (floatingCardsRef.current) {
        floatingCardsRef.current[index] = el;
      }
    };

  const handleConsultationSubmit = (): void => {
    alert("Consultation booked! We will contact you soon.");
    setShowConsultationModal(false);
  };

  const handleJourneyStart = (): void => {
    setShowJourneyModal(false);
    setShowConsultationModal(true);
  };

  const ConsultationModal = (): JSX.Element => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all">
        <h3 className="text-xl font-bold text-[#2C3C81] mb-4">
          Book Free Consultation
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C73D43]"
              placeholder="Enter your full name"
              aria-label="Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C73D43]"
              placeholder="Enter your email"
              aria-label="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C73D43]"
              placeholder="Enter your phone number"
              aria-label="Phone Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Country
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C73D43]"
              aria-label="Preferred Country"
            >
              <option value="">Select Country</option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="uk">UK</option>
              <option value="australia">Australia</option>
              <option value="germany">Germany</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowConsultationModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleConsultationSubmit}
            className="flex-1 px-4 py-2 bg-[#C73D43] text-white rounded-md hover:bg-[#2C3C81] transition-colors"
            type="button"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

  const JourneyModal = (): JSX.Element => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 transform transition-all">
        <h3 className="text-xl font-bold text-[#2C3C81] mb-4">
          Start Your Education Journey
        </h3>
        <div className="space-y-4">
          <p className="text-gray-600">
            Choose your path to global education excellence:
          </p>
          <div className="grid grid-cols-1 gap-3">
            <button
              className="p-4 border rounded-lg hover:border-[#C73D43] hover:bg-red-50 transition-all text-left"
              type="button"
            >
              <div className="font-semibold text-[#2C3C81]">
                🎓 Undergraduate Programs
              </div>
              <div className="text-sm text-gray-600">
                Bachelor&apos;s degree programs worldwide
              </div>
            </button>
            <button
              className="p-4 border rounded-lg hover:border-[#C73D43] hover:bg-red-50 transition-all text-left"
              type="button"
            >
              <div className="font-semibold text-[#2C3C81]">
                📚 Graduate Programs
              </div>
              <div className="text-sm text-gray-600">
                Master&apos;s and PhD programs
              </div>
            </button>
            <button
              className="p-4 border rounded-lg hover:border-[#C73D43] hover:bg-red-50 transition-all text-left"
              type="button"
            >
              <div className="font-semibold text-[#2C3C81]">
                📝 Test Preparation
              </div>
              <div className="text-sm text-gray-600">
                IELTS, TOEFL, GRE, GMAT prep
              </div>
            </button>
            <button
              className="p-4 border rounded-lg hover:border-[#C73D43] hover:bg-red-50 transition-all text-left"
              type="button"
            >
              <div className="font-semibold text-[#2C3C81]">
                💰 Scholarship Guidance
              </div>
              <div className="text-sm text-gray-600">
                Find and apply for scholarships
              </div>
            </button>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowJourneyModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            type="button"
          >
            Close
          </button>
          <button
            onClick={handleJourneyStart}
            className="flex-1 px-4 py-2 bg-[#C73D43] text-white rounded-md hover:bg-[#2C3C81] transition-colors"
            type="button"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );

  const statsData: StatData[] = [
    { value: "98%", label: "Success Rate" },
    { value: "50+", label: "Universities" },
    { value: "15+", label: "Countries" },
  ];

  const floatingCardsData: FloatingCard[] = [
    {
      position: "top-4 right-0",
      bg: "bg-[#2C3C81]",
      text: "text-[#F5F4F5]",
      title: "IELTS/TOEFL",
      value: "Expert Prep",
    },
    {
      position: "top-1/2 left-0",
      bg: "bg-[#C73D43]",
      text: "text-[#F5F4F5]",
      title: "Scholarships",
      value: "$2M+ Secured",
    },
    {
      position: "bottom-1/3 right-0",
      bg: "bg-[#B2ACCE]",
      text: "text-[#2C3C81]",
      title: "Visa Success",
      value: "98% Rate",
    },
    {
      position: "bottom-4 left-0",
      bg: "bg-[#2C3C81]",
      text: "text-[#F5F4F5]",
      title: "Since",
      value: "2010",
    },
  ];

  return (
    <>
      <div
        ref={heroRef}
        className="bg-[#F5F4F5] min-h-screen pt-24 md:pt-32 pb-8 md:pb-16 overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6">
                <div
                  ref={addToRefs(textElementsRef, 0)}
                  className="inline-block bg-[#B2ACCE]/30 text-[#2C3C81] px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium"
                >
                  Trusted by 10,000+ Students Worldwide
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span
                    ref={addToRefs(textElementsRef, 1)}
                    className="text-[#2C3C81] block"
                  >
                    Your Gateway to{" "}
                  </span>
                  <span
                    ref={addToRefs(textElementsRef, 2)}
                    className="text-[#C73D43] block"
                  >
                    Global
                  </span>
                  <span
                    ref={addToRefs(textElementsRef, 3)}
                    className="text-[#C73D43] block"
                  >
                    Education{" "}
                  </span>
                  <span
                    ref={addToRefs(textElementsRef, 4)}
                    className="text-[#2C3C81] block"
                  >
                    Excellence
                  </span>
                </h1>

                <p
                  ref={addToRefs(textElementsRef, 5)}
                  className="text-[#2C3C81]/80 text-base md:text-lg max-w-lg leading-relaxed"
                >
                  At Gurukul Education Foundation, we transform dreams into
                  reality. Expert guidance, comprehensive test prep, and
                  personalized support for your international education journey.
                </p>
              </div>

              <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowJourneyModal(true)}
                  className="group flex items-center justify-center space-x-2 bg-[#C73D43] text-[#F5F4F5] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#2C3C81] hover:shadow-lg transition-all duration-300 shadow-md"
                  type="button"
                >
                  <span>START YOUR JOURNEY</span>
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setShowConsultationModal(true)}
                  className="group flex items-center justify-center space-x-2 bg-transparent border-2 border-[#2C3C81] text-[#2C3C81] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#2C3C81] hover:text-[#F5F4F5] hover:shadow-lg transition-all duration-300"
                  type="button"
                >
                  <span>📞</span>
                  <span className="text-sm md:text-base">
                    BOOK FREE CONSULTATION
                  </span>
                </button>
              </div>

              {/* Success Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-[#B2ACCE]/30">
                {statsData.map((stat, index) => (
                  <div
                    key={`stat-${index}`}
                    ref={addToRefs(textElementsRef, 6 + index)}
                    className="text-center"
                  >
                    <div className="text-xl md:text-2xl font-bold text-[#C73D43]">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-[#2C3C81]/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Hero Image with Floating Elements */}
            <div className="relative mt-8 lg:mt-0">
              <div
                ref={imageContainerRef}
                className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden flex items-center justify-center"
              >
                {/* Hero Image */}
                <Image
                  src="/girl.png"
                  alt="Students studying abroad - Gurukul Education Foundation"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Enhanced Floating Cards */}
                {floatingCardsData.map((card, index) => (
                  <div
                    key={`card-${index}`}
                    ref={addToFloatingRefs(index)}
                    className={`absolute ${card.position} ${card.bg} ${card.text} px-4 py-3 rounded-xl shadow-lg transition-all duration-300 cursor-pointer z-10 hover:z-20 hover:scale-110 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    <div className="text-xs opacity-80">{card.title}</div>
                    <div className="font-bold text-sm">{card.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showConsultationModal && <ConsultationModal />}
      {showJourneyModal && <JourneyModal />}
    </>
  );
}
