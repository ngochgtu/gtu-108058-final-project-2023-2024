import { Outlet, createHashRouter } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import SkillsCheckPage from "../pages/SkillsCheckPage";
import ResultPage from "../pages/ResultPage";
import ErrorPage from "../pages/ErrorPage";
import Header from "../components/Header";


export const router = createHashRouter([
    {
        element: (
            <div>
                <Header/>
                <Outlet/>
            </div>
        ),
        path: '/',
        children: [
            {
                index: true,
                element: <AuthPage/>
            },
            {
                path: "/home",
                element: <HomePage/>
            },
            {
                path: "/check",
                element: <SkillsCheckPage/>
            },
            {
                path: "/result",
                element: <ResultPage/>
            }
        ]
    },
    {
        element: <ErrorPage/>,
        path: '*',
    }
]);