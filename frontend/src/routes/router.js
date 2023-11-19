import { Outlet, createHashRouter } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import SkillsCheckPage from "../pages/SkillsCheckPage";
import ResultPage from "../pages/ResultPage";
import ErrorPage from "../pages/ErrorPage";
import Header from "../components/Header";
import SignUpPage from "../pages/signUpPage";
import AboutPage from "../pages/AboutPage";
import HeaderContextProvider from "../contexts/headerContexts";

export const router = createHashRouter([
  {
    element: (
      <div>
        <HeaderContextProvider>
          <Header />
          <Outlet />
        </HeaderContextProvider>
      </div>
    ),
    path: "/",
    children: [
      {
        index: true,
        element: <AboutPage />,
      },
      {
        path: "/sign-in",
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
