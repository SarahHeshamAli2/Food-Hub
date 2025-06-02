import { Outlet, useLocation } from "react-router-dom";
import NavbarPage from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
       {!hideNavAndFooter && <NavbarPage />} 
      <Outlet />
      {!hideNavAndFooter && <Footer />}
    </>
  );
}
