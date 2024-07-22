import "./App.css";
import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";

import Categories from "./Components/Categories/Categories";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  createHashRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import Wishlist from "./Components/Wishlist/Wishlist";
import Brands from "./Components/Brands/Brands";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import NotFound from "./Components/NotFound/NotFound";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";

import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ContextProvider from "./context/context";
import WishlistProvider from "./context/Wishlist";

function App() {
  const routes = createHashRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },

        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "product-details/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brands />
            </ProtectedRoute>
          ),
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "signin",
          element: <Signin />,
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },

        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return (
    <>
      <ContextProvider>
        <WishlistProvider>
          <RouterProvider router={routes} />
        </WishlistProvider>
      </ContextProvider>
      <ToastContainer autoClose={500} />
    </>
  );
}

export default App;
