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
import BuyCourse from "./pages/buyCourse/BuyCourse";
import { getCourseId, getUserId } from "./services/localStorage";
import UserInfo from "./pages/userInfo/UserInfo";

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
  {
    path: "/buyCourse",
    element: (
      <BuyCourse
        userId={getUserId()!}
        courseId={Number.parseInt(getCourseId()!)}
      />
    ),
  },
  {
    path: "/user",
    element: <UserInfo />,
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
