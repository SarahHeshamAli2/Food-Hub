import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUtensils } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import NotificationBell from "../NotificationBell/NotificationBell";
import { BASE_URL } from "../../services/api";
import Darkmode from '../Darkmode/Darkmode';


const NavMenu = [
  { id: 1, title: "Home", path: "/", delay: 0.1 },
  { id: 2, title: "All Recipes", path: "/recipes", delay: 0.2 },
  { id: 4, title: "About us", path: "/about-us", delay: 0.4 },
];

const SlideDown = (delay) => ({
  initial: { y: "-100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.8, delay } },
});

export default function NavbarPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  const { user, isSignedIn, isLoaded } = useUser();
  const isAdmin = isSignedIn && user?.id === import.meta.env.VITE_ADMIN_ID;

  const { signOut, openSignIn, openSignUp } = useClerk();
const handleSignOut = () => {
  signOut({ redirectUrl: "/Food-Hub/" });  
};
  // Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e) => {
    if (notifOpen && notifRef.current && !notifRef.current.contains(e.target)) {
      setNotifOpen(false);
    }
    if (
      userMenuOpen &&
      userMenuRef.current &&
      !userMenuRef.current.contains(e.target)
    ) {
      setUserMenuOpen(false);
    }
  };
  if (!isLoaded) return null;

  return (
    <nav
 
      onClick={handleNavClick}
      className={`bg-white dark:bg-gray-800 fixed w-full z-50 ${scrolled ? "shadow-md" : ""}`} >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center font-league dark:bg-gray-800 ">
        {/* Logo */}
     
        <Link to={"/"}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-2 dark:text-white">
            <FaUtensils className="text-2xl dark:text-white " />
           <span className="text-xl font-bold text-black">
  <span className="dark:text-white">Food</span>
  <span className="text-[#FF7F50]">Hub</span>
</span>
 <Darkmode/>

          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            {NavMenu.map((menu) => (
              <motion.li
                key={menu.id}
                variants={SlideDown(menu.delay)}
                initial="initial"
                animate="animate"
                className="nav-menu">
                <Link to={menu.path} className="inline-block px-2 py-2 text-lg  dark:text-white">
                  {menu.title}
                </Link>
              </motion.li>
            ))}
          </ul>
         

          {isSignedIn && !isAdmin && (
            <div className="relative" ref={notifRef}>
              <NotificationBell
                onClick={(e) => {
                  e.stopPropagation();
                  setNotifOpen((prev) => !prev);
                }}
                userId={user?.id}
              />
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md border z-50 max-h-96 overflow-hidden">
                    <NotificationList userId={user?.id} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* User Menu or Auth Buttons */}
          <div className="relative" ref={userMenuRef}>
            {isSignedIn ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen((prev) => !prev);
                  }}
                  className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:text-white focus:outline-none"
                  aria-label="User menu">
                  <img
                    src={user?.imageUrl || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-md border z-50">
                      <ul className="text-sm">
                        <li>
                          {isSignedIn && isAdmin && (
                            <Link
                              to="/all-pending-requests"
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => setUserMenuOpen(false)}>
                              pending requests
                            </Link>
                          )}
                        </li>
                        <li>
                          {isSignedIn && !isAdmin && (
                            <>
                              <Link
                                to="/profile"
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setUserMenuOpen(false)}>
                                Profile
                              </Link>
                              <Link
                                to="/favorites"
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setUserMenuOpen(false)}>
                                favorites
                              </Link>
                            </>
                          )}
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              handleSignOut();
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={openSignIn}
                  className="bg-[#FF7F50] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#ff5722] transition-all duration-300">
                  Login
                </button>
                <button
                  onClick={openSignUp}
                  className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all duration-300">
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4">
          <ul className="flex flex-col gap-4 mt-4">
            {NavMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path}
                  className="block text-base py-1 border-b"
                  onClick={() => setIsOpen(false)}>
                  {menu.title}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              {isSignedIn ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen((prev) => !prev);
                    }}
                    className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 focus:outline-none"
                    aria-label="User menu">
                    <img
                      src={user?.imageUrl || "/default-avatar.png"}
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border z-50">
                        {isAdmin && (
                          <li>
                            <Link
                              to="/all-pending-requests"
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => {
                                setUserMenuOpen(false);
                                setIsOpen(false);
                              }}>
                              pending requests
                            </Link>
                          </li>
                        )}
                     
                        <ul className="text-sm">
                             {
                          isSignedIn && !isAdmin && (
                                 <li>
                            <Link
                              to="/profile"
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => {
                                setUserMenuOpen(false);
                                setIsOpen(false);
                              }}>
                              Profile
                            </Link>
                          </li>
                          )
                        }
                     
                          <li>
                            <button
                              onClick={() => {
                                handleSignOut();
                                setUserMenuOpen(false);
                                setIsOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                              Sign out
                            </button>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      openSignIn();
                      setIsOpen(false);
                    }}
                    className="bg-[#FF7F50] text-white w-full py-2 rounded-full mb-2 font-semibold">
                    Login
                  </button>
                  <button
                    onClick={() => {
                      openSignUp();
                      setIsOpen(false);
                    }}
                    className="bg-black text-white w-full py-2 rounded-full font-semibold">
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
    return (
      <div className="p-4 text-center text-gray-500">No notifications</div>
    );

  return (
    <ul className="divide-y divide-gray-200 max-h-96 overflow-auto">
      {notifications.map((notif) => (
        <li
          key={notif.id}
          className={`p-3 cursor-pointer hover:bg-gray-100 ${
            notif.status === "unread" ? "font-bold" : "font-normal"
          }`}>
          <div>{notif.message}</div>
          <small className="text-gray-400">
            {new Date(notif.date).toLocaleString()}
          </small>
        </li>
      ))}
    </ul>
  );
}
