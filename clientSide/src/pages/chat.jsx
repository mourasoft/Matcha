import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import { AuthContext } from "../context/authcontext";
import config from "../config";
import moment from "moment";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import io from "socket.io-client";

const socket = io.connect(`http://${config.SERVER_HOST}:1337`);

function getInstance(token) {
  return axios.create({
    headers: { Authorization: `${token}` },
  });
}
const useStyles = makeStyles({
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
  backIcon: {
    cursor: "pointer",
  },
  GridIcons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Chat = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const {
    auth: { token },
  } = authContext;
  const [userOnline, setUserOnline] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState([]);
  const [responsive, setResponsive] = useState(false);
  const [activeUser, setActiveUser] = useState({
    login: "",
    id: "",
  });

  function updateMessages() {
    setTimeout(() => {
      getInstance(token)
        .get(
          `http://${config.SERVER_HOST}:1337/inbox/messages?user_id=${activeUser.id}&g_msgid=${showMessage.length}`
        )
        .then((res) => {
          if (res.data.success && res.data.data.length) {
            setShowMessage(showMessage.concat(res.data.data));
          }
        });
    }, 500);
  }

  function getMessage(user) {
    getInstance(token)
      .get(`http://${config.SERVER_HOST}:1337/inbox/messages?user_id=${user}`)
      .then((res) => {
        if (res.data.success) {
          setShowMessage(res.data.data);
        }
      });
  }
  function sendMessage(toLogin) {
    if (message.trim() === "" || message.length > 100) {
      setMessage("");
    } else {
      socket.emit("updatentfs", "");
      socket.emit("updatemessages", "");
      getInstance(token).post(`http://${config.SERVER_HOST}:1337/inbox`, {
        login: toLogin,
        msg: message,
      });

      setMessage("");
      let msg = {
        // login: toLogin,
        message: message,
        modified_dat: new Date(),
        inbox_id: showMessage[0]?.inbox_id,
      };
      setShowMessage((old) => old.concat(msg));
    }
  }

  socket.on("updatemessages", (rien) => {
    if (activeUser.id !== "") updateMessages();
  });

  useEffect(() => {
    getInstance(token)
      .get(`http://${config.SERVER_HOST}:1337/inbox/users`)
      .then((res) => {
        setUserOnline(res.data);
      });
  }, [token]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} className={classes.GridIcons}>
          {responsive ? (
            <BackIcon
              className={classes.backIcon}
              onClick={() => setResponsive(false)}
            />
          ) : (
            ""
          )}
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={12} className={classes.borderRight500}>
          <List
            style={responsive ? { display: "none" } : { display: "inline" }}
          >
            {userOnline?.map((e, index) => (
              <ListItem
                onClick={() => {
                  setResponsive(true);
                  setActiveUser({ login: e.login, id: e.user_id });
                  getMessage(parseInt(e.status[0].user_id));
                }}
                key={index}
                button
              >
                <ListItemIcon>
                  <Avatar
                    alt={e.login}
                    src={`http://${config.SERVER_HOST}:1337${config.SERVER_IMGS}${e.img}`}
                  />
                </ListItemIcon>
                <ListItemText primary={e.login}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12}>
          <List
            style={
              responsive === false ? { display: "none" } : { display: "block" }
            }
            className={classes.messageArea}
          >
            {showMessage?.map((m, i) => {
              if (activeUser.id === m.user_id) {
                return (
                  <ListItem key={i}>
                    <Grid item xs={12}>
                      <Grid container>
                        <ListItemText
                          align="left"
                          primary={m.message}
                        ></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align="left"
                          secondary={moment(m.created_dat).format("LT")}
                        ></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              } else {
                return (
                  <ListItem key={i}>
                    <Grid item xs={12}>
                      <Grid container>
                        <ListItemText
                          align="right"
                          primary={m.message}
                        ></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align="right"
                          secondary={moment(m.created_dat).format("LT")}
                        ></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              }
            })}
          </List>
          <Grid
            style={
              responsive === false ? { display: "none" } : { padding: "20px" }
            }
            container
          >
            <Grid xs={10} item>
              <TextField
                autoComplete="off"
                disabled={activeUser.login ? false : true}
                variant="outlined"
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2} align="right">
              <Fab
                disabled={activeUser.login ? false : true}
                color="primary"
                aria-label="add"
                onClick={() => sendMessage(activeUser.login)}
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
