import React, { useState } from "react";
import "./navBar.css";
import { Button } from "./button";
import { Dropdown } from "./dropDown";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const [click, setClick] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);
	const onMouseEnter = () => {
		if (window.innerWidth < 960) {
			setDropdown(false);
		} else {
			setDropdown(true);
		}
	};

	const onMouseLeave = () => {
		if (window.innerWidth < 960) {
			setDropdown(false);
		} else {
			setDropdown(false);
		}
	};

	return (
		<>
			<nav className="navbar">
				<Link to="/" className="navbar-logo">
					Matcha
				</Link>
				<div className="menu-icon" onClick={handleClick}>
					<i className={click ? "fas fa-times" : "fas fa-bars"} />
				</div>
				<ul className={click ? "nav-menu active" : "nav-menu"}>
					<li className="nav-item">
						<Link
							to="/"
							className="nav-links"
							onClick={closeMobileMenu}
						>
							Home
						</Link>
					</li>
					<li
						className="nav-item"
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
					>
						<Link
							to="/service"
							className="nav-links"
							onClick={closeMobileMenu}
						>
							Services <i className="fas fa-caret-down"/>
						</Link>
						{dropdown && <Dropdown />}
					</li>
					<li className="nav-item">
						<Link
							to="/about"
							className="nav-links"
							onClick={closeMobileMenu}
						>
							About
						</Link>
					</li>
					<li >
						<Link
							to="/signup"
							className="nav-links-mobile"
							onClick={closeMobileMenu}
						>
							Sign up
						</Link>
					</li>
					<li >
						<Link
							to="/signin"
							className="nav-links-mobile"
							onClick={closeMobileMenu}
						>
							Sign in
						</Link>
					</li>
				</ul>
				<Button path={'google'} />
			</nav>
		</>
	);
};
