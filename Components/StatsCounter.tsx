"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StatsCounter() {
  const sectionRef = useRef(null);
  const studentRef = useRef(null);
  const universityRef = useRef(null);
  const countryRef = useRef(null);

  useEffect(() => {
    const counters = [
      { element: studentRef, end: 10000, suffix: "+" },
      { element: universityRef, end: 100, suffix: "+" },
      { element: countryRef, end: 5, suffix: "+" },
    ];

    counters.forEach((counter) => {
      gsap.to(counter.element.current, {
        innerText: counter.end,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        snap: { innerText: 1 },
        onUpdate: function () {
          counter.element.current.innerText =
            Math.floor(this.targets()[0].innerText) + counter.suffix;
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-[#2C3C81] text-[#F5F4F5] py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
          {/* Students Counter */}
          <div className="text-center">
            <div
              ref={studentRef}
              className="text-5xl md:text-6xl font-bold mb-2"
            >
              0+
            </div>
            <div className="text-xl md:text-2xl">Students</div>
          </div>

          {/* Universities Counter */}
          <div className="text-center">
            <div
              ref={universityRef}
              className="text-5xl md:text-6xl font-bold mb-2"
            >
              0+
            </div>
            <div className="text-xl md:text-2xl">Universities</div>
          </div>

          {/* Countries Counter */}
          <div className="text-center">
            <div
              ref={countryRef}
              className="text-5xl md:text-6xl font-bold mb-2"
            >
              0+
            </div>
            <div className="text-xl md:text-2xl">Countries</div>
          </div>
        </div>
      </div>
    </div>
  );
}
