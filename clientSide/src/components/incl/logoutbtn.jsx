import React, { useContext } from "react";
import { AuthContext } from "../../context/authcontext";
import "./logout.css";
import { useHistory } from "react-router-dom";

export const Logout = (props) => {
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);
  const handleClick = () => {
    setAuth({});
    localStorage.clear();
    history.replace("/");
  };
  return (
    // <Link to='/'>
    <button onClick={handleClick} className="bttn">
      Log Out
    </button>
    // </Link>
  );
};
