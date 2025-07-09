import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const MainLayout = () => {
	return (
		<div className="bg-primary min-h-dvh font-sans relative">
			<Nav />
			<main className="overflow-auto">
				<Outlet />
			</main>
			<Analytics />
		</div>
	);
};

export default MainLayout;
