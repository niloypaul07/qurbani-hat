import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white text-slate-800 relative overflow-hidden">

      {/* Soft Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/30 via-pink-200/20 to-indigo-200/30 blur-3xl opacity-40"></div>

      {/* Top Accent Line */}
      <div className="h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
              QurbaniHat
            </h2>

            <p className="mt-4 text-slate-600 text-sm leading-relaxed">
              A modern digital marketplace for{" "}
              <span className="text-purple-600 font-semibold">
               Qurbanihat.
              </span>{" "}
            </p>

           
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-slate-900">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-slate-600">
      
              <div className="flex gap-3 items-center">
                <FaEnvelope className="text-purple-500" />
                <p>niloypaul81@gmail.com</p>
              </div>
              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-purple-500 mt-1" />
                <p>Dhaka</p>
              </div>
              <div className="flex gap-3 items-center">
                <FaPhoneAlt className="text-purple-500" />
                <p>01673141765</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-slate-900">
              Explore
            </h3>

            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/aboutus" className="hover:text-purple-600 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-purple-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/animals" className="hover:text-purple-600 transition">
                  All Animals
                </Link>
              </li>
              <li>
                <Link href="/ourpolicies" className="hover:text-purple-600 transition">
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-slate-900">
              Connect
            </h3>

            <div className="flex gap-4 flex-wrap">
              {[
                { icon: FaFacebookF, link: "#", color: "hover:bg-blue-600 hover:text-white" },
                { icon: FaXTwitter, link: "#", color: "hover:bg-black hover:text-white" },
                { icon: FaInstagram, link: "#", color: "hover:bg-pink-500 hover:text-white" },
                { icon: FaThreads, link: "#", color: "hover:bg-gray-700 hover:text-white" },
                { icon: FaLinkedinIn, link: "#", color: "hover:bg-blue-700 hover:text-white" },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${item.color} transition-all duration-300 hover:scale-110 shadow-sm`}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 mt-14 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} QurbaniHat. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;