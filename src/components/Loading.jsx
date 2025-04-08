const Loading = ({ animate = false }) => {
	return (
		<div className="flex flex-1 items-center justify-start">
			{Array(6)
				.fill(0)
				.map((el, i) => {
					return i / 10 + 0.2;
				})
				.map((delay, key) => {
					return (
						<div
							key={key}
							className="w-[4%] px-[1%] flex items-center justify-center"
							style={{ "--delay": `${delay}s` }}
						>
							<div
								className={`w-full ${!animate ? "h-1" : "aspect-square"} rounded-full bg-secondary ${animate && "animate-scaleBounce"}`}
							></div>
						</div>
					);
				})}
		</div>
	);
};

export default Loading;
