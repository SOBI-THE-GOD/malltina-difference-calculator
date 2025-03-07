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
const navLinkClass = `text-secondary text-sm font-bold capitalize hover:text-tertiary transition-colors h-full flex items-center justify-center px-5 grow`;
const createNavLink = (linksArr, addClass = "") =>
	linksArr.map(({ path, placeHolder }, key) => (
		<NavLink
			to={{ pathname: path }}
			className={({ isActive }) =>
				`${navLinkClass} ${isActive ? "text-tertiary" : ""} ${addClass}`
			}
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
				" list-none cursor-pointer relative hover:text-secondary"
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
				<div className="absolute top-[calc(100%-1px)] right-0 min-w-48 h-fit rounded-md pb-1 [&>*:not(:last-child)]:border-b-[2px] border border-tertiary border-solid border-t-0 bg-primary border-b-2">
					{createNavLink(
						dropDownLinks,
						"block relative px-4 py-3 leading-none rounded-md border-violet-900 relative pr-12 text-nowrap after:content-['\u2BCD'] after:absolute after:top-1/2 after:right-2 after:transition-transform after:opacity-0 hover:after:-translate-x-1/2 hover:after:opacity-100 hover:after:rotate-180 after:-translate-y-1/2 after:-translate-x-4 !justify-start",
					)}
				</div>
			)}
		</li>
	);
};
const Nav = () => {
	return (
		<nav className="h-12 w-full flex justify-evenly items-center border border-solid border-tertiary border-t-0 rounded-b-2xl m-auto sm:w-fit sm:px-7 sm:min-w-[24rem]">
			{createNavLink(mainLinks)}
			<DropDownLink dropDownLinks={asiaDropDown} dropDownName="asia" />
			<DropDownLink dropDownLinks={dropDownLinks} dropDownName="more" />
		</nav>
	);
};

export default Nav;
