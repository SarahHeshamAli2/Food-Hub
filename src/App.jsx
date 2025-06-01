import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/Layout/Layout';
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FavoriteList from './pages/FavoriteList/FavoriteList';
import UsersList from "./pages/UsersList/UsersList";
import NotFound from './components/NotFound/NotFound';
import Unauthorized from './components/NotFound/Unauthorized';
import AddRecipe from './pages/AddRecipe/AddRecipe';
import PendingRequest from "./components/PendingRequest/PendingRequest";
import AdminProtected from "./components/Protected Routes/adminProtected";
import UserProtected from "./components/Protected Routes/userProtected";
import RecipesList from "./pages/RecipesList/RecipesList";

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
        { path:'recipes', element: <UserProtected> <RecipesList /> </UserProtected> },
        { path: 'add-recipe', element: <AddRecipe /> },
        { path: 'register/*', element: <Register /> },
        { path: 'pending-request', element: <PendingRequest /> },
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