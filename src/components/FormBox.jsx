export function FormBox({
	title,
	containerClass = "",
	titleClass = "",
	children,
	onSubmitAction = null,
	resetContainerClass = false,
	resetTitleClass = false,
}) {
	return (
		<form
			className={`${
				!resetContainerClass &&
				"sm:w-7/12 w-full rounded-md shadow-lg shadow-secondary/10 mx-auto mt-10 p-10 font-sans flex flex-col gap-y-5 max-w-screen-md min-h"
			} ${containerClass}`}
			onSubmit={(e) => onSubmitAction(e)}
		>
			<h1
				className={`${
					!resetTitleClass &&
					"text-secondary text-4xl font-bold uppercase text-center mb-9 tracking-wide"
				} ${titleClass}`}
			>
				{title}
			</h1>
			{children}
		</form>
	);
}
