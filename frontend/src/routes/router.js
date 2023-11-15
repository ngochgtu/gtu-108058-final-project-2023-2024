import { Outlet, createHashRouter } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import SkillsCheckPage from "../pages/SkillsCheckPage";
import ResultPage from "../pages/ResultPage";
import ErrorPage from "../pages/ErrorPage";
import Header from "../components/Header";
import SignUpPage from "../pages/signUpPage";

export const router = createHashRouter([
  {
    element: (
      <div>
        <Header />
        <Outlet />
      </div>
    ),
    path: "/",
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/check",
        element: <SkillsCheckPage />,
      },
      {
        path: "/result",
        element: <ResultPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <ErrorPage />,
    path: "*",
  },
]);
