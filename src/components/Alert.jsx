const Alert = ({ alert: { type, message, show }, terminateAlert }) => {
	if (!show) {
		return;
	}
	let alertStyles = {
		borderColor: type === "Err" ? "#fa6666" : "#ffffff",
		color: type === "Err" ? "#fa6666" : "#ffffff",
	};
	return (
		show && (
			<div
				className={`absolute text-secondary bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-md shadow-secondary/10 border-2 font-medium text-xs sm:text-sm tracking-wide capitalize animate-showup bg-primary cursor-pointer w-fit text-nowrap origin-left z-10`}
				style={alertStyles}
				onClick={terminateAlert}
			>
				{message}
			</div>
		)
	);
};

export default Alert;
