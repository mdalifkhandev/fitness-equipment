import App from "@/App";
import Login from "@/pages/login/Login";
import Registration from "@/pages/registration/Registration";
import { createBrowserRouter } from "react-router-dom";
import { userPath } from "./userRoute";
import { routerGenerator } from "@/utils/routerGenerator";

const router = createBrowserRouter([
    
    {
        path: '/',
        element: <App />,
        children:routerGenerator(userPath)
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/registration',
        element: <Registration />,
    },
])

export default router