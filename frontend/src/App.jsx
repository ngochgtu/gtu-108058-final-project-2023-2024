import HomePage from "./pages/HomePage";
import {
    createHashRouter,
    RouterProvider,
} from "react-router-dom";
import SkillsCheckPage from "./pages/SkillsCheckPage";
import Header from "./components/Header";
import ResultPage from "./pages/ResultPage";
import AuthPage from "./pages/AuthPage";

const router = createHashRouter([
    {
        path: "/",
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
    },
]);

const App = () => {
    return <>
        <Header/>
        <RouterProvider router={router}/>
    </>
}

export default App;
