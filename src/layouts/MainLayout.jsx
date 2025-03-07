import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const MainLayout = () => (
	<div className="bg-primary min-h-dvh">
		<Nav />
		<main>
			<Outlet />
		</main>
		<Analytics />
	</div>
);

export default MainLayout;
