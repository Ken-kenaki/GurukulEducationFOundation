// src/components/admin/AdminNavbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Image,
  FileText,
  Calendar,
  Globe,
  GraduationCap,
  LogOut,
} from "lucide-react";

interface AdminNavbarProps {
  user: {
    email: string;
    name: string;
    $id: string;
  };
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Stories", href: "/admin/stories", icon: BookOpen },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
    { name: "Forms", href: "/admin/forms", icon: FileText },
    { name: "Events & News", href: "/admin/events-news", icon: Calendar },
    { name: "Countries", href: "/admin/countries", icon: Globe },
    { name: "Universities", href: "/admin/universities", icon: GraduationCap },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="text-gray-300 text-sm mt-1">{user.name}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <form action="/auth/signout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors w-full text-left"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
