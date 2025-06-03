import {
createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import FavoriteList from "./pages/FavoriteList/FavoriteList";
import UsersList from "./pages/UsersList/UsersList";
import NotFound from "./components/NotFound/NotFound";
import Unauthorized from "./components/NotFound/Unauthorized";
import AddRecipe from "./pages/AddRecipe/AddRecipe";
import PendingRequest from "./components/PendingRequest/PendingRequest";
import AdminProtected from "./components/Protected Routes/adminProtected";
import UserProtected from "./components/Protected Routes/userProtected";
import RecipeDetailsPage from "./pages/RecipeDetailsPage/RecipeDetailsPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipesContextProvider from "./context/RecipesContextProvider";
import RecipesList from "./pages/RecipesList/RecipesList";
import AllPendingRequests from "./pages/AllPendingRequests/AllPendingRequests";
import UserNotification from "./pages/UserNotification/UserNotification";
import Profile from "./pages/ProfilePage/Profile";
import AcceptedRequests from "./pages/AcceptedRequests/AcceptedRequests";
import RejectedRequests from "./pages/RejectedRequests/RejectedRequests";
import CreatedRecipes from "./pages/CreatedRecipes/CreatedRecipes";
import TagRecipes from "./pages/TagRecipes/TagRecipes";
import CommentContextProvider from "./context/CommentsContext";

function App() {
  const routes = createHashRouter( [
    
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <LandingPage /> },
        {
          path: "favorites",
          element: (
            <UserProtected>
              {" "}
              <FavoriteList />{" "}
            </UserProtected>
          ),
        },
        {
          path: "users",
          element: (
            <AdminProtected>
              {" "}
              <UsersList />{" "}
            </AdminProtected>
          ),
        },
        { path: "recipes", element: <RecipesList /> },
        { path: "notifications", element: <UserNotification /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "add-recipe/:id", element: <AddRecipe /> },
        { path: "pending-request", element: <PendingRequest /> },
        { path: "unauthorized", element: <Unauthorized /> },

        { path: "all-pending-requests", element: <AllPendingRequests /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipes/:id", element: <RecipeDetailsPage /> },
        { path: "all-pending-requests", element: <AllPendingRequests /> },
        { path:  "tags/:tag" , element: <TagRecipes /> },

        { path: "recipes/:id", element: <CommentContextProvider><RecipeDetailsPage /></CommentContextProvider> },
        { path: "all-pending-requests", element:<AdminProtected> <AllPendingRequests /></AdminProtected> },

        {
          path: "/profile",
          element: <Profile />,
          children: [
            {
              index: true,
              element: <Navigate to="created-recipes" replace />,
            },
            {
              path: "accepted-requests",
              element: <AcceptedRequests />,
            },
            {
              path: "rejected-requests",
              element: <RejectedRequests />,
            },
            {
              path: "created-recipes",
              element: <CreatedRecipes />,
            },
          ],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ], );

  return (
    <>
      <RecipesContextProvider>
        <CommentContextProvider>
        <RouterProvider router={routes} />
        </CommentContextProvider>
      </RecipesContextProvider>
      
      <ToastContainer position="top-right"  />
    </>
  );
}

export default App;
