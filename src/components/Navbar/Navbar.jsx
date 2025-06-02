import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUtensils } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useClerk, useUser } from "@clerk/clerk-react";
import NotificationBell from "../NotificationBell/NotificationBell";
import logo from "../../assets/images/logo.png";
import { BASE_URL } from "../../services/api";
import { Link } from "react-router-dom";

// Navigation menu items
const NavMenu = [
  { id: 1, title: "Home", path: "/", delay: 0.1 },
  { id: 2, title: "Recipe", path: "/recipes", delay: 0.2 },
  { id: 3, title: "AddRecipe", path: "/add-recipe", delay: 0.3 },
  { id: 4, title: "About us", path: "/about", delay: 0.4 },
];

// Animation variant for nav links
const SlideDown = (delay) => ({
  initial: { y: "-100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay },
  },
});

export default function NavbarPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const { user, isSignedIn } = useUser();
  const { signOut, openSignIn, openSignUp } = useClerk();

  // Close notification on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set scroll state for styling (e.g. sticky effect)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`bg-white fixed w-full z-50 ${scrolled ? "shadow-md" : ""}`}>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center font-league">

        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            {NavMenu.map((menu) => (
              <motion.li
                key={menu.id}
                variants={SlideDown(menu.delay)}
                initial="initial"
                animate="animate"
                className="nav-menu"
              >
                <Link to={menu.path} className="inline-block px-2 py-2 text-lg">
                  {menu.title}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Notification Bell */}
          {isSignedIn && (
            <div className="relative" ref={notifRef}>
              <NotificationBell
                userId={user?.id}
                onClick={() => setNotifOpen((prev) => !prev)}
              />

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md border border-gray-200 z-50 max-h-96 overflow-auto"
                  >
                    <NotificationList userId={user?.id} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Auth Buttons */}
        <motion.div
          className="hidden md:flex items-center gap-3"
          variants={SlideDown(1)}
          initial="initial"
          animate="animate"
        >
          {isSignedIn ? (
            <button
              onClick={() => signOut()}
              className="bg-black text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              Sign out
            </button>
          ) : (
            <>
              <button
                onClick={() => openSignIn()}
                className="bg-[#FF7F50] text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-[#ff5722] transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => openSignUp()}
                className="bg-black text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                Sign up
              </button>
            </>
          )}
        </motion.div>

        {/* Hamburger Menu (Mobile) */}
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
                <Link to={menu.path} className="block text-base py-1 border-b">
                  {menu.title}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              {isSignedIn ? (
                <button
                  onClick={() => signOut()}
                  className="bg-black text-white w-full py-2 rounded-full font-semibold"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => openSignIn()}
                    className="bg-[#FF7F50] text-white w-full py-2 rounded-full mb-2 font-semibold"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openSignUp()}
                    className="bg-black text-white w-full py-2 rounded-full font-semibold"
                  >
                    Sign up
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

function NotificationList({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${BASE_URL}/notifications?userId=${userId}`);
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    };
    fetchNotifications();
  }, [userId]);

  if (notifications.length === 0)
    return <div className="p-4 text-center text-gray-500">No notifications</div>;

  return (
    <ul className="divide-y divide-gray-200 max-h-96 overflow-auto">
      {notifications.map((notif) => (
        <li
          key={notif.id}
          className={`p-3 cursor-pointer hover:bg-gray-100 ${
            notif.status === "unread" ? "font-bold" : "font-normal"
          }`}
        >
          <div>{notif.message}</div>
          <small className="text-gray-400">
            {new Date(notif.date).toLocaleString()}
          </small>
        </li>
      ))}
    </ul>
  );
}
