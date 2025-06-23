"use client";

import { useState } from "react";
import { 
  GraduationCap, 
  FileText, 
  Award, 
  Plane, 
  Users, 
  BookOpen,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  price: string;
  duration: string;
  image: string;
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: "study-abroad",
      title: "Study Abroad Consultation",
      description: "Comprehensive guidance for studying in South Korea, Japan, UK, Australia, and Malta with personalized university selection and application support.",
      features: [
        "University selection based on your profile",
        "Application assistance and document preparation",
        "Scholarship guidance and financial planning",
        "Visa application support",
        "Pre-departure orientation",
        "Post-arrival assistance"
      ],
      icon: <GraduationCap size={40} />,
      color: "from-blue-500 to-blue-600",
      price: "Free Consultation",
      duration: "Ongoing Support",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop"
    },
    {
      id: "test-prep",
      title: "Test Preparations",
      description: "Expert coaching for IELTS, PTE, Japanese, and Korean language tests with proven success rates and personalized study plans.",
      features: [
        "IELTS and PTE preparation",
        "Japanese language (JLPT N5-N1)",
        "Korean language (TOPIK I & II)",
        "Mock tests and practice sessions",
        "Speaking practice with native speakers",
        "Flexible online and offline classes"
      ],
      icon: <BookOpen size={40} />,
      color: "from-green-500 to-green-600",
      price: "Starting from $299",
      duration: "6-24 weeks",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop"
    },
    {
      id: "visa-assistance",
      title: "Visa Assistance",
      description: "Complete visa application support with document preparation, interview coaching, and submission assistance for all study destinations.",
      features: [
        "Visa application form completion",
        "Document checklist and preparation",
        "Interview preparation and coaching",
        "Application submission support",
        "Status tracking and follow-up",
        "Rejection case handling"
      ],
      icon: <FileText size={40} />,
      color: "from-purple-500 to-purple-600",
      price: "Starting from $199",
      duration: "4-8 weeks",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop"
    },
    {
      id: "scholarship",
      title: "Scholarship Guidance",
      description: "Maximize your funding opportunities with our comprehensive scholarship search and application assistance program.",
      features: [
        "Scholarship database access",
        "Eligibility assessment",
        "Application essay writing support",
        "Document preparation assistance",
        "Interview preparation",
        "Follow-up and status tracking"
      ],
      icon: <Award size={40} />,
      color: "from-yellow-500 to-orange-500",
      price: "Starting from $149",
      duration: "2-6 weeks",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      id: "pre-departure",
      title: "Pre-Departure Briefing",
      description: "Comprehensive orientation program to prepare you for life abroad including cultural adaptation and practical guidance.",
      features: [
        "Cultural orientation sessions",
        "Accommodation guidance",
        "Banking and financial setup",
        "Health insurance assistance",
        "Airport pickup arrangements",
        "Emergency contact setup"
      ],
      icon: <Plane size={40} />,
      color: "from-red-500 to-pink-500",
      price: "Included with consultation",
      duration: "1-2 weeks",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop"
    },
    {
      id: "post-arrival",
      title: "Post-Arrival Support",
      description: "Continued support after you reach your destination to ensure smooth transition and academic success.",
      features: [
        "Airport pickup coordination",
        "Initial settlement assistance",
        "University enrollment support",
        "Local orientation and guidance",
        "Emergency support hotline",
        "Regular check-ins and counseling"
      ],
      icon: <Users size={40} />,
      color: "from-indigo-500 to-purple-500",
      price: "Starting from $99",
      duration: "First 3 months",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-[#F5F4F5] via-white to-[#B2ACCE]/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3C81] mb-4">
            Our Services
          </h1>
          <p className="text-lg text-[#2C3C81]/80 max-w-3xl mx-auto">
            Comprehensive support for your international education journey from consultation to post-arrival assistance
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#C73D43] mb-2">2000+</div>
            <div className="text-[#2C3C81]/70">Students Served</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#C73D43] mb-2">98%</div>
            <div className="text-[#2C3C81]/70">Visa Success Rate</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#C73D43] mb-2">5</div>
            <div className="text-[#2C3C81]/70">Countries</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#C73D43] mb-2">15+</div>
            <div className="text-[#2C3C81]/70">Years Experience</div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedService(service)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-80`} />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  {service.icon}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2C3C81] mb-2 group-hover:text-[#C73D43] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#2C3C81]/70 mb-4 line-clamp-3">{service.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-[#2C3C81]/70">
                    <Clock size={16} className="mr-1 text-[#C73D43]" />
                    {service.duration}
                  </div>
                  <div className="text-lg font-bold text-[#C73D43]">{service.price}</div>
                </div>

                <button className="w-full bg-[#2C3C81] text-white py-2 rounded-lg hover:bg-[#C73D43] transition-colors group flex items-center justify-center">
                  <span>Learn More</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Detail Modal */}
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${selectedService.color} opacity-80`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="mb-4">{selectedService.icon}</div>
                    <h2 className="text-3xl font-bold">{selectedService.title}</h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#2C3C81] rounded-full p-2 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3C81] mb-4">Service Overview</h3>
                    <p className="text-[#2C3C81]/70 mb-6">{selectedService.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-[#F5F4F5] rounded-lg">
                        <Clock size={24} className="mx-auto text-[#C73D43] mb-2" />
                        <div className="font-medium text-[#2C3C81]">Duration</div>
                        <div className="text-sm text-[#2C3C81]/70">{selectedService.duration}</div>
                      </div>
                      <div className="text-center p-4 bg-[#F5F4F5] rounded-lg">
                        <Star size={24} className="mx-auto text-[#C73D43] mb-2" />
                        <div className="font-medium text-[#2C3C81]">Price</div>
                        <div className="text-sm text-[#2C3C81]/70">{selectedService.price}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3C81] mb-4">What's Included</h3>
                    <div className="space-y-3 mb-6">
                      {selectedService.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle size={20} className="text-[#C73D43] mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-[#2C3C81]/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-[#C73D43] text-white py-3 rounded-lg hover:bg-[#2C3C81] transition-colors">
                    Get Started
                  </button>
                  <button className="flex-1 border border-[#2C3C81] text-[#2C3C81] py-3 rounded-lg hover:bg-[#2C3C81] hover:text-white transition-colors">
                    Free Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#2C3C81] rounded-xl p-8 mt-12 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-6 opacity-90">
            Get personalized guidance from our expert counselors and take the first step towards your international education goals.
          </p>
          <button className="bg-[#C73D43] text-white px-8 py-3 rounded-lg hover:bg-white hover:text-[#2C3C81] transition-colors font-semibold">
            Book Free Consultation
          </button>
        </motion.div>
      </div>
    </div>
  );
}