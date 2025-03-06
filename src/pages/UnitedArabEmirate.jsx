import { useState } from "react";
import { FormBox } from "../components/FormBox";
import { DataInput } from "../components/DataInput";

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

	return (
		<FormBox title="united arab Emirate">
			<div className="flex flex-wrap items-center justify-between gap-5">
				{inputs.map(({ placeHolder, setState, state }, key) => {
					return (
						<DataInput
							placeHolder={placeHolder}
							state={state}
							setState={setState}
							key={key}
							focusOnRender={key === 0}
							containerClass="flex-auto"
						/>
					);
				})}
			</div>
		</FormBox>
	);
};

export default UnitedArabEmirate;
