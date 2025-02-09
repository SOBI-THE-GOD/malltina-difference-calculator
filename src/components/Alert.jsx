const Alert = ({ alert: { type, message, show }, terminateAlert }) => {
    if (!show) {
        return;
    }
    let alertStyles = {
        borderColor: type === "Err" ? "#ef4444" : "#000000",
        color: type === "Err" ? "#ef4444" : "#000000",
    };
    return (
        show && (
            <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-xl border-2 font-medium text-xs sm:text-sm tracking-wide capitalize animate-showup bg-white bg-opacity-90 cursor-pointer w-fit text-nowrap`}
                style={alertStyles}
                onClick={terminateAlert}
            >
                {message}
            </div>
        )
    );
};

export default Alert;
