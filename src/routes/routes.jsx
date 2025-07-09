import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Ranjbar from "../pages/Ranjbar";
import UnitedState from "../pages/UnitedState";
import AsiaPage from "../pages/AsiaPage";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";

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
				path: "turkey",
				element: (
					<AsiaPage
						title="turkey"
						country="turkey"
						currency="TRY"
						key="turkey"
					/>
				),
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
]);

export default routes;
