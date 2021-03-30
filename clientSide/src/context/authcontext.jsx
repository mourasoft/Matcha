import React, { useState, createContext, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import config from "../config";

function getInstance(token) {
  return axios.create({
    headers: { Authorization: `${token}` },
  });
}

export const AuthContext = createContext();

const token = localStorage.getItem("token");
const login = localStorage.getItem("login");

export function AuthProvider(props) {
  const [auth, setAuth] = useState({});
  // const history = useHistory();
  useEffect(() => {
    if (token) {
      const isValid = async () => {
        const { data } = await getInstance(token).get(
          `http://${config.SERVER_HOST}:1337/auth`
        );
        if (data.success) {
          console.log("data is set in auth");
          setAuth((oldVlas) => ({
            ...oldVlas,
            token,
            login,
          }));
        } else {
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
      // localStorage.clear();
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
