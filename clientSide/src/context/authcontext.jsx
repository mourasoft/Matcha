import React, { useState, createContext, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState({});
  
  return (
    <AuthContext.Provider value={(auth, setAuth)}>
      {props.children}
    </AuthContext.Provider>
  );
}
