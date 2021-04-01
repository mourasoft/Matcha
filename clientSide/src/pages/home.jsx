import { IsLoggedfn } from "../context/authcontext";
import ProfilePAdge from "./post";
import SignIn from "../components/auth/signIn";

const Home = () => {
  const loged = IsLoggedfn();

  if (typeof loged === "undefined") {
    return <SignIn />;
  }
  if (typeof loged === "string") {
    return <ProfilePAdge />;
  } else return <SignIn />;
};

export default Home;
