import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/Layout/Layout';
import LandingPage from "./pages/LandingPage/LandingPage";
import FavoriteList from './pages/FavoriteList/FavoriteList';
import UsersList from "./pages/UsersList/UsersList";
import NotFound from './components/NotFound/NotFound';
import Unauthorized from './components/NotFound/Unauthorized';
import AddRecipe from './pages/AddRecipe/AddRecipe';
import PendingRequest from "./components/PendingRequest/PendingRequest";
import AdminProtected from "./components/Protected Routes/adminProtected";
import UserProtected from "./components/Protected Routes/userProtected";
import RecipeDetailsPage from './pages/RecipeDetailsPage/RecipeDetailsPage';

import RecipesContextProvider from './context/RecipesContextProvider';
import RecipesList from './pages/RecipesList/RecipesList';
import AllPendingRequests from "./pages/AllPendingRequests/AllPendingRequests";
import UserNotification from "./pages/UserNotification/UserNotification";
function App() {
  const routes = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <LandingPage /> },
        { path: 'favorites', element: <UserProtected> <FavoriteList /> </UserProtected> },
        { path: 'users', element: <AdminProtected> <UsersList /> </AdminProtected> },
        { path: 'recipes', element:  <RecipesList /> },
        { path: 'notifications', element:  <UserNotification /> },
        { path: 'recipes', element:  <RecipesList /> },
        { path: 'add-recipe', element: <AddRecipe /> },
        { path: 'pending-request', element: <PendingRequest /> },
        { path: 'unauthorized', element: <Unauthorized /> },
        { path: 'all-pending-requests', element: <AllPendingRequests /> },
        { path: 'recipes', element: <RecipesList /> },
        { path: 'recipes/:id', element: <RecipeDetailsPage /> },
        { path: 'all-pending-requests', element: <AllPendingRequests /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  return (
    <>
      <RecipesContextProvider>
        <RouterProvider router={routes} />
      </RecipesContextProvider>
    </>
  )
}

export default App