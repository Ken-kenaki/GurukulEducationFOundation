import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";

interface SocialLink {
  icon: React.ReactNode;
  url: string;
}

interface FooterLink {
  name: string;
  url: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  text: string;
  url?: string;
  isLink?: boolean;
}

export default function Footer() {
  const socialLinks: SocialLink[] = [
    { icon: <Facebook size={20} />, url: "#" },
    { icon: <Twitter size={20} />, url: "#" },
    { icon: <Instagram size={20} />, url: "#" },
    { icon: <Linkedin size={20} />, url: "#" },
    { icon: <Youtube size={20} />, url: "#" },
  ];

  const quickLinks: FooterLink[] = [
    { name: "Home", url: "#" },
    { name: "About Us", url: "#" },
    { name: "Services", url: "#" },
    { name: "Testimonials", url: "#" },
    { name: "Contact", url: "#" },
  ];

  const destinations: FooterLink[] = [
    { name: "USA", url: "#" },
    { name: "UK", url: "#" },
    { name: "Canada", url: "#" },
    { name: "Australia", url: "#" },
    { name: "Germany", url: "#" },
  ];

  const contactInfo: ContactInfo[] = [
    {
      icon: <MapPin className="flex-shrink-0 mt-1 text-[#C73D43]" size={18} />,
      text: "123 Education St, Knowledge City, 10101",
    },
    {
      icon: <Phone className="text-[#C73D43]" size={18} />,
      text: "+1 (123) 456-7890",
      url: "tel:+11234567890",
      isLink: true,
    },
    {
      icon: <Mail className="text-[#C73D43]" size={18} />,
      text: "info@gurukul.edu",
      url: "mailto:info@gurukul.edu",
      isLink: true,
    },
    {
      icon: <Clock className="text-[#C73D43]" size={18} />,
      text: "Mon-Fri: 9AM - 6PM",
    },
  ];

  const legalLinks: FooterLink[] = [
    { name: "Privacy Policy", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "Sitemap", url: "#" },
  ];

  return (
    <footer className="bg-[#2C3C81] text-[#F5F4F5] pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              <span className="text-[#F5F4F5]">Gurukul</span>
              <span className="text-[#C73D43]">Education</span>
            </h2>
            <p className="text-[#B2ACCE]">
              Transforming dreams into global education realities since 2010.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  className="text-[#B2ACCE] hover:text-[#C73D43] transition-colors"
                  aria-label={social.icon.type.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F4F5]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-[#B2ACCE]">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className="hover:text-[#C73D43] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Study Destinations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F4F5]">
              Study Destinations
            </h3>
            <ul className="space-y-2 text-[#B2ACCE]">
              {destinations.map((destination, index) => (
                <li key={index}>
                  <Link
                    href={destination.url}
                    className="hover:text-[#C73D43] transition-colors"
                  >
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F4F5]">Contact Us</h3>
            <ul className="space-y-3 text-[#B2ACCE]">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start space-x-3">
                  {info.icon}
                  {info.isLink && info.url ? (
                    <Link
                      href={info.url}
                      className="hover:text-[#C73D43] transition-colors"
                    >
                      {info.text}
                    </Link>
                  ) : (
                    <span>{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#B2ACCE]/30 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[#B2ACCE] text-sm">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Gurukul Education. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="hover:text-[#C73D43] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
