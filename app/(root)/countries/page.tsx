"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, BookOpen, Users, ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface Country {
  $id: string;
  name: string;
  flag: string;
  intake: string;
  programs: string;
  ranking: string;
  description?: string;
  imageId?: string;
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    filterCountries();
  }, [countries, searchTerm]);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/countries");
      if (response.ok) {
        const data = await response.json();
        setCountries(data.documents || []);
      }
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterCountries = () => {
    let filtered = countries;

    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
  };

  const getImageUrl = (imageId?: string, countryName?: string) => {
    if (!imageId) {
      // Return country-specific placeholder images
      const countryImages = {
        'south korea': 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop',
        'australia': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        'japan': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
        'uk': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
        'malta': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop'
      };
      return countryImages[countryName?.toLowerCase() || ''] || `https://picsum.photos/400/300?random=${Math.random()}`;
    }
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
            Study Destinations
          </h1>
          <p className="text-lg text-[#2C3C81]/80 max-w-3xl mx-auto">
            Discover amazing study opportunities in South Korea, Australia, Japan, UK, and Malta
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B2ACCE]" size={20} />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#B2ACCE]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C73D43] focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Countries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCountries.map((country) => (
            <motion.div
              key={country.$id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedCountry(country)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImageUrl(country.imageId, country.name)}
                  alt={country.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center">
                  <span className="text-3xl mr-2">{country.flag}</span>
                  <h3 className="text-xl font-bold text-white">{country.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-[#2C3C81]/70">
                    <Calendar size={16} className="mr-2 text-[#C73D43]" />
                    <span className="text-sm">{country.intake}</span>
                  </div>
                  <div className="flex items-center text-[#2C3C81]/70">
                    <BookOpen size={16} className="mr-2 text-[#C73D43]" />
                    <span className="text-sm">{country.programs}</span>
                  </div>
                  <div className="flex items-center text-[#2C3C81]/70">
                    <Users size={16} className="mr-2 text-[#C73D43]" />
                    <span className="text-sm">{country.ranking}</span>
                  </div>
                </div>

                <button className="w-full bg-[#2C3C81] text-white py-2 rounded-lg hover:bg-[#C73D43] transition-colors group flex items-center justify-center">
                  <span>Explore {country.name}</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredCountries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-[#B2ACCE] text-lg">No countries found matching your search.</div>
          </motion.div>
        )}

        {/* Country Detail Modal */}
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCountry(null)}
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
                  src={getImageUrl(selectedCountry.imageId, selectedCountry.name)}
                  alt={selectedCountry.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center">
                  <span className="text-4xl mr-3">{selectedCountry.flag}</span>
                  <h2 className="text-2xl font-bold text-white">{selectedCountry.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#2C3C81] rounded-full p-2 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar size={20} className="mr-3 text-[#C73D43] mt-1" />
                      <div>
                        <div className="font-medium text-[#2C3C81]">Intake Periods</div>
                        <div className="text-[#2C3C81]/70">{selectedCountry.intake}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <BookOpen size={20} className="mr-3 text-[#C73D43] mt-1" />
                      <div>
                        <div className="font-medium text-[#2C3C81]">Available Programs</div>
                        <div className="text-[#2C3C81]/70">{selectedCountry.programs}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Users size={20} className="mr-3 text-[#C73D43] mt-1" />
                      <div>
                        <div className="font-medium text-[#2C3C81]">Top Destinations</div>
                        <div className="text-[#2C3C81]/70">{selectedCountry.ranking}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Globe size={20} className="mr-3 text-[#C73D43] mt-1" />
                      <div>
                        <div className="font-medium text-[#2C3C81]">Study Abroad</div>
                        <div className="text-[#2C3C81]/70">Available for international students</div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedCountry.description && (
                  <div className="mb-6">
                    <h3 className="font-medium text-[#2C3C81] mb-2">About Studying in {selectedCountry.name}</h3>
                    <p className="text-[#2C3C81]/70">{selectedCountry.description}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button className="flex-1 bg-[#C73D43] text-white py-3 rounded-lg hover:bg-[#2C3C81] transition-colors">
                    View Universities
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