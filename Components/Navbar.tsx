"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Changed from isScrolledUp
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
    { name: "Australia", route: "/australia" },
    { name: "Canada", route: "/canada" },
    { name: "USA", route: "/usa" },
    { name: "UK", route: "/uk" },
    { name: "New Zealand", route: "/new-zealand" },
    { name: "Germany", route: "/germany" },
    { name: "Ireland", route: "/ireland" },
    { name: "Japan", route: "/japan" },
  ];

  const testPreparations = [
    { name: "IELTS Preparation", route: "/ielts-preparation" },
    { name: "TOEFL Preparation", route: "/toefl-preparation" },
    { name: "PTE Preparation", route: "/pte-preparation" },
    { name: "GRE Preparation", route: "/gre-preparation" },
    { name: "GMAT Preparation", route: "/gmat-preparation" },
    { name: "SAT Preparation", route: "/sat-preparation" },
  ];

  const services = [
    { name: "University Selection", route: "/university-selection" },
    { name: "Visa Assistance", route: "/visa-assistance" },
    { name: "Scholarship Guidance", route: "/scholarship-guidance" },
    { name: "Document Preparation", route: "/document-preparation" },
    { name: "Pre-Departure Briefing", route: "/pre-departure-briefing" },
    { name: "Post-Arrival Support", route: "/post-arrival-support" },
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

  // FIXED: Handle scroll behavior for complete hiding
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when near top
      if (currentScrollY < 50) {
        setIsVisible(true);
      }
      // Hide/show based on scroll direction after 50px
      else if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down - hide completely
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Top Header Bar - Desktop Only */}
      <div
        className={`hidden lg:block bg-[#2C3C81] text-[#F5F4F5] py-2 px-4 text-sm fixed w-full z-50 transition-all duration-300 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto flex justify-end items-center space-x-4 md:space-x-8">
          <Link
            href="/news-offer"
            className="hover:text-[#B2ACCE] cursor-pointer transition-colors text-xs md:text-sm"
          >
            NEWS & OFFER
          </Link>
          <Link
            href="/gallery"
            className="hover:text-[#B2ACCE] cursor-pointer transition-colors text-xs md:text-sm"
          >
            GALLERY
          </Link>
          <Link
            href="/login"
            className="flex items-center space-x-1 hover:text-[#B2ACCE] transition-colors text-xs md:text-sm"
          >
            <span>LOGIN</span>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        ref={navbarRef}
        className={`bg-white shadow-lg fixed lg:top-[40px] top-0 z-50 w-full transition-all duration-300 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl md:text-3xl font-bold">
                <span className="text-[#2C3C81]">LOGO</span>
              </Link>
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
                        <Link
                          key={index}
                          href={destination.route}
                          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[#F5F4F5] transition-colors"
                          onClick={() => setShowDestinations(false)}
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {destination.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/universities"
                className="text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
              >
                UNIVERSITIES
              </Link>

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
                        <Link
                          key={index}
                          href={test.route}
                          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[#F5F4F5] transition-colors"
                          onClick={() => setShowTestPrep(false)}
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {test.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about-us"
                className="text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
              >
                ABOUT US
              </Link>

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
                        <Link
                          key={index}
                          href={service.route}
                          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[#F5F4F5] transition-colors"
                          onClick={() => setShowServices(false)}
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {service.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#2C3C81] font-medium transition-colors"
              >
                CONTACT
              </Link>

              <Link
                href="/consultation"
                className="bg-[#C73D43] text-[#F5F4F5] px-4 xl:px-6 py-2 rounded font-medium hover:bg-[#B2ACCE] hover:text-[#2C3C81] transition-all duration-300 whitespace-nowrap"
              >
                GET CONSULTATION
              </Link>
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
                <Link
                  href="/news-offer"
                  className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  NEWS & OFFER
                </Link>
                <Link
                  href="/gallery"
                  className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  GALLERY
                </Link>
                <Link
                  href="/login"
                  className="block py-2 text-gray-700 hover:text-[#2C3C81] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  LOGIN
                </Link>
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
                      <Link
                        key={index}
                        href={destination.route}
                        className="block py-1 text-sm text-gray-600 hover:text-[#2C3C81]"
                        onClick={() => setIsOpen(false)}
                      >
                        {destination.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Universities */}
              <Link
                href="/universities"
                className="text-gray-700 hover:text-[#2C3C81] font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                UNIVERSITIES
              </Link>

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
                      <Link
                        key={index}
                        href={test.route}
                        className="block py-1 text-sm text-gray-600 hover:text-[#2C3C81]"
                        onClick={() => setIsOpen(false)}
                      >
                        {test.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile About Us */}
              <Link
                href="/about-us"
                className="text-gray-700 hover:text-[#2C3C81] font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                ABOUT US
              </Link>

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
                      <Link
                        key={index}
                        href={service.route}
                        className="block py-1 text-sm text-gray-600 hover:text-[#2C3C81]"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Contact */}
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#2C3C81] font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                CONTACT
              </Link>

              <Link
                href="/consultation"
                className="w-full bg-[#C73D43] text-[#F5F4F5] px-6 py-3 rounded font-medium hover:bg-[#B2ACCE] hover:text-[#2C3C81] transition-all duration-300 text-center block"
                onClick={() => setIsOpen(false)}
              >
                GET CONSULTATION
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
