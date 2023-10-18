import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import MainPage from "../pages/MainPage";

export const routes = [
    {
            element: (
            <div>
                <Header/>
                <Outlet/>
            </div>
            )
            ,
            path: "/",
            children:[
                {
                    element: <MainPage/>,
                    index: true,
                }
            ]
    }
]