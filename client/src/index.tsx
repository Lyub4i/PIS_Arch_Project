import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import Courses from "./pages/courses/Courses";
import Lesson from "./pages/lesson/Lesson";
import Mentors from "./pages/mentors/Mentors";
import AboutUs from "./pages/aboutUs/AboutUs";
import Register from "./pages/register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/lesson",
    element: <Lesson />,
  },
  {
    path: "/mentors",
    element: <Mentors />,
  },
  {
    path: "/aboutUs",
    element: <AboutUs />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
