import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormHelperText,
  // Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect, useCallback, useContext } from "react";
import * as pubIP from "public-ip";
import * as ipLocation from "iplocation";
import config from "../config";
import AddIcon from "@material-ui/icons/Add";
import useForm from "../Helpers/useForm";
import validateProfile from "../Helpers/validationProfile";
import Axios from "axios";
import { AuthContext } from "../context/authcontext";
import { Menu } from "../Helpers/Tags";
import Creatable from "react-select/creatable";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  radio: {
    flexDirection: "row",
    justifyContent: "center",
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "6px",
  },
  Profile: {
    flexBasis: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gallery: {
    display: "flex",
    justifyContent: "space-around",
    ["@media (max-width:780px)"]: {
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
  },
}));

const EditProfile = () => {
  const classes = useStyles();
  // const [page, setPAge] = useContext({page: 1});
  const handleClickPage = ((e)=>{
    console.log("clicked");
    console.log(e);
  })
  return (
    <Container component="main" maxWidth="xs">
      {/* <div>{location.lon}</div> */}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Grid spacing={6} justify="center" container>
          <Grid item>
            <Button onClick={handleClickPage} variant="contained" color="primary">
              profile
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleClickPage} variant="contained" color="primary">
              Password
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default EditProfile;
