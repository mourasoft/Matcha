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

import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import config from "../config";

const Notification = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid className={classes.paper}>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        >
          <Avatar />
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            // backgroundColor: "yellow",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>
            has delet you from her page ok jhjhsd jhjhjhs jhj asdjh adsd j
          </span>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            // backgroundColor: "yellow",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>50 minute</span>
        </Grid>
        <Grid
          item
          alignContent="center"
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            // backgroundColor: "green",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Button size="small" variant="contained" color="secondary">
            Delete
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Notification;

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
