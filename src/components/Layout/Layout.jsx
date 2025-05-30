import { Outlet } from "react-router-dom";
import NavbarPage from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
return <>


<NavbarPage/>
<Outlet/>
<Footer/>
</>
}
