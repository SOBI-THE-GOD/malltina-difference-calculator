import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Ranjbar from "../pages/Ranjbar";
import UnitedArabEmirate from "../pages/UnitedArabEmirate";
import UnitedState from "../pages/UnitedState";
import China from "../pages/China";

const routes = createBrowserRouter([
    {
        element: <MainLayout />,
        path: "/",
        children: [
            {
                path: "ranjbar",
                element: <Ranjbar />,
            },
            {
                index: true,
                path: "us",
                element: <UnitedState />,
            },
            {
                path: "uae",
                element: <UnitedArabEmirate />,
            },
            {
                path: "china",
                element: <China />,
            },
            {
                path: "*",
                element: <h1>page not found</h1>,
            },
        ],
    },
]);

export default routes;
