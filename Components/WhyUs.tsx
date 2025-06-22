"use client";

import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function WhyUs() {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const contentRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(entry.target.querySelectorAll(".animate-item"), {
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const sections = sectionRef.current.querySelectorAll(".why-us-section");
      sections.forEach((section) => observer.observe(section));
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Decades of Expertise",
      description:
        "With over 20 years in international education, our counselors have successfully guided thousands of students to their dream universities worldwide.",
      image: "/why-us-1.jpg",
      imagePosition: "left",
      buttonText: "MEET OUR TEAM",
    },
    {
      title: "Personalized Approach",
      description:
        "Every student receives a customized roadmap tailored to their academic background, career goals, and personal aspirations.",
      image: "/why-us-2.jpg",
      imagePosition: "right",
      buttonText: "SEE SUCCESS STORIES",
    },
    {
      title: "End-to-End Support",
      description:
        "From test preparation to visa approval and post-arrival assistance, we're with you at every step of your journey.",
      image: "/why-us-3.jpg",
      imagePosition: "left",
      buttonText: "VIEW OUR SERVICES",
    },
  ];

  return (
    <div ref={sectionRef} className="bg-[#F5F4F5] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] mb-4 animate-item">
            Why Choose Us?
          </h2>
          <div className="w-20 h-1 bg-[#C73D43] mx-auto animate-item"></div>
        </div>

        {features.map((feature, index) => (
          <div
            key={index}
            className={`why-us-section mb-24 last:mb-0 flex flex-col ${
              feature.imagePosition === "right"
                ? "lg:flex-row-reverse"
                : "lg:flex-row"
            } items-center gap-8 lg:gap-12`}
          >
            {/* Image Section */}
            <div
              ref={(el) => (imageRefs.current[index] = el)}
              className={`w-full lg:w-1/2 h-80 md:h-96 relative rounded-xl overflow-hidden shadow-xl animate-item`}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className={`w-full lg:w-1/2 space-y-6 animate-item ${
                feature.imagePosition === "right" ? "lg:pr-8" : "lg:pl-8"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#2C3C81]">
                {feature.title}
              </h3>
              <p className="text-[#2C3C81]/80 text-lg leading-relaxed">
                {feature.description}
              </p>
              <button className="group flex items-center space-x-2 bg-[#C73D43] text-[#F5F4F5] px-6 py-3 rounded-lg font-semibold hover:bg-[#2C3C81] hover:shadow-lg transition-all duration-300 shadow-md">
                <span>{feature.buttonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
