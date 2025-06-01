import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/Layout/Layout';
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FavoriteList from './pages/FavoriteList/FavoriteList';
import UsersList from "./pages/UsersList/UsersList";
import NotFound from './components/NotFound/NotFound';
import Unauthorized from './components/NotFound/Unauthorized';
import AdminProtected from "./components/Protected Routes/adminProtected";
import UserProtected from "./components/Protected Routes/userProtected";

function App() {
  const routes = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <LandingPage /> },
        { path: 'favorites', element: <UserProtected> <FavoriteList /> </UserProtected> },
        { path: 'users', element: <AdminProtected> <UsersList /> </AdminProtected> },
        { path: 'login', element: <Login /> },
        { path: 'login/*', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'register/*', element: <Register /> },
        { path: 'unauthorized', element: <Unauthorized /> },
        { path: '*', element: <NotFound /> },
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
