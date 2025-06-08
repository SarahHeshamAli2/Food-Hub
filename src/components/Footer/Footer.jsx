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
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer dark:bg-gray-800 w-full">
      <div className="footer-container">
        <div className="footer-brand">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="logo"
          >
            <FaUtensils className="logo-icon dark:text-white" />
            <span className="logo-text dark:text-white">
              <span >Food</span>
              <span>Hub</span>
            </span>
          </motion.div>
          <p className="dark:text-white">
            The purpose of lorem ipsum is to create a natural looking block of
            text that doesn't distract from the layout.
          </p>
        </div>

        <div className="footer-links dark:text-white">
          <div>
            <h4>Quick links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recipes">Recipes</Link></li>
            </ul>
          </div>

          <div className="dark:text-white">
            <h4>Quick links</h4>
            <ul>
              <li><Link to="#">Share Recipe</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="#">Contact</Link></li>
            </ul>
          </div>

          <div className="dark:text-white">
            <h4>Legal</h4>
            <ul>
              <li><Link to="#">Terms Of Use</Link></li>
              <li><Link to="#">Privacy & Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom dark:text-white">
        <p>© 2025 Food Hub. All Right Reserved</p>
        <div className="social-icons">
          <FaTiktok />
          <FaXTwitter />
          <FaFacebookF />
          <FaInstagram />
          <FaPinterestP />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
