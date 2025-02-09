import { convertDifferenceToNum } from "../helpers/converDifferenceToNum";

export const DifferencePholder = ({ difference = "---" }) => (
    <div className="w-full pl-10 flex gap-6 capitalize py-1 items-center">
        <span className="font-semibold text-2xl">difference :</span>
        <span className="text-xl">
            {convertDifferenceToNum(difference) ? difference : "......"}
        </span>
    </div>
);
