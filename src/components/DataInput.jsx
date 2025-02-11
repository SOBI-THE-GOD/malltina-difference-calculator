import { useRef, useEffect } from "react";
import clipLogo from "../assets/clip-logo.svg";

export function DataInput({
    placeHolder,
    setState,
    state,
    showAlert,
    focusOnRender = false,
    inputClass = "",
    pholderClass = "",
    icnClass = "",
    resetIcnClass = false,
    resetPholderClass = false,
    resetInputClass = false,
    containerClass = "",
    type = "Number",
}) {
    const inputRef = useRef(null);
    const placeHolderRef = useRef(null);
    function handleOnFocus() {
        placeHolderRef.current.style.cssText = `
            top: 0;
            scale: 0.9;
            color: #000;
        `;
    }
    function handleOnBlur() {
        const input = inputRef.current;
        if (input.value.trim().length == 0) {
            placeHolderRef.current.style.cssText = "";
            input.value = "";
        }
    }
    function paste() {
        if (navigator.clipboard && navigator.clipboard.readText) {
            navigator.clipboard.readText().then(
                (res) => {
                    const input = inputRef.current;
                    input.value = res.trim();
                    input.focus();
                    setState(Number(input.value));
                },
                () => {
                    showAlert("clipboard access required !", "Err");
                }
            );
        } else {
            showAlert("clipboard access required !", "Err");
        }
    }
    useEffect(() => {
        const input = inputRef.current;
        if (state || focusOnRender) {
            input.value = state ? state : "";
            input.focus();
        }
    }, [state]);
    return (
        <div className={"relative" + ` ${containerClass}`}>
            <input
                type="text"
                name={placeHolder}
                className={`${
                    !resetInputClass &&
                    "outline-none border-solid border-2 border-gray-300 w-full rounded-full shadow-md py-3 px-11"
                } ${inputClass}`}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                ref={inputRef}
                onChange={() => {
                    setState(
                        type === "Number"
                            ? Number(inputRef.current.value)
                            : inputRef.current.value
                    );
                }}
            />
            <span
                className={`${
                    !resetPholderClass &&
                    "absolute transition-all top-1/2 left-11 -translate-y-1/2 bg-white text-gray-500 px-2 rounded-full capitalize"
                } ${pholderClass}`}
                ref={placeHolderRef}
                onClick={() => {
                    inputRef.current.focus();
                }}
            >
                {placeHolder}
            </span>
            <img
                src={clipLogo}
                alt="clipboard logo"
                className={`${
                    !resetIcnClass &&
                    "absolute h-6 top-1/2 right-5 -translate-y-1/2 cursor-pointer active:scale-[0.98]"
                } ${icnClass}`}
                onClick={paste}
            />
        </div>
    );
}
