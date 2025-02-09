import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
    <>
        <Nav />
        <main>
            <Outlet />
        </main>
    </>
);

export default MainLayout;
