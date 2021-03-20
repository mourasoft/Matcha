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
import useForm from "../../Helpers/useForm";
import { useState } from "react";
import validateSignUp from "../../Helpers/validationSignUp";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';

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

const SignUp = () => {
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    login: "",
    passwd: "",
    rpasswd: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirm: "",
  });

  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    validateSignUp,
    data,
    setData,
    formErrors,
    setFormErrors
  );

  function submit() {
    axios.post("http://10.12.6.3:1337/users/signup", data).then((res) => {
      if (res) {
  
        if (res.data.error === true) {
          var error = res.data.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        }
        else if(res.data.success === true){
          Swal.fire({
            icon: "success",
            title: "success",
            text: "Your Account Has Ben Created check your Email",
          });
          history.replace('/signin')
        }
      }
    });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                defaultValue={values.firstName}
                onChange={handleChange}
                error={errors.firstName ? true : false}
                helperText={errors.firstName && errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lname"
                defaultValue={values.lastName}
                onChange={handleChange}
                error={errors.lastName ? true : false}
                helperText={errors.lastName && errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                defaultValue={values.email}
                onChange={handleChange}
                error={errors.email ? true : false}
                helperText={errors.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="UserName"
                name="login"
                defaultValue={values.userName}
                onChange={handleChange}
                error={errors.userName ? true : false}
                helperText={errors.usertName && errors.usertName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwd"
                label="Password"
                type="password"
                id="password"
                defaultValue={values.password}
                onChange={handleChange}
                error={errors.password ? true : false}
                helperText={errors.password && errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="confirm"
                label="Confirm"
                type="password"
                name="rpasswd"
                defaultValue={values.confirm}
                onChange={handleChange}
                error={errors.confirm ? true : false}
                helperText={errors.confirm && errors.confirm}
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
