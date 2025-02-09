export function LittleContainer({
    children,
    contClass = "",
    resetContClass = false,
}) {
    return (
        <div
            className={`${
                !resetContClass &&
                "flex space-x-4 items-center justify-evenly mb-1 mt-4"
            } ${contClass}`}
        >
            {children}
        </div>
    );
}
