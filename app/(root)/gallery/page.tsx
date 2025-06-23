"use client";
import React, { useEffect, useState } from "react";
import { X, Search, Grid, List, ZoomIn, Eye } from "lucide-react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);

  // Fake images data
  const fakeImages = [
    { name: "sunset-beach.jpg", url: "https://picsum.photos/400/300?random=1" },
    {
      name: "mountain-peak.jpg",
      url: "https://picsum.photos/400/300?random=2",
    },
    { name: "forest-path.jpg", url: "https://picsum.photos/400/300?random=3" },
    { name: "city-lights.jpg", url: "https://picsum.photos/400/300?random=4" },
    { name: "ocean-waves.jpg", url: "https://picsum.photos/400/300?random=5" },
    { name: "desert-dunes.jpg", url: "https://picsum.photos/400/300?random=6" },
    {
      name: "autumn-leaves.jpg",
      url: "https://picsum.photos/400/300?random=7",
    },
    {
      name: "snow-mountain.jpg",
      url: "https://picsum.photos/400/300?random=8",
    },
    {
      name: "cherry-blossoms.jpg",
      url: "https://picsum.photos/400/300?random=9",
    },
    {
      name: "starry-night.jpg",
      url: "https://picsum.photos/400/300?random=10",
    },
    {
      name: "tropical-beach.jpg",
      url: "https://picsum.photos/400/300?random=11",
    },
    { name: "canyon-view.jpg", url: "https://picsum.photos/400/300?random=12" },
    { name: "waterfall.jpg", url: "https://picsum.photos/400/300?random=13" },
    {
      name: "prairie-sunset.jpg",
      url: "https://picsum.photos/400/300?random=14",
    },
    {
      name: "lake-reflection.jpg",
      url: "https://picsum.photos/400/300?random=15",
    },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setImages(fakeImages);
      setFilteredImages(fakeImages);
      setIsLoading(false);
    };

    fetchImages();
  }, []);

  // Filter images based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredImages(images);
    } else {
      const filtered = images.filter((img) =>
        img.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredImages(filtered);
    }
  }, [searchTerm, images]);

  const openModal = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">
                Loading your beautiful gallery...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-30 bg-gradient-to-br from-red-50 via-white to-purple-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Photo Gallery
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover and explore your collection of beautiful memories
              captured in time
            </p>
          </div>

          {/* Stats Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-red-600" />
                  <span className="text-gray-600">Total Images:</span>
                  <span className="font-semibold text-gray-900">
                    {images.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-800" />
                  <span className="text-gray-600">Showing:</span>
                  <span className="font-semibold text-gray-900">
                    {filteredImages.length}
                  </span>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-red-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-red-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search images by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-200 bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Images Grid/List */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 max-w-md mx-auto">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No images found
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Upload some images to get started"}
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`
              ${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  : "space-y-4"
              }
            `}
            >
              {filteredImages.map((img, index) => (
                <div
                  key={img.name}
                  className={`
                    group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl
                    ${
                      viewMode === "grid"
                        ? "bg-white rounded-xl shadow-sm border border-gray-100 h-64"
                        : "bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4"
                    }
                  `}
                  onClick={() => openModal(img.url)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative h-48 overflow-hidden rounded-t-xl">
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {img.name}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative w-16 h-16 overflow-hidden rounded-lg flex-shrink-0">
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {img.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Click to view
                        </p>
                      </div>
                      <ZoomIn className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors duration-200" />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-transparent rounded-3xl overflow-hidden animate-in zoom-in-90 duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "95vw", maxHeight: "95vh" }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-200 z-20 border border-white/20"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <div className="relative flex items-center justify-center min-h-[50vh] max-h-[95vh]">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="object-contain rounded-2xl shadow-2xl ring-1 ring-white/20 max-w-full max-h-[95vh] w-auto h-auto"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
                }}
              />
            </div>

            {/* Image Info Bar */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <p className="text-white text-sm font-medium">
                {selectedImage.split("/").pop()?.split("?")[0] || "Image"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
