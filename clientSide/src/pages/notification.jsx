import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import config from "../config";
const Notification = () => {
  const classes = useStyles();
  const {
    auth: { token, login },
  } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://${config.SERVER_HOST}:1337/notifications?limit=0`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res);
          //   if (result.data.success) {
          //     setntfslength(result.data.length);
          //     changeIformation(() => {
          //       const arr = information;
          //       setallnotification(result.data.data.length);
          //       for (let i = 0; i < result.data.data.length; i++)
          //         arr.push({
          //           firstname: result.data.data[i].first_name,
          //           lastname: result.data.data[i].last_name,
          //           login: result.data.data[i].login,
          //           message: result.data.data[i].message,
          //           date: timeSince(new Date(result.data.data[i].creat_dat)),
          //           image:
          //             result.data.data[i].img !== undefined
          //               ? "http://" +
          //                 config.SERVER_HOST +
          //                 ":" +
          //                 config.SERVER_PORT +
          //                 config.SERVER_IMGS +
          //                 result.data.data[i].img
          //               : userprofil,
          //           nts_id: result.data.data[i].nts_id,
          //         });
          //       return arr;
          //     });
          //   }
        });
    }
    // eslint-disable-next-line
  }, [token]);
  return (
    <div>
      <NotifComp />
      <NotifComp />
      <NotifComp />
    </div>
  );
};
export default Notification;

const NotifComp = () => {
  const classes = useStyles();
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Grid className={classes.paper}>
        <Grid item xs={2}>
          <Avatar />
        </Grid>
        <Grid item xs={6}>
          <span>
            has delet you from her page ok jhjhsd jhjhjhs jhj asdjh adsd j
          </span>
        </Grid>
        <Grid item xs={2}>
          <span>50 minute</span>
        </Grid>
        <Grid item alignContent="center" xs={2}>
          <Button size="small" variant="contained" color="secondary">
            Delete
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "wrap",
    // alignItems: "center",
    // border: "black solid ",
    borderRadius: "50px",
    backgroundColor: "gris",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));
