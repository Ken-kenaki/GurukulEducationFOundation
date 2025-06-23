"use client";

import React, { useState, useRef, useEffect } from "react";

export default function Admission() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const statsRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => setShowSuccess(false), 3000);
      setIsSubmitting(false);
    }, 1500);
  };

  // Animation setup
  useEffect(() => {
    if (statsRef.current) {
      const children = statsRef.current.children;
      Array.from(children).forEach((child, index) => {
        child.style.opacity = "0";
        child.style.transform = "translateY(30px)";

        setTimeout(() => {
          child.style.transition =
            "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
          child.style.opacity = "1";
          child.style.transform = "translateY(0)";
        }, index * 200 + 500);
      });
    }
  }, []);

  const stats = [
    { number: "2000+", label: "Students Abroad" },
    { number: "12+", label: "Years Experience" },
    { number: "95%", label: "Visa Success Rate" },
  ];

  return (
    <div
      className="min-h-screen pt-50 py-12 px-4 sm:px-6"
      style={{ background: "linear-gradient(to bottom, #F5F4F5, #ffffff)" }}
    >
      {/* Success Popup */}
      {showSuccess && (
        <div
          className="fixed top-4 right-4 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce"
          style={{ backgroundColor: "#2C3C81" }}
        >
          Consultation Request Successful! We'll contact you soon.
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#2C3C81" }}
          >
            Study Abroad Consultation
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "#666" }}>
            Turn your dream of studying abroad into reality with Nepal's trusted
            education consultancy
          </p>
        </div>

        {/* Hero Image with Animated Stats */}
        <div className="relative mb-16">
          <div className="relative h-[500px] w-full flex items-center justify-center">
            {/* Hero Image - Clean PNG without background */}
            <img
              src="/hero.png"
              alt="Study Abroad Consultation"
              className="max-h-full max-w-full object-contain"
            />

            {/* Animated Stats */}
            <div
              ref={statsRef}
              className="absolute inset-0 pointer-events-none"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`absolute bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center border-2 pointer-events-auto ${
                    index === 0
                      ? "w-32 top-16 -left-8"
                      : index === 1
                      ? "w-36 top-8 -right-16"
                      : "w-40 bottom-16 right-8"
                  }`}
                  style={{ borderColor: "#C73D43" }}
                >
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "#C73D43" }}
                  >
                    {stat.number}
                  </span>
                  <span
                    className="text-sm text-center"
                    style={{ color: "#666" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Consultation Form */}
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto"
          style={{ border: "2px solid #B2ACCE" }}
        >
          <div className="p-8 sm:p-10">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: "#2C3C81" }}
            >
              Free Consultation
            </h2>
            <p className="mb-8" style={{ color: "#666" }}>
              Get expert guidance on your study abroad journey
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#2C3C81" }}
                  >
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg transition focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "#B2ACCE",
                      focusRingColor: "#C73D43",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#C73D43")}
                    onBlur={(e) => (e.target.style.borderColor = "#B2ACCE")}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#2C3C81" }}
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg transition focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "#B2ACCE",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#C73D43")}
                    onBlur={(e) => (e.target.style.borderColor = "#B2ACCE")}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#2C3C81" }}
                >
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg transition focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "#B2ACCE",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#C73D43")}
                  onBlur={(e) => (e.target.style.borderColor = "#B2ACCE")}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#2C3C81" }}
                >
                  Tell us about your study abroad goals (Optional)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Which country are you interested in? What course would you like to pursue?"
                  className="w-full px-4 py-3 border rounded-lg transition focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "#B2ACCE",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#C73D43")}
                  onBlur={(e) => (e.target.style.borderColor = "#B2ACCE")}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full text-white py-4 px-6 rounded-lg font-bold text-lg transition transform hover:scale-[1.02] shadow-md disabled:opacity-70"
                style={{
                  backgroundColor: "#C73D43",
                  ":hover": { backgroundColor: "#B12B31" },
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#B12B31")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#C73D43")
                }
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Request Free Consultation"
                )}
              </button>
            </div>
          </div>

          <div
            className="p-6 text-center"
            style={{ backgroundColor: "#F5F4F5" }}
          >
            <p style={{ color: "#2C3C81" }}>
              Ready to start your journey? Call us at{" "}
              <span className="font-semibold" style={{ color: "#C73D43" }}>
                9844162726
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
