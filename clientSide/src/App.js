import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/incl/navBar";
import SignUp from "./components/auth/signUp";
import Home from "./pages/home";
import SignIn from "./components/auth/signIn";
import Forgot from "./components/auth/forgot";
import Reset from "./components/auth/reset";
import Footer from "./components/incl/footer";
import Profile from "./components/auth/profil";
import Confirm from "./components/auth/confirme";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/authcontext";
import EditProfile from "./pages/editProfile";
import Notification from "./pages/notification";
import ProfilePAdge from "./pages/post";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/notif" component={Notification} />
        <Route path="/post" component={ProfilePAdge} />
        <Route path="/confirm/:login/:key" component={Confirm} />
        <Route path="/reset/:login/:key" exact component={Reset} />
        <Route path="/editprofile" component={EditProfile} />
        <Route path="/signin" component={SignIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/reset" component={Reset} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </Router>
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
