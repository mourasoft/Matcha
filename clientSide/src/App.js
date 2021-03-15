import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/incl/navBar";
import SignUp from "./components/auth/signUp";
import Home from "./pages/home";
import SignIn from "./components/auth/signIn";
import Forgot from "./components/auth/forgot";
import Reset from "./components/auth/reset";
import Footer from "./components/incl/footer";
import Profile from "./components/auth/profil";


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile} />
        <Route path="/signin" component={SignIn} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/reset" component={Reset} />
        <Route path="/" exact component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
