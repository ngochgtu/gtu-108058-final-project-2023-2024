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
import UserContextProvider from "../contexts/userContexts";
import Footer from "../components/Footer";
import IntroductionPage from "../pages/introductionPage";

export const router = createHashRouter([
  {
    element: (
      <div>
        <HeaderContextProvider>
          <Header />
          <UserContextProvider>
            <Outlet />
          </UserContextProvider>
          <Footer />
        </HeaderContextProvider>
      </div>
    ),
    path: "/",
    children: [
      {
        index: true,
        element: <IntroductionPage/>,
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
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    element: <ErrorPage />,
    path: "*",
  },
]);
