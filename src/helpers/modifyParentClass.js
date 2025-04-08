export const modifyParentClass = (element, action, classes) => {
	const parent = element.parentElement;
	if (action === "rm") {
		classes.forEach((cls) => {
			parent.classList.remove(cls);
		});
	} else {
		console.log(element);
		classes.forEach((cls) => {
			parent.classList.add(cls);
		});
	}
};
