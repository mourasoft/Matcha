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

  function sendMessage(toLogin) {
    if (message.trim() === "" || message.length > 100) {
      console.log("msg kbiir");
    } else {
      getInstance(token).post(`http://${config.SERVER_HOST}:1337/inbox`, {
        login: toLogin,
        msg: message,
      });
    }
  }
  useEffect(() => {
    getInstance(token)
      .get(`http://${config.SERVER_HOST}:1337/inbox/users`)
      .then((res) => {
        setUserOnline(res.data);
      });
  }, [token]);
  console.log(message);
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
              <ListItem key={index} button>
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
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
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
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
            </ListItem>
            <ListItem key="3">
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
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                variant="outlined"
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => sendMessage("Mouras")}
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
