import { Switch, Route } from "react-router-dom";
import { Navbar } from "./components/incl/navBar";
import SignUp from "./components/auth/signUp";
import Home from "./pages/home";
import SignIn from "./components/auth/signIn";
import Forgot from "./components/auth/forgot";
import Reset from "./components/auth/reset";
import Footer from "./components/incl/footer";
import Profile from "./components/auth/profil";
import Confirm from "./components/auth/confirme";
import { useContext, useEffect } from "react";
import { AuthProvider, AuthContext } from "./context/authcontext";
import EditProfile from "./pages/editProfile";
import Notification from "./pages/notification";
import ProfilePAdge from "./pages/post";
import User from "./pages/user";
import unblock from "./pages/unblock";
import axios from "axios";
import config from "./config";
import { useHistory } from "react-router-dom";
import Chat from "./pages/chat";
import Histrory from "./pages/history";

function App() {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  // useEffect(() => {
  //   // socketon();
  //   if (authContext.auth.token) {
  //     axios
  //       .get(`http://${config.SERVER_HOST}:1337/posts`, {
  //         headers: {
  //           Authorization: authContext.auth.token,
  //         },
  //       })
  //       .then((result) => {
  //         if (
  //           result.data.message ===
  //           "You've to complete your infos before visiting this page"
  //         ) {
  //           history.replace("/profile");
  //           authContext.setAuth((old) => {
  //             return { ...old, iscomplet: false };
  //           });
  //         }
  //       });
  //   }
  // }, [authContext.auth.token, history]);
  // console.log(authContext.auth);
  function RedirectLogin() {
    history.replace("/signin");
    return null;
  }
  function RedirectHome() {
    history.replace("/");
    return null;
  }
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/confirm/:login/:key" component={Confirm}></Route>
        <Route path="/reset/:login/:key" exact component={Reset} />
        <Route path="/unblock" component={unblock} />
        <Route path="/user/:user" component={User} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/notif" component={Notification} />
        <Route path="/history" component={Histrory} />
        <Route path="/post" component={ProfilePAdge} />
        <Route path="/editprofile" component={EditProfile} />
        <Route path="/signin" component={SignIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/chat" component={Chat} />
        <Route path="/reset" component={Reset} />
        <Route path="/" exact component={Home} />
      </Switch>
      <Footer />
    </>
  );
}

function AppWithStore() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
export default AppWithStore;
