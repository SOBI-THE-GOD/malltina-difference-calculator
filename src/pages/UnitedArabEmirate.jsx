import { useState } from "react";
import { FormBox } from "../components/FormBox";
import { DataInput } from "../components/DataInput";
import { LittleContainer } from "../components/LittleContainer";
import { Btn } from "../components/Btn";

const UnitedArabEmirate = () => {
	const [lastWeight, setLastWeight] = useState(0);
	const [newWeight, setNewWeight] = useState(0);
	const inputs = [
		{
			placeHolder: "last weight",
			setState: setLastWeight,
			state: lastWeight,
		},
		{
			placeHolder: "new weight",
			setState: setNewWeight,
			state: newWeight,
		},
	];

	const openPopup = () => {
		// if (difference) {
		// 	setModal(true);
		// } else {
		// 	const alertMessage = "information is not complete!";
		// 	showAlert(alertMessage, "Err");
		// }
	};
	const buttons = [
		{ name: "note", onClickAction: null, type: "submit" },
		{ name: "ticket", onClickAction: openPopup, type: "button" },
	];

	return (
		<FormBox title="united arab Emirate">
			{inputs.map(({ placeHolder, setState, state }, key) => {
				return (
					<DataInput
						placeHolder={placeHolder}
						state={state}
						setState={setState}
						key={key}
						focusOnRender={key === 0}
						containerClass="flex-auto"
						type="Number"
					/>
				);
			})}
			<LittleContainer>
				{buttons.map(({ name, onClickAction, type }, key) => {
					return (
						<Btn
							onClickAction={onClickAction}
							type={type}
							key={key}
						>
							{name}
						</Btn>
					);
				})}
			</LittleContainer>
		</FormBox>
	);
};

export default UnitedArabEmirate;
