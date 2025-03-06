import { NavLink } from "react-router-dom";
import DownArrowIcn from "../assets/down-arrow.svg";
import UpArrowIcn from "../assets/up-arrow.svg";
import { useState } from "react";
const mainLinks = [
	{
		path: "/",
		placeHolder: "home",
	},
	{
		path: "us",
		placeHolder: "united state",
	},
];
const dropDownLinks = [
	{
		path: "ranjbar",
		placeHolder: "ranjbar",
	},
	{
		path: "us-dimension",
		placeHolder: "usa dimension",
	},
];
const asiaDropDown = [
	{
		path: "china",
		placeHolder: "china",
	},
	{
		path: "uae",
		placeHolder: "united arab emirate",
	},
];
const navLinkClass = `text-white text-sm font-medium capitalize hover:text-orange-400 transition-colors h-full flex items-center px-5`;
const createNavLink = (linksArr, addClass = "") =>
	linksArr.map(({ path, placeHolder }, key) => (
		<NavLink
			to={{ pathname: path }}
			style={({ isActive }) => ({
				color: isActive && "#fb923c",
			})}
			className={navLinkClass + ` ${addClass}`}
			key={key}
		>
			{placeHolder}
		</NavLink>
	));

const DropDownLink = ({ dropDownLinks, dropDownName = "more" }) => {
	const [isDropDownOpen, setIsDropDownOpen] = new useState(false);
	return (
		<li
			className={
				navLinkClass +
				" list-none cursor-pointer relative hover:text-white"
			}
			onMouseEnter={() => setIsDropDownOpen(true)}
			onMouseLeave={() => setIsDropDownOpen(false)}
		>
			{dropDownName}
			<img
				src={isDropDownOpen ? UpArrowIcn : DownArrowIcn}
				alt="arrow icon"
				className="absolute h-2 top-3/4 sm:top-3/4 left-1/2 -translate-y-1/2 -translate-x-1/2"
			/>
			{isDropDownOpen && (
				<div className="absolute top-full right-0 min-w-48 h-fit bg-black rounded-b-md pb-1 [&>*:not(:last-child)]:border-b-[2px]">
					{createNavLink(
						dropDownLinks,
						"block px-4 py-3 hover:bg-gray-900 leading-none rounded-md border-gray-900",
					)}
				</div>
			)}
		</li>
	);
};
const Nav = () => {
	return (
		<nav className="h-12 bg-black w-full flex justify-center items-center rounded-b-2xl m-auto sm:w-fit sm:px-7">
			{createNavLink(mainLinks)}
			<DropDownLink dropDownLinks={asiaDropDown} dropDownName="asia" />
			<DropDownLink dropDownLinks={dropDownLinks} dropDownName="more" />
		</nav>
	);
};

export default Nav;
