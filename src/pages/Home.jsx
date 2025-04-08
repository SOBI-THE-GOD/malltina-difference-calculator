import { useRef } from "react";
import AuroraBg from "../components/AuroraBg";
import BluryText from "../components/BluryText";
import { modifyParentClass } from "../helpers/modifyParentClass";
import { useEffect } from "react";
const Home = () => {
	const container = useRef(null);
	useEffect(() => {
		const element = container.current;
		modifyParentClass(element, "rm", ["pb-16"]);
	}, []);
	return (
		<div
			className="h-[calc(100dvh-3rem)] flex items-center justify-center relative isolate"
			ref={container}
		>
			<BluryText
				text="Difference Calculator"
				direction="bottom"
				animateBy="letter"
				delay={50}
				className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl w-max font-extrabold mb-8 text-secondary text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
			<AuroraBg
				colorStops={["#6d28d9", "#6d28d9", "#6d28d9"]}
				blend={0.2}
				amplitude={0.45}
				speed={0.5}
				containerClass="rotate-180"
			/>
		</div>
	);
};
export default Home;
