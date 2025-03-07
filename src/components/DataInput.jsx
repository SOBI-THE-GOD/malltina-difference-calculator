import { useRef, useEffect } from "react";
import clipLogo from "../assets/clip-logo.svg";
import { convertToPureNum } from "../helpers/convertToPureNum";
import { separateNum } from "../helpers/separateNum";

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
		const placeHolder = placeHolderRef.current;
		placeHolder.style.cssText = `
            top: 0;
            scale: 0.9;
        `;
		placeHolder.classList.add("text-tertiary");
	}
	function handleOnBlur() {
		const input = inputRef.current;
		if (input.value.trim().length == 0) {
			const placeHolder = placeHolderRef.current;
			placeHolder.style.cssText = "";
			placeHolder.classList.remove("text-tertiary");
			input.value = "";
		}
	}
	function paste() {
		if (navigator.clipboard && navigator.clipboard.readText) {
			navigator.clipboard.readText().then(
				(res) => {
					const input = inputRef.current;
					if (type === "Number") {
						input.value = Number(res.trim()) ? res.trim() : "";
						setState(Number(input.value));
					} else {
						input.value = res.trim();
						setState(input.value);
					}
					input.focus();
				},
				() => {
					showAlert("clipboard access required !", "Err");
				},
			);
		} else {
			showAlert("clipboard access required !", "Err");
		}
	}
	useEffect(() => {
		const input = inputRef.current;
		if (state || focusOnRender) {
			if (state) {
				if (type === "Number") {
					input.value = separateNum(state);
				} else {
					input.value = state;
				}
			} else {
				input.value = "";
			}
			input.focus();
		}
	}, [state, focusOnRender]);
	return (
		<div className={"relative" + ` ${containerClass}`}>
			<input
				type="text"
				name={placeHolder}
				className={`${
					!resetInputClass &&
					"text-secondary outline-none border-solid border-2 border-quaternary w-full rounded-full shadow-md py-3 px-11 bg-primary"
				} ${inputClass}`}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				ref={inputRef}
				onChange={() => {
					const input = inputRef.current;
					if (type === "Number") {
						setState(convertToPureNum(input.value));
					} else {
						setState(input.value);
					}
				}}
			/>
			<span
				className={`${
					!resetPholderClass &&
					"absolute transition-all top-1/2 left-11 -translate-y-1/2 text-neutral-400 px-2 rounded-full capitalize bg-primary font-semibold"
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
