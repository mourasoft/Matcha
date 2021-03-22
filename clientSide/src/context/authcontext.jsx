import React, { useState, createContext, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import config from "../config";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [auth, setAuth] = useState({});
  // const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const login = localStorage.getItem("login");
    // console.log(token);
    if (token) {
      const isValid = async () => {
        const { data } = await axios.get(
          `http://${config.SERVER_HOST}:1337/auth`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // console.log(data);
        if (data.success) {
          // console.log("data is valid");
          setAuth({ token, login });
        } else {
          // console.log("rani sekrana");
          localStorage.clear();
          setAuth((oldValue) => {
            return { ...oldValue, token: null };
          });
        }
      };
      isValid();
    } else {
      console.log("invalid token");
      setAuth((oldValue) => {
        return { ...oldValue, token: null };
      });
      localStorage.clear();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const IsLoggedfn = () => {
  const {
    auth: { token },
  } = useContext(AuthContext);
  return token;
};

export default AuthProvider;
