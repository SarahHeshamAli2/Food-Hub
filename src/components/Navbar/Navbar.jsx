import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import logo from "../../assets/images/logo1.png";
import { IoCartOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";
import './Navbar.css';

const NavMenu = [
  { id: 1, title: "Home", path: "/", delay: 0.1 },
  { id: 2, title: "Recipe", path: "#", delay: 0.2 },
  { id: 3, title: "AddRecipe", path: "/add-recipe", delay: 0.3 },
  { id: 4, title: "About us", path: "/about", delay: 0.4 },
];

const SlideDown = (delay) => ({
  initial: { y: "-100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: delay },
  },
});

export default function NavbarPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    //shadow-md 
    <div>
      <nav className="bg-white fixed w-full z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center font-league">
          {/* logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-2"
          >
            <FaUtensils className="text-2xl text-black" />
            <span className="text-xl font-bold">
              <span className="text-black">Food</span>
              <span className="text-[#FF7F50]">Hub</span>
            </span>
          </motion.div>


          {/* Desktop menu */}
          <div className="hidden md:block">
            <ul className="flex gap-6">
              {NavMenu.map((menu) => (
                <motion.li
                  key={menu.id}
                  variants={SlideDown(menu.delay)}
                  initial="initial"
                  animate="animate"
                  className="nav-menu"
                >
                  <a href={menu.path} className="inline-block px-2 py-2 text-lg">
                    {menu.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <motion.div
            className="hidden md:flex items-center gap-3"
            variants={SlideDown(1)}
            initial="initial"
            animate="animate"
          >
            <button className="bg-[#FF7F50] text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-[#ff5722] transition-all duration-300">
              Login
            </button>
            <button className="bg-black text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-gray-800 transition-all duration-300">
              Sign up
            </button>
          </motion.div>

          {/* Mobile menu icon */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white px-6 pb-4">
            <ul className="flex flex-col gap-4 mt-4">
              {NavMenu.map((menu) => (
                <li key={menu.id}>
                  <a href={menu.path} className="block text-base py-1 border-b">
                    {menu.title}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button className="bg-[#FF7F50] text-white w-full py-2 rounded-full mb-2 font-semibold">
                  Login
                </button>
                <button className="bg-black text-white w-full py-2 rounded-full font-semibold">
                  Sign up
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
