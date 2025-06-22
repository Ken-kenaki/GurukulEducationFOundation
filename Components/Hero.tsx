"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const heroRef = useRef(null);
  const imageContainerRef = useRef(null);
  const floatingCardsRef = useRef([]);
  const textElementsRef = useRef([]);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for coordinated animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Text elements animation
    tl.from(textElementsRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
    });

    // Hero image animation
    tl.from(
      imageContainerRef.current,
      {
        scale: 0.9,
        opacity: 0,
        duration: 1,
      },
      "-=0.5"
    );

    // Buttons animation
    tl.from(
      buttonsRef.current.children,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.4"
    );

    // Floating cards animation with more dynamic effects
    floatingCardsRef.current.forEach((card, index) => {
      if (!card) return;

      const delay = 0.8 + index * 0.15;
      gsap.from(card, {
        y: 50,
        x: index % 2 === 0 ? 30 : -30,
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay,
        ease: "back.out(1.7)",
      });

      // Hover effects
      const hoverAnimation = () => {
        gsap.to(card, {
          scale: 1.1,
          y: -5,
          duration: 0.3,
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
        });
      };

      const hoverOutAnimation = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        });
      };

      card.addEventListener("mouseenter", hoverAnimation);
      card.addEventListener("mouseleave", hoverOutAnimation);

      // Cleanup function
      return () => {
        card.removeEventListener("mouseenter", hoverAnimation);
        card.removeEventListener("mouseleave", hoverOutAnimation);
      };
    });

    return () => {
      // Clean up all GSAP animations
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="bg-[#F5F4F5] min-h-screen pt-24 md:pt-32 pb-8 md:pb-16 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <div
                ref={(el) => (textElementsRef.current[0] = el)}
                className="inline-block bg-[#B2ACCE]/30 text-[#2C3C81] px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium"
              >
                Trusted by 10,000+ Students Worldwide
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span
                  ref={(el) => (textElementsRef.current[1] = el)}
                  className="text-[#2C3C81] block"
                >
                  Your Gateway to{" "}
                </span>
                <span
                  ref={(el) => (textElementsRef.current[2] = el)}
                  className="text-[#C73D43] block"
                >
                  Global
                </span>
                <span
                  ref={(el) => (textElementsRef.current[3] = el)}
                  className="text-[#C73D43] block"
                >
                  Education{" "}
                </span>
                <span
                  ref={(el) => (textElementsRef.current[4] = el)}
                  className="text-[#2C3C81] block"
                >
                  Excellence
                </span>
              </h1>

              <p
                ref={(el) => (textElementsRef.current[5] = el)}
                className="text-[#2C3C81]/80 text-base md:text-lg max-w-lg leading-relaxed"
              >
                At Gurukul Education Foundation, we transform dreams into
                reality. Expert guidance, comprehensive test prep, and
                personalized support for your international education journey.
              </p>
            </div>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <button className="group flex items-center justify-center space-x-2 bg-[#C73D43] text-[#F5F4F5] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#2C3C81] hover:shadow-lg transition-all duration-300 shadow-md">
                <span>START YOUR JOURNEY</span>
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group flex items-center justify-center space-x-2 bg-transparent border-2 border-[#2C3C81] text-[#2C3C81] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#2C3C81] hover:text-[#F5F4F5] hover:shadow-lg transition-all duration-300">
                <span>📞</span>
                <span className="text-sm md:text-base">
                  BOOK FREE CONSULTATION
                </span>
              </button>
            </div>

            {/* Success Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-[#B2ACCE]/30">
              {[
                { value: "98%", label: "Success Rate" },
                { value: "50+", label: "Universities" },
                { value: "15+", label: "Countries" },
              ].map((stat, index) => (
                <div
                  key={index}
                  ref={(el) => (textElementsRef.current[6 + index] = el)}
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

          {/* Right Content - Student Image with Floating Elements */}
          <div className="relative mt-8 lg:mt-0">
            <div
              ref={imageContainerRef}
              className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]"
            >
              <Image
                src="/hero.png" // Replace with your actual image path
                alt="Happy student"
                fill
                priority
                quality={100}
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Enhanced Floating Cards */}
              {[
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
              ].map((card, index) => (
                <div
                  key={index}
                  ref={(el) => (floatingCardsRef.current[index] = el)}
                  className={`absolute ${card.position} ${card.bg} ${card.text} px-4 py-3 rounded-xl shadow-lg transition-all duration-300 cursor-pointer z-10 hover:z-20`}
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
  );
}
