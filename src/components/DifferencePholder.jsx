import { useMemo } from "react";
import { separateNum } from "../helpers/separateNum";

export const DifferencePholder = ({ difference = null }) => {
	const separatedDiff = useMemo(() => {
		return separateNum(difference);
	}, [difference]);
	return (
		<div className="w-full pl-10 flex gap-6 capitalize py-1 items-center text-secondary">
			<span className="font-semibold text-2xl">difference :</span>
			<span className="text-xl">
				{difference ? separatedDiff : "......"}
			</span>
		</div>
	);
};
