import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/Layout/Layout';
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FavoriteList from './pages/FavoriteList/FavoriteList';
import UsersList from "./pages/UsersList/UsersList";
import NotFound from './components/NotFound/NotFound';
import { SignedIn, SignedOut } from "@clerk/clerk-react";



function App() {

  const routes=createBrowserRouter([
    {
      path:'',element : <Layout/> , children : [
        {
          index:true,element:<LandingPage/>
        },
        {
          path:'login',element:<SignedOut> <Login/> </SignedOut>
        },
        {
          path:'register',element:<SignedOut> <Register/> </SignedOut>
        },
        {
          path:'favorites',element:<SignedIn> <FavoriteList/> </SignedIn>
        },
        {
          path:'users',element:<SignedIn> <UsersList/> </SignedIn>
        },
        {
          path:'*',element:<NotFound/>
        },

      ]
    }
  ])

  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
