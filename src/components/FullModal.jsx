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
                "absolute top-1/2 left-1/2 p-10 font-sans flex flex-row bg-white max-w-screen-md -translate-y-1/2 -translate-x-1/2 animate-showup gap-5 max-lg:flex-col sm:w-7/12 w-full"
            } ${formClass}`}
            onSubmit={(e) => {
                onSubmitAction(e);
            }}
        >
            {children}
        </form>
    );
}
