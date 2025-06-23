"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, BookOpen, Star, ArrowRight, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface University {
  $id: string;
  name: string;
  country: string;
  intake: string;
  programs: string;
  ranking: string;
  description?: string;
  imageId?: string;
}

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  const countries = ["all", "South Korea", "Australia", "Japan", "UK", "Malta"];

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    filterUniversities();
  }, [universities, searchTerm, selectedCountry]);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/universities");
      if (response.ok) {
        const data = await response.json();
        setUniversities(data.documents || []);
      }
    } catch (error) {
      console.error("Failed to fetch universities:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterUniversities = () => {
    let filtered = universities;

    if (searchTerm) {
      filtered = filtered.filter(uni =>
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCountry !== "all") {
      filtered = filtered.filter(uni =>
        uni.country.toLowerCase() === selectedCountry.toLowerCase()
      );
    }

    setFilteredUniversities(filtered);
  };

  const getImageUrl = (imageId?: string) => {
    if (!imageId) return `https://picsum.photos/400/300?random=${Math.random()}`;
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/gallery-media/files/${imageId}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}&width=400&height=300`;
  };

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

  if (loading) {
    return (
      <div className="min-h-screen pt-32 bg-gradient-to-br from-[#F5F4F5] via-white to-[#B2ACCE]/20">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C73D43]"></div>
        </div>
      </div>
    );
  }

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
            Discover Top Universities
          </h1>
          <p className="text-lg text-[#2C3C81]/80 max-w-3xl mx-auto">
            Explore world-class institutions across South Korea, Australia, Japan, UK, and Malta
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B2ACCE]" size={20} />
              <input
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B2ACCE]" size={20} />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="pl-10 pr-8 py-3 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent bg-white"
              >
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country === "all" ? "All Countries" : country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Universities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredUniversities.map((university) => (
            <motion.div
              key={university.$id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedUniversity(university)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImageUrl(university.imageId)}
                  alt={university.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#C73D43] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {university.country}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2C3C81] mb-2 group-hover:text-[#C73D43] transition-colors">
                  {university.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-[#2C3C81]/70">
                    <MapPin size={16} className="mr-2 text-[#C73D43]" />
                    <span className="text-sm">{university.country}</span>
                  </div>
                  <div className="flex items-center text-[#2C3C81]/70">
                    <Calendar size={16} className="mr-2 text-[#C73D43]" />
                    <span className="text-sm">{university.intake}</span>
                  </div>
                  <div className="flex items-center text-[#2C3C81]/70">
                    <BookOpen size={16} className="mr-2 text-[#C73D43]" />
                    <span className="text-sm">{university.programs}</span>
                  </div>
                  <div className="flex items-center text-[#2C3C81]/70">
                    <Star size={16} className="mr-2 text-[#C73D43]" />
                    <span className="text-sm">{university.ranking}</span>
                  </div>
                </div>

                <button className="w-full bg-[#2C3C81] text-white py-2 rounded-lg hover:bg-[#C73D43] transition-colors group flex items-center justify-center">
                  <span>Learn More</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredUniversities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-[#B2ACCE] text-lg">No universities found matching your criteria.</div>
          </motion.div>
        )}

        {/* University Detail Modal */}
        {selectedUniversity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedUniversity(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img
                  src={getImageUrl(selectedUniversity.imageId)}
                  alt={selectedUniversity.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedUniversity(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#2C3C81] rounded-full p-2 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#2C3C81] mb-4">
                  {selectedUniversity.name}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin size={18} className="mr-3 text-[#C73D43]" />
                      <div>
                        <div className="font-medium text-[#2C3C81]">Location</div>
                        <div className="text-[#2C3C81]/70">{selectedUniversity.country}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-3 text-[#C73D43]" />
                      <div>
                        <div className="font-medium text-[#2C3C81]">Intake</div>
                        <div className="text-[#2C3C81]/70">{selectedUniversity.intake}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <BookOpen size={18} className="mr-3 text-[#C73D43]" />
                      <div>
                        <div className="font-medium text-[#2C3C81]">Programs</div>
                        <div className="text-[#2C3C81]/70">{selectedUniversity.programs}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star size={18} className="mr-3 text-[#C73D43]" />
                      <div>
                        <div className="font-medium text-[#2C3C81]">Ranking</div>
                        <div className="text-[#2C3C81]/70">{selectedUniversity.ranking}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedUniversity.description && (
                  <div className="mb-6">
                    <h3 className="font-medium text-[#2C3C81] mb-2">About</h3>
                    <p className="text-[#2C3C81]/70">{selectedUniversity.description}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button className="flex-1 bg-[#C73D43] text-white py-3 rounded-lg hover:bg-[#2C3C81] transition-colors">
                    Apply Now
                  </button>
                  <button className="flex-1 border border-[#2C3C81] text-[#2C3C81] py-3 rounded-lg hover:bg-[#2C3C81] hover:text-white transition-colors">
                    Get Consultation
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