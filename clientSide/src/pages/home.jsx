import { useContext } from "react";
import { AuthContext, IsLoggedfn } from "../context/authcontext";
import ProfilePAdge from "./post";
import SignIn from "../components/auth/signIn";

const Home = () => {
  const { auth } = useContext(AuthContext);
  const loged = IsLoggedfn();

  // console.log(auth);
  if (typeof loged === "undefined") {
    return <SignIn />;
  }
  if (typeof loged === "string") {
    return <ProfilePAdge />;
  } else return <SignIn />;
};

export default Home;
