import { Link } from "react-router-dom";
function NotFoundPage() {
	return (
		<div className="h-[calc(100dvh-3rem)] flex items-center justify-center relative isolate">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				{" "}
				<h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl w-max font-extrabold mb-4 text-secondary capitalize text-center">
					page not found !
				</h1>
				<Link
					to={"/"}
					className="text-sm sm:text-base md:text-lg xl:text-xl text-secondary font-semibold text-right w-full block hover:text-tertiary transition-colors pr-[7%]"
				>
					towards home : )
				</Link>
			</div>
		</div>
	);
}
export default NotFoundPage;
