import { useContext } from "react";
import { AuthContext, IsLoggedfn } from "../context/authcontext";
const Home = () => {
  const { auth } = useContext(AuthContext);
  const loged = IsLoggedfn();
  // console.log(auth);
  if (typeof loged === "undefined") {
    return <div> Yuo not logged :(</div>;
  }
  if (typeof loged === "string") {
    return <h1>hello {auth.login} from home</h1>;
  } else return <h1>Please login</h1>;
};

export default Home;
