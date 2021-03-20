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
import { useState } from "react";
import validateForgot from "../../Helpers/validationForgot";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

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
const Forgot = () => {
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState({
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    validateForgot,
    data,
    setData,
    formErrors,
    setFormErrors
  );
  function submit() {
    // console.log(object);
    axios
      .post("http://10.12.6.3:1337/users/reset/password", data)
      .then((res) => {
        console.log(res);
        if (res.data.success === false) {
          var error = res.data.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        } else if (res.data.success === true) {
          // console.log(res);
          Swal.fire({
            icon: "success",
            title: "success",
            text: "Check Your Email To Reset Password",
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
                id="email"
                label="Email"
                name="email"
                defaultValue={values.email}
                onChange={handleChange}
                error={errors.email ? true : false}
                helperText={errors.email && errors.email}
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
export default Forgot;
