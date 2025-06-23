"use client";

import { useState } from "react";
import { BookOpen, Clock, Users, Star, ArrowRight, CheckCircle, Target, Award } from "lucide-react";
import { motion } from "framer-motion";

interface TestPrep {
  id: string;
  name: string;
  fullName: string;
  description: string;
  duration: string;
  students: string;
  rating: number;
  features: string[];
  price: string;
  image: string;
  color: string;
}

export default function TestPreparationsPage() {
  const [selectedTest, setSelectedTest] = useState<TestPrep | null>(null);

  const testPreparations: TestPrep[] = [
    {
      id: "ielts",
      name: "IELTS",
      fullName: "International English Language Testing System",
      description: "Master the IELTS exam with our comprehensive preparation program designed to help you achieve your target band score.",
      duration: "8-12 weeks",
      students: "500+",
      rating: 4.8,
      features: [
        "Speaking practice with native speakers",
        "Writing task feedback and correction",
        "Listening comprehension exercises",
        "Reading strategies and techniques",
        "Mock tests and score prediction",
        "Flexible online and offline classes"
      ],
      price: "Starting from $299",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "pte",
      name: "PTE",
      fullName: "Pearson Test of English",
      description: "Excel in PTE Academic with our AI-powered preparation tools and expert guidance for computer-based English testing.",
      duration: "6-10 weeks",
      students: "300+",
      rating: 4.7,
      features: [
        "AI-powered speaking practice",
        "Computer-based test simulation",
        "Automated scoring system",
        "Integrated skills training",
        "Real exam environment practice",
        "Personalized study plans"
      ],
      price: "Starting from $349",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      color: "from-green-500 to-green-600"
    },
    {
      id: "japanese",
      name: "Japanese",
      fullName: "Japanese Language Proficiency Test (JLPT)",
      description: "Learn Japanese from basics to advanced levels with our structured curriculum designed for JLPT success.",
      duration: "12-24 weeks",
      students: "200+",
      rating: 4.9,
      features: [
        "Hiragana, Katakana, and Kanji training",
        "Grammar and vocabulary building",
        "Conversation practice with native speakers",
        "Cultural context and etiquette",
        "JLPT N5 to N1 level preparation",
        "Interactive learning materials"
      ],
      price: "Starting from $399",
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop",
      color: "from-red-500 to-pink-500"
    },
    {
      id: "korean",
      name: "Korean",
      fullName: "Test of Proficiency in Korean (TOPIK)",
      description: "Master Korean language skills with our comprehensive program covering all aspects of TOPIK preparation.",
      duration: "12-20 weeks",
      students: "250+",
      rating: 4.8,
      features: [
        "Hangul writing system mastery",
        "Grammar patterns and structures",
        "Listening and reading comprehension",
        "Speaking and writing practice",
        "TOPIK I and II preparation",
        "K-culture integration"
      ],
      price: "Starting from $379",
      image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop",
      color: "from-purple-500 to-indigo-500"
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
            Test Preparations
          </h1>
          <p className="text-lg text-[#2C3C81]/80 max-w-3xl mx-auto">
            Master IELTS, PTE, Japanese, and Korean language tests with our expert-led preparation programs
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#C73D43] mb-2">1200+</div>
            <div className="text-[#2C3C81]/70">Students Trained</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#C73D43] mb-2">95%</div>
            <div className="text-[#2C3C81]/70">Success Rate</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#C73D43] mb-2">4.8</div>
            <div className="text-[#2C3C81]/70">Average Rating</div>
          </div>
        </motion.div>

        {/* Test Preparations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {testPreparations.map((test) => (
            <motion.div
              key={test.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedTest(test)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={test.image}
                  alt={test.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${test.color} opacity-80`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white">{test.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-semibold text-[#2C3C81] mb-2">{test.fullName}</h4>
                <p className="text-[#2C3C81]/70 mb-4 line-clamp-2">{test.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <Clock size={20} className="mx-auto text-[#C73D43] mb-1" />
                    <div className="text-sm text-[#2C3C81]/70">{test.duration}</div>
                  </div>
                  <div className="text-center">
                    <Users size={20} className="mx-auto text-[#C73D43] mb-1" />
                    <div className="text-sm text-[#2C3C81]/70">{test.students}</div>
                  </div>
                  <div className="text-center">
                    <Star size={20} className="mx-auto text-[#C73D43] mb-1" />
                    <div className="text-sm text-[#2C3C81]/70">{test.rating}/5</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-[#C73D43]">{test.price}</div>
                  <button className="bg-[#2C3C81] text-white px-4 py-2 rounded-lg hover:bg-[#C73D43] transition-colors group flex items-center">
                    <span>Learn More</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Test Detail Modal */}
        {selectedTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTest(null)}
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
                  src={selectedTest.image}
                  alt={selectedTest.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${selectedTest.color} opacity-80`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-4xl font-bold mb-2">{selectedTest.name}</h2>
                    <p className="text-xl">{selectedTest.fullName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTest(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#2C3C81] rounded-full p-2 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3C81] mb-4">Course Overview</h3>
                    <p className="text-[#2C3C81]/70 mb-6">{selectedTest.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-[#F5F4F5] rounded-lg">
                        <Clock size={24} className="mx-auto text-[#C73D43] mb-2" />
                        <div className="font-medium text-[#2C3C81]">Duration</div>
                        <div className="text-sm text-[#2C3C81]/70">{selectedTest.duration}</div>
                      </div>
                      <div className="text-center p-4 bg-[#F5F4F5] rounded-lg">
                        <Users size={24} className="mx-auto text-[#C73D43] mb-2" />
                        <div className="font-medium text-[#2C3C81]">Students</div>
                        <div className="text-sm text-[#2C3C81]/70">{selectedTest.students}</div>
                      </div>
                      <div className="text-center p-4 bg-[#F5F4F5] rounded-lg">
                        <Star size={24} className="mx-auto text-[#C73D43] mb-2" />
                        <div className="font-medium text-[#2C3C81]">Rating</div>
                        <div className="text-sm text-[#2C3C81]/70">{selectedTest.rating}/5</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3C81] mb-4">What You'll Learn</h3>
                    <div className="space-y-3 mb-6">
                      {selectedTest.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle size={20} className="text-[#C73D43] mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-[#2C3C81]/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-[#F5F4F5] rounded-lg p-4 mb-6">
                      <div className="text-2xl font-bold text-[#C73D43] mb-1">{selectedTest.price}</div>
                      <div className="text-sm text-[#2C3C81]/70">Flexible payment options available</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-[#C73D43] text-white py-3 rounded-lg hover:bg-[#2C3C81] transition-colors">
                    Enroll Now
                  </button>
                  <button className="flex-1 border border-[#2C3C81] text-[#2C3C81] py-3 rounded-lg hover:bg-[#2C3C81] hover:text-white transition-colors">
                    Free Trial Class
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}