import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
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

function getInstance(token) {
  return axios.create({
    headers: { Authorization: `${token}` },
  });
}
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
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
});

const Chat = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const {
    auth: { token, login },
  } = authContext;
  const [userOnline, setUserOnline] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState([]);
  const [activeUser, setActiveUser] = useState({
    login: "",
    id: "",
  });

  function getMessage(user) {
    getInstance(token)
      .get(`http://${config.SERVER_HOST}:1337/inbox/messages?user_id=${user}`)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setShowMessage(res.data.data);
        }
      });
  }
  console.log(showMessage);
  function sendMessage(toLogin) {
    if (message.trim() === "" || message.length > 100) {
      console.log("msg kbiir");
      setMessage("");
    } else {
      getInstance(token)
        .post(`http://${config.SERVER_HOST}:1337/inbox`, {
          login: toLogin,
          msg: message,
        })
        .then((res) => console.log(res));
      setMessage("");
    }
  }

  useEffect(() => {
    getInstance(token)
      .get(`http://${config.SERVER_HOST}:1337/inbox/users`)
      .then((res) => {
        setUserOnline(res.data);
      });
  }, [token]);
  console.log(activeUser.id);
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            {userOnline?.map((e, index) => (
              <ListItem
                onClick={() => {
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
        <Grid item xs={9}>
          <List className={classes.messageArea}>
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
                          secondary="09:30"
                        ></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              }
            })}
            {/* <ListItem key="1">
              <Grid item xs={12}>
                <Grid container>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem> */}
            {/* <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem> */}
            {/* <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem> */}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
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
            <Grid xs={1} align="right">
              <Fab
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
