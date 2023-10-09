import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";

import CouponPage from "./pages/CouponPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <HomePage />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/coupon", element: <CouponPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
