export const modifyElemClass = (element, action, classes) => {
	if (action === "rm") {
		classes.forEach((cls) => {
			element.classList.remove(cls);
		});
	} else {
		classes.forEach((cls) => {
			element.classList.add(cls);
		});
	}
};
