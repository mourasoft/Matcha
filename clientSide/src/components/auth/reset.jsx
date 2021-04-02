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
import useForm from "../../Helpers/useForm";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import validateReset from "../../Helpers/validationReset";
import { useHistory, useParams } from "react-router-dom";
import config from "../../config";

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
}));
const Reset = () => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState({
    passwd: "",
    rpasswd: "",
  });
  const [formErrors, setFormErrors] = useState({
    passwd: "",
    rpasswd: "",
  });
  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    validateReset,
    data,
    setData,
    formErrors,
    setFormErrors
  );

  useEffect(() => {
    if (login === undefined || key === undefined) {
      history.push("/signin");
    }
    // eslint-disable-next-line
  }, [history]);

  const { login, key } = useParams();

  function submit() {
    axios
      .post(
        `http://${config.SERVER_HOST}:1337/users/changepasswd?login=${login}&key=${key}`,
        data
      )
      .then((res) => {
        if (res.data.success === false) {
          var error = res.data.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        } else if (res.data.success === true) {
          Swal.fire({
            icon: "success",
            title: "success",
            text: "Password Changed successfully",
          });
          history.replace("/signin");
        }
      });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Account recovery
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="passwd"
                defaultValue={values.passwd}
                onChange={handleChange}
                error={errors.passwd ? true : false}
                helperText={errors.passwd && errors.passwd}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="confrim"
                type="password"
                label="Confirm"
                name="rpasswd"
                defaultValue={values.rpasswd}
                onChange={handleChange}
                error={errors.rpasswd ? true : false}
                helperText={errors.rpasswd && errors.rpasswd}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Recover It
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default Reset;
