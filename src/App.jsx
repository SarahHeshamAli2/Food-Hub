import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/Layout/Layout';
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FavoriteList from './pages/FavoriteList/FavoriteList';
import UsersList from "./pages/UsersList/UsersList";
import NotFound from './components/NotFound/NotFound';
import { SignedIn, useUser } from "@clerk/clerk-react";
import Unauthorized from './components/NotFound/Unauthorized';
import AddRecipe from './pages/AddRecipe/AddRecipe';

const ADMIN_ID = "user_2xrsm24KySxTtwMs8DeEhw69T6c";

function App() {
  const { isSignedIn, user } = useUser();
  const role = user?.publicMetadata?.role;
  const isAdmin = user?.id === ADMIN_ID;

  const routes = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <LandingPage /> },
        { path: 'favorites', element: (isSignedIn && role === 'user') ? <FavoriteList /> : <Unauthorized /> },
        { path: 'users', element: (isSignedIn && isAdmin) ? <UsersList /> : <Unauthorized /> },
        { path: 'login', element: <Login /> },
        { path: 'login/*', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'add-recipe', element: <AddRecipe /> },
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