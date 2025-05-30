import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/Layout/Layout';
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FavoriteList from './pages/FavoriteList/FavoriteList';
import UsersList from "./pages/UsersList/UsersList";
import NotFound from './components/NotFound/NotFound';



function App() {

  const routes=createBrowserRouter([
    {
      path:'',element : <Layout/> , children : [
        {
          index:true,element:<LandingPage/>
        },
        {
          path:'login',element:<Login/>
        },
        {
          path:'register',element:<Register/>
        },
        {
          path:'favorites',element:<FavoriteList/>
        },
        {
          path:'users',element:<UsersList/>
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
