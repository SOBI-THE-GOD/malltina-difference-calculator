import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Ranjbar from "../pages/Ranjbar";
import UnitedState from "../pages/UnitedState";
import AsiaPage from "../pages/AsiaPage";
import Home from "../pages/Home";

const routes = createBrowserRouter([
	{
		element: <MainLayout />,
		path: "/",
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "ranjbar",
				element: <Ranjbar />,
			},
			{
				path: "us",
				element: <UnitedState />,
			},
			{
				path: "uae",
				element: (
					<AsiaPage
						title="united arab emirate"
						country="uae"
						currency="AED"
						key="uae"
					/>
				),
			},
			{
				path: "china",
				element: (
					<AsiaPage
						title="republic of china"
						country="china"
						currency="USD"
						key="china"
					/>
				),
			},
			{
				path: "*",
				element: <h1>page not found</h1>,
			},
		],
	},
]);

export default routes;
