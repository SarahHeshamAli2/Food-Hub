import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaXTwitter,
  FaTiktok,
  FaUtensils,
} from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 px-4 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        {/* Left Side: Logo + Description */}
        <div className="md:w-1/3 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <FaUtensils className="text-4xl text-black" />
            <span className="text-3xl font-extrabold">
              <span className="text-black">Food</span>
              <span className="text-[#FF7F50]">Hub</span>
            </span>
          </motion.div>
          <p className="text-base text-gray-600 leading-relaxed">
            The purpose of lorem ipsum is to create a natural looking block of
            text that doesn't distract from the layout.
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex flex-wrap gap-12">
          <div>
            <h4 className="font-semibold text-lg mb-2">Quick links</h4>
            <ul className="space-y-2 text-base">
              <li><a href="/" className="hover:text-rose-500">Home</a></li>
              <li><a href="/recipes" className="hover:text-rose-500">Recipes</a></li>
             
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">Quick links</h4>
            <ul className="space-y-2 text-base">
              <li><a href="#" className="hover:text-rose-500">Share Recipe</a></li>
              <li><a href="#" className="hover:text-rose-500">About Us</a></li>
              <li><a href="#" className="hover:text-rose-500">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">Legal</h4>
            <ul className="space-y-2 text-base">
              <li><a href="#" className="hover:text-rose-500">Terms Of Use</a></li>
              <li><a href="#" className="hover:text-rose-500">Privacy & Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-base gap-4">
        <p>© 2025 Food Hub. All Right Reserved</p>
        <div className="flex space-x-5 text-2xl">
          <FaTiktok className="hover:text-rose-500 cursor-pointer" />
          <FaXTwitter className="hover:text-rose-500 cursor-pointer" />
          <FaFacebookF className="hover:text-rose-500 cursor-pointer" />
          <FaInstagram className="hover:text-rose-500 cursor-pointer" />
          <FaPinterestP className="hover:text-rose-500 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
