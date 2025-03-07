export function Btn({
	onClickAction = null,
	btnClass = "",
	children,
	resetClass = false,
	type = "button",
}) {
	return (
		<button
			onClick={onClickAction}
			type={type}
			className={`${
				!resetClass &&
				"text-primary bg-secondary rounded-full font-bold px-10 py-3 flex-1 uppercase tracking-wide transition-all hover:scale-[1.015] active:scale-100"
			} ${btnClass}`}
		>
			{children}
		</button>
	);
}
