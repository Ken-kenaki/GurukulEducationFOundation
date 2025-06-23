"use client";

import { useState, useEffect } from "react";
import {
  Users,
  FileText,
  Image,
  Calendar,
  Globe,
  GraduationCap,
  TrendingUp,
  Activity,
} from "lucide-react";

interface Stats {
  stories: number;
  gallery: number;
  forms: number;
  newsEvents: number;
  countries: number;
  universities: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    stories: 0,
    gallery: 0,
    forms: 0,
    newsEvents: 0,
    countries: 0,
    universities: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all stats in parallel
      const [storiesRes, galleryRes, formsRes, newsRes, countriesRes, universitiesRes] = await Promise.all([
        fetch("/api/stories"),
        fetch("/api/gallery"),
        fetch("/api/forms"),
        fetch("/api/news-events"),
        fetch("/api/countries"),
        fetch("/api/universities"),
      ]);

      const [stories, gallery, forms, newsEvents, countries, universities] = await Promise.all([
        storiesRes.json(),
        galleryRes.json(),
        formsRes.json(),
        newsRes.json(),
        countriesRes.json(),
        universitiesRes.json(),
      ]);

      setStats({
        stories: stories.total || stories.documents?.length || 0,
        gallery: gallery.total || gallery.documents?.length || 0,
        forms: forms.total || forms.documents?.length || 0,
        newsEvents: newsEvents.total || newsEvents.documents?.length || 0,
        countries: countries.total || countries.documents?.length || 0,
        universities: universities.total || universities.documents?.length || 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { name: "Total Stories", value: stats.stories.toString(), icon: Users, change: "+12%" },
    { name: "Gallery Items", value: stats.gallery.toString(), icon: Image, change: "+8%" },
    { name: "Form Submissions", value: stats.forms.toString(), icon: FileText, change: "+23%" },
    { name: "News & Events", value: stats.newsEvents.toString(), icon: Calendar, change: "+5%" },
    { name: "Countries", value: stats.countries.toString(), icon: Globe, change: "+2%" },
    { name: "Universities", value: stats.universities.toString(), icon: GraduationCap, change: "+15%" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500 font-medium">
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  from last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  New story submitted
                </p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Form submission received
                </p>
                <p className="text-sm text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Image className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Gallery updated
                </p>
                <p className="text-sm text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}