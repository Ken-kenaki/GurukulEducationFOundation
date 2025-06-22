"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StudentSuccessCarousel() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    story: "",
    rating: 5,
  });

  const successStories = [
    {
      name: "Rahul Sharma",
      program: "MSc Computer Science, University of Toronto",
      review:
        "The guidance I received helped me secure admission with a 50% scholarship. The visa process was seamless!",
      rating: 5,
      image: "/student1.jpg",
    },
    {
      name: "Priya Patel",
      program: "MBA, London Business School",
      review:
        "From test prep to interview coaching, the support was exceptional. I got into my dream school!",
      rating: 5,
      image: "/student2.jpg",
    },
    {
      name: "Arjun Singh",
      program: "BEng Mechanical, University of Manchester",
      review:
        "They helped me choose the perfect program and university based on my interests and budget.",
      rating: 4,
      image: "/student3.jpg",
    },
    {
      name: "Neha Gupta",
      program: "PhD Neuroscience, University of Melbourne",
      review:
        "The research proposal assistance was invaluable. I'm now working with top researchers in my field.",
      rating: 5,
      image: "/student4.jpg",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setIsPopupOpen(false);
  };

  return (
    <div className="bg-[#F5F4F5] py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3C81] mb-4">
            Student Success Stories
          </h2>
          <p className="text-[#2C3C81]/80 text-lg max-w-3xl mx-auto">
            Hear from our students who achieved their international education
            dreams
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            className="!pb-12"
          >
            {successStories.map((story, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-200">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2C3C81]">{story.name}</h3>
                      <p className="text-sm text-[#2C3C81]/80">
                        {story.program}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < story.rating ? "text-[#C73D43]" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#2C3C81]/90 mb-6 flex-grow">
                    "{story.review}"
                  </p>
                  <button className="group flex items-center text-[#C73D43] hover:text-[#2C3C81] transition-colors mt-auto">
                    <span>Read full story</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Add Your Story Button */}
        <div className="text-center">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="group inline-flex items-center bg-[#C73D43] text-[#F5F4F5] px-8 py-3 rounded-lg font-semibold hover:bg-[#2C3C81] transition-colors"
          >
            Add Your Story Too
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Popup Form */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 text-[#2C3C81] hover:text-[#C73D43]"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-2xl font-bold text-[#2C3C81] mb-6">
                Share Your Success Story
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-[#2C3C81] mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#B2ACCE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3C81]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[#2C3C81] mb-2">
                    Your Story
                  </label>
                  <textarea
                    name="story"
                    value={formData.story}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-[#B2ACCE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3C81]"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-[#2C3C81] mb-2">Rating</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#B2ACCE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3C81]"
                  >
                    {[5, 4, 3, 2, 1].map((num) => (
                      <option key={num} value={num}>
                        {num} Star{num !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C73D43] text-[#F5F4F5] px-6 py-3 rounded-lg font-semibold hover:bg-[#2C3C81] transition-colors"
                >
                  Submit Your Story
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
