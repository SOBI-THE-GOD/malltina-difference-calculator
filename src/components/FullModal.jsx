export function FullModal({
	children,
	onSubmitAction,
	formClass = "",
	resetContClass = false,
}) {
	return (
		<form
			className={`${
				!resetContClass &&
				"absolute top-1/2 left-1/2 p-10 font-sans flex bg-primary max-w-screen-md -translate-y-1/2 -translate-x-1/2 animate-showup gap-5 sm:w-8/12 w-full flex-wrap"
			} ${formClass}`}
			onSubmit={(e) => {
				onSubmitAction(e);
			}}
		>
			{children}
		</form>
	);
}
