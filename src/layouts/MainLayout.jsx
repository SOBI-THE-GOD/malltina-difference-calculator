import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"

const MainLayout = () => (
    <>
        <Nav />
        <main>
            <Outlet />
        </main>
        <Analytics />
    </>
);

export default MainLayout;
