import { Outlet, useLocation } from "react-router-dom";
import NavbarPage from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import BackToTopButton from './../BackToTop/BackToTop';

export default function Layout() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className="dark:bg-gray-900">
   
  {!hideNavAndFooter && <NavbarPage />}
  <div className="pt-20 px-4 ">
    <Outlet />
      <BackToTopButton/>

    {!hideNavAndFooter && <Footer />}
  </div>
  
</div>

  );
}
