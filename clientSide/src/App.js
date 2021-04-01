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
import { useContext, useEffect, useState } from "react";
import { AuthProvider, AuthContext } from "./context/authcontext";
import EditProfile from "./pages/editProfile";
import Notification from "./pages/notification";
import ProfilePAdge from "./pages/post";
import User from "./pages/user";
import Unblock from "./pages/unblock";
import axios from "axios";
import config from "./config";
import { useHistory } from "react-router-dom";
import Chat from "./pages/chat";
import Histrory from "./pages/history";
import io from "socket.io-client";

function App() {
  const history = useHistory();
  const [ntfslength, setntfslength] = useState(0);
  const authContext = useContext(AuthContext);

  function configSocket() {
    const socket = io.connect(`http://${config.SERVER_HOST}:1337`);
    socket.on("connect", (sock) => {
      socket.emit("Authorization", authContext.auth.token);
      socket.on("updatelengthntfs", (rien) => {
        upntfslength();
      });
    });
  }

  function upntfslength() {
    axios
      .get(`http://${config.SERVER_HOST}:1337/notifications?limit=0`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.success) {
          setntfslength(res.data.invue_length);
        }
      });
  }

  function vuentfs() {
    axios
      .get(`http://${config.SERVER_HOST}:1337/notifications/vue`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.success) {
          setntfslength(0);
        }
      });
  }
  // socket.on('message', msg => );

  function isloged() {
    if (authContext.auth.login !== undefined && authContext.auth.login)
      return true;
    else return false;
  }
  function completProfile() {
    if (authContext.auth.iscomplet) return true;
    else return false;
  }
  useEffect(() => {
    // socketon();
    if (authContext.auth.token) {
      configSocket();
      axios
        .get(`http://${config.SERVER_HOST}:1337/posts`, {
          headers: {
            Authorization: authContext.auth.token,
          },
        })
        .then((result) => {
          if (
            result.data.message ===
            "You've to complete your infos before visiting this page"
          ) {
            authContext.setAuth((old) => {
              return { ...old, iscomplet: false };
            });
          } else {
            authContext.setAuth((old) => {
              return { ...old, iscomplet: true };
            });
          }
        });
    }
  }, [authContext.auth.token, history]);

  return (
    <>
      <Navbar
        ntfslength={ntfslength}
        upntfslength={upntfslength}
        vuentfs={vuentfs}
      />
      <Switch>
        <Route
          path="/confirm/:login/:key"
          component={isloged() ? Home : Confirm}
        />
        <Route
          path="/reset/:login/:key"
          exact
          component={isloged() ? Home : Reset}
        />
        <Route
          path="/user/:user"
          render={(props) => {
            if (isloged() && !completProfile()) {
              return <Profile {...props} />;
            } else if (!isloged()) {
              return <Home {...props} />;
            }
            return <User {...props} />;
          }}
        />
        <Route
          path="/notif"
          render={(props) => {
            if (isloged() && !completProfile()) {
              return <Profile {...props} />;
            } else if (!isloged()) {
              return <Home {...props} />;
            }
            return <Notification {...props} />;
          }}
        />
        <Route
          path="/history"
          render={(props) => {
            if (isloged() && !completProfile()) {
              return <Profile {...props} />;
            } else if (!isloged()) {
              return <Home {...props} />;
            }
            return <Histrory {...props} />;
          }}
        />
        <Route
          path="/unblock"
          render={(props) => {
            if (isloged() && !completProfile()) {
              return <Profile {...props} />;
            } else if (!isloged()) {
              return <Home {...props} />;
            }
            return <Unblock {...props} />;
          }}
        />
        <Route
          path="/post"
          render={(props) => {
            if (isloged() && !completProfile()) {
              return <Profile {...props} />;
            } else if (!isloged()) {
              return <Home {...props} />;
            }
            return <ProfilePAdge {...props} />;
          }}
        />
        <Route
          path="/editprofile"
          render={(props) => {
            if (isloged() && !completProfile()) {
              return <Profile {...props} />;
            } else if (!isloged()) {
              return <Home {...props} />;
            }
            return <EditProfile {...props} />;
          }}
        />
        <Route
          path="/profile"
          component={isloged() && !completProfile() ? Profile : Home}
        />
        <Route
          path="/chat"
          render={(props) => {
            if (isloged() && !completProfile()) {
              return <Profile {...props} />;
            } else if (!isloged()) {
              return <Home {...props} />;
            }
            return <Chat {...props} />;
          }}
        />
        <Route path="/signin" component={isloged() ? Home : SignIn} />
        <Route path="/forgot" component={isloged() ? Home : Forgot} />
        <Route path="/signup" component={isloged() ? Home : SignUp} />
        <Route path="/reset" component={isloged() ? Home : Reset} />
        <Route
          path="/"
          exact
          render={(props) => {
            if (isloged() && !completProfile()) {
              return <Profile {...props} />;
            } else if (!isloged()) {
              return <Home {...props} />;
            }
            return <Home {...props} />;
          }}
          // component={!completProfile() ? Profile : Home}
        />
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
