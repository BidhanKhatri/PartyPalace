"use client";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the newsletter subscription
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  if (location.pathname.includes("/chat")) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-t from-gray-200 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">About Us</h3>
            <p className="text-gray-600">
              We provide the best party venues for your special occasions.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-[#FBAD34] transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/venues"
                  className="text-gray-600 hover:text-[#FBAD34] transition duration-300"
                >
                  Venues
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-[#FBAD34] transition duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-[#FBAD34] transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <p className="text-gray-600">
              123 Party Street, Fun City, FC 12345
            </p>
            <p className="text-gray-600">Email: info@partyvenues.com</p>
            <p className="text-gray-600">Phone: (123) 456-7890</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Newsletter</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FBAD34]"
                required
              />
              <button
                type="submit"
                className="w-full px-3 py-2 text-white bg-[#FBAD34] rounded-md hover:bg-[#E99D23] transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; 2025 Party Venues. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-gray-600 hover:text-[#FBAD34] transition duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#FBAD34] transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#FBAD34] transition duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#FBAD34] transition duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
