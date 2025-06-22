"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showTestPrep, setShowTestPrep] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerButtonRef = useRef(null);
  const navbarRef = useRef(null);
  const dropdownRef = useRef(null);
  const testPrepRef = useRef(null);
  const servicesRef = useRef(null);

  const destinations = [
    { name: "Australia" },
    { name: "Canada" },
    { name: "USA" },
    { name: "UK" },
    { name: "New Zealand" },
    { name: "Germany" },
    { name: "Ireland" },
    { name: "Japan" },
  ];

  const testPreparations = [
    { name: "IELTS Preparation" },
    { name: "TOEFL Preparation" },
    { name: "PTE Preparation" },
    { name: "GRE Preparation" },
    { name: "GMAT Preparation" },
    { name: "SAT Preparation" },
  ];

  const services = [
    { name: "University Selection" },
    { name: "Visa Assistance" },
    { name: "Scholarship Guidance" },
    { name: "Document Preparation" },
    { name: "Pre-Departure Briefing" },
    { name: "Post-Arrival Support" },
  ];

  // Handle click outside mobile menu and dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerButtonRef.current &&
        !hamburgerButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDestinations(false);
      }

      if (testPrepRef.current && !testPrepRef.current.contains(event.target)) {
        setShowTestPrep(false);
      }

      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setShowServices(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll behavior for both navbars
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && isScrolledUp) {
          setIsScrolledUp(false);
        } else if (currentScrollY < lastScrollY && !isScrolledUp) {
          setIsScrolledUp(true);
        }
      } else {
        setIsScrolledUp(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isScrolledUp]);

  return (
    <>
      {/* Top Header Bar - Desktop Only */}
      <div
        className={`hidden lg:block bg-[#2C3C81] text-[#F5F4F5] py-2 px-4 text-sm fixed w-full z-50 transition-transform duration-300 ease-in-out ${
          isScrolledUp ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex justify-end items-center space-x-4 md:space-x-8">
          <span className="hover:text-[#B2ACCE] cursor-pointer transition-colors text-xs md:text-sm">
            NEWS & OFFER
          </span>
          <span className="hover:text-[#B2ACCE] cursor-pointer transition-colors text-xs md:text-sm">
            GALLERY
          </span>
          <button className="flex items-center space-x-1 hover:text-[#B2ACCE] transition-colors text-xs md:text-sm">
            <span>LOGIN</span>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        ref={navbarRef}
        className={`bg-white shadow-lg fixed lg:top-[40px] top-0 z-50 w-full transition-transform duration-300 ease-in-out ${
          isScrolledUp ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl md:text-3xl font-bold">
                <span className="text-[#2C3C81]">LOGO</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {/* Study Destinations Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
                  onMouseEnter={() => setShowDestinations(true)}
                  onClick={() => setShowDestinations(!showDestinations)}
                >
                  STUDY DESTINATIONS
                  <ChevronDown
                    className={`ml-1 w-4 h-4 transition-transform ${
                      showDestinations ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showDestinations && (
                  <div
                    className="absolute top-full w-[60vw] -left-[10vw] mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-4 z-50"
                    onMouseLeave={() => setShowDestinations(false)}
                  >
                    <div className="grid grid-cols-2 gap-2 px-4">
                      {destinations.map((destination, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[#F5F4F5] transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {destination.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#"
                className="text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
              >
                UNIVERSITIES
              </a>

              {/* Test Preparations Dropdown */}
              <div className="relative" ref={testPrepRef}>
                <button
                  className="flex items-center text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
                  onMouseEnter={() => setShowTestPrep(true)}
                  onClick={() => setShowTestPrep(!showTestPrep)}
                >
                  TEST PREPARATIONS
                  <ChevronDown
                    className={`ml-1 w-4 h-4 transition-transform ${
                      showTestPrep ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showTestPrep && (
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-64 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-4 z-50"
                    onMouseLeave={() => setShowTestPrep(false)}
                  >
                    <div className="space-y-2 px-4">
                      {testPreparations.map((test, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[#F5F4F5] transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {test.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#"
                className="text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
              >
                ABOUT US
              </a>

              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  className="flex items-center text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
                  onMouseEnter={() => setShowServices(true)}
                  onClick={() => setShowServices(!showServices)}
                >
                  SERVICES
                  <ChevronDown
                    className={`ml-1 w-4 h-4 transition-transform ${
                      showServices ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showServices && (
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-64 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-4 z-50"
                    onMouseLeave={() => setShowServices(false)}
                  >
                    <div className="space-y-2 px-4">
                      {services.map((service, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[#F5F4F5] transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {service.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#"
                className="text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
              >
                CONTACT
              </a>

              <button className="bg-[#C73D43] text-[#F5F4F5] px-4 xl:px-6 py-2 rounded font-medium hover:bg-[#B2ACCE] hover:text-[#2C3C81] transition-all duration-300 whitespace-nowrap">
                GET CONSULTATION
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={hamburgerButtonRef}
              className="lg:hidden hover:scale-110 transition-transform duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Combined with top navbar items */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 w-80 bg-white h-screen transform transition-transform duration-300 ease-in-out z-100 shadow-xl ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <button
              className="absolute top-4 right-4 hover:scale-110 transition-transform duration-200"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col space-y-6 mt-12">
              {/* Mobile Top Nav Items */}
              <div className="border-b pb-4">
                <a
                  href="#"
                  className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium"
                >
                  NEWS & OFFER
                </a>
                <a
                  href="#"
                  className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium"
                >
                  GALLERY
                </a>
                <a
                  href="#"
                  className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium"
                >
                  LOGIN
                </a>
              </div>

              {/* Mobile Study Destinations */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 hover:text-[#2C3C81] font-medium py-2 transition-colors"
                  onClick={() => setShowDestinations(!showDestinations)}
                >
                  <span>STUDY DESTINATIONS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showDestinations ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showDestinations && (
                  <div className="ml-4 mt-2 space-y-2">
                    {destinations.map((destination, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block py-1 text-sm text-gray-600 hover:text-[#2C3C81]"
                      >
                        {destination.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Universities */}
              <a
                href="#"
                className="text-gray-700 hover:text-[#2C3C81] font-medium py-2"
              >
                UNIVERSITIES
              </a>

              {/* Mobile Test Preparations */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 hover:text-[#2C3C81] font-medium py-2 transition-colors"
                  onClick={() => setShowTestPrep(!showTestPrep)}
                >
                  <span>TEST PREPARATIONS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showTestPrep ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showTestPrep && (
                  <div className="ml-4 mt-2 space-y-2">
                    {testPreparations.map((test, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block py-1 text-sm text-gray-600 hover:text-[#2C3C81]"
                      >
                        {test.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile About Us */}
              <a
                href="#"
                className="text-gray-700 hover:text-[#2C3C81] font-medium py-2"
              >
                ABOUT US
              </a>

              {/* Mobile Services */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 hover:text-[#2C3C81] font-medium py-2 transition-colors"
                  onClick={() => setShowServices(!showServices)}
                >
                  <span>SERVICES</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showServices ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showServices && (
                  <div className="ml-4 mt-2 space-y-2">
                    {services.map((service, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block py-1 text-sm text-gray-600 hover:text-[#2C3C81]"
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Contact */}
              <a
                href="#"
                className="text-gray-700 hover:text-[#2C3C81] font-medium py-2"
              >
                CONTACT
              </a>

              <button className="w-full bg-[#C73D43] text-[#F5F4F5] px-6 py-3 rounded font-medium hover:bg-[#B2ACCE] hover:text-[#2C3C81] transition-all duration-300">
                GET CONSULTATION
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
