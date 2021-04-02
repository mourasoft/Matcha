import React, { useEffect, useState, useContext } from "react";
import "./navBar.css";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { IsLoggedfn } from "../../context/authcontext";
import { Logout } from "./logoutbtn";
import Badge from "@material-ui/core/Badge";
import { AuthContext } from "../../context/authcontext";
import { useHistory } from "react-router-dom";

export const Navbar = ({ ntfslength, upntfslength, vuentfs }) => {
  const loged = IsLoggedfn();
  const [click, setClick] = useState(false);
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  // const onMouseEnter = () => {
  //   if (window.innerWidth < 960) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(true);
  //   }
  // };

  useEffect(() => {
    upntfslength();
  }, [upntfslength]);
  // const onMouseLeave = () => {
  //   if (window.innerWidth < 960) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(false);
  //   }
  // };
  const LogOutfunction = () => {
    setAuth({});
    localStorage.clear();
    history.go("/");
  };

  if (typeof loged === "string") {
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
                to="/history"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                History
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Chat" className="nav-links" onClick={closeMobileMenu}>
                Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/unblock"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                block
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/editprofile"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                profile
              </Link>
            </li>
            <li className="nav-item">
              <div className="nav-links">
                <Badge badgeContent={ntfslength} color="primary">
                  {" "}
                  <Link
                    to="/notif"
                    className="nav-notif"
                    onClick={() => {
                      vuentfs();
                      closeMobileMenu();
                    }}
                  >
                    notification
                  </Link>
                </Badge>
              </div>
            </li>
            <li>
              <Link
                to="/signup"
                className="nav-links-mobile"
                onClick={() => {
                  LogOutfunction();
                  closeMobileMenu();
                }}
              >
                Log Out
              </Link>
            </li>
          </ul>
          <Logout />
        </nav>
      </>
    );
  } else {
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
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/signup"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          <Button />
        </nav>
      </>
    );
  }
};
