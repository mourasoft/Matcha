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
import useForm from "../../Helpers/useForm";
import validateSignIn from "../../Helpers/validationSignIn";
import { useState } from "react";

// const theme = createMuiTheme({
// 	palette: {
// 		primary: {
// 			main: "#556cd6",
// 		},
// 		secondary: {
// 			main: "#19857b",
// 		},
// 		error: {
// 			main: "#38a2e3",
// 		},
// 		background: {
// 			default: "#fff",
// 		},
// 	},
// });

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //   border: "black solid "
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

const SignIn = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    login: "",
    passwd: "",
  });
  const [formErrors, setFormErrors] = useState({
    login: "",
    passwd: "",
  });
  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    validateSignIn,
    data,
    setData,
    formErrors,
    setFormErrors
  );
  function submit() {
    console.log("clicked");
    axios.post("http://10.12.6.3:1337/users/signin", data).then((res) => {
      if (res) {
        console.log(res);
        if (res.data.error === true) {
          var error = res.data.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        }
        //   else if(res.data.success === true){
        // 	Swal.fire({
        // 	  icon: "success",
        // 	  title: "success",
        // 	  text: "Your Account Has Ben Created check your Email",
        // 	});
        // 	history.replace('/signin')
        //   }
      }
    });
    console.log("clicked");
  }
  //   console.log(values);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="login"
                label="UserName"
                name="login"
                defaultValue={values.login}
                onChange={handleChange}
                error={errors.login ? true : false}
                helperText={errors.login && errors.login}
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
            <Grid item>
              <Link to="/forgot" variant="body2">
                Forgot Password?
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* Footer */}
      {/* <Box mt={5}>
	  <Copyright />
	</Box> */}
    </Container>
  );
};

export default SignIn;
