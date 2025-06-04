import {
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Suspense, lazy } from 'react';
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import Unauthorized from "./components/NotFound/Unauthorized";
import AddRecipe from "./pages/AddRecipe/AddRecipe";
import PendingRequest from "./components/PendingRequest/PendingRequest";
import AdminProtected from "./components/Protected Routes/adminProtected";
import UserProtected from "./components/Protected Routes/userProtected";
import RecipeLoader from "./components/Loader/RecipeLoader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipesContextProvider from "./context/RecipesContextProvider";
import CommentContextProvider from "./context/CommentsContext";
import AboutUs from "./components/AboutUs/AboutUs";
const RecipeDetailsPage = lazy(() => import('./pages/RecipeDetailsPage/RecipeDetailsPage'));
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));
const FavoriteList = lazy(() => import('./pages/FavoriteList/FavoriteList'));
const UsersList = lazy(() => import('./pages/UsersList/UsersList'));
const RecipesList = lazy(() => import('./pages/RecipesList/RecipesList'));
const AllPendingRequests = lazy(() => import('./pages/AllPendingRequests/AllPendingRequests'));
const UserNotification = lazy(() => import('./pages/UserNotification/UserNotification'));
const Profile = lazy(() => import('./pages/ProfilePage/Profile'));
const AcceptedRequests = lazy(() => import('./pages/AcceptedRequests/AcceptedRequests'));
const RejectedRequests = lazy(() => import('./pages/RejectedRequests/RejectedRequests'));
const CreatedRecipes = lazy(() => import('./pages/CreatedRecipes/CreatedRecipes'));
const TagRecipes = lazy(() => import('./pages/TagRecipes/TagRecipes'));



function App() {
  const routes = createHashRouter([

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
        { path: "about-us", element: <AboutUs /> },
        { path: "unauthorized", element: <Unauthorized /> },

        { path: "all-pending-requests", element: <AllPendingRequests /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipes/:id", element: <RecipeDetailsPage /> },
        { path: "all-pending-requests", element: <AllPendingRequests /> },
        { path: "tags/:tag", element: <TagRecipes /> },

        { path: "recipes/:id", element: <CommentContextProvider><RecipeDetailsPage /></CommentContextProvider> },
        { path: "all-pending-requests", element: <AdminProtected> <AllPendingRequests /></AdminProtected> },

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
  ],);

  return (
    <>
      <RecipesContextProvider>
        <CommentContextProvider>
          <Suspense fallback={<RecipeLoader />}>
            <RouterProvider router={routes} />
          </Suspense>
        </CommentContextProvider>
      </RecipesContextProvider>

      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
