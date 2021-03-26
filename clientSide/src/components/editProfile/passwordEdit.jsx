import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useForm from "../../Helpers/useForm";
import { useState, useContext } from "react";
import validatEditPassword from "../../Helpers/validatEditPassword";
import axios from "axios";
import { AuthContext } from "../../context/authcontext";
import config from "../../config";
import Swal from "sweetalert2";

const PasswordEdit = () => {
  const classes = useStyles();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [data, setData] = useState({
    oldpasswd: "",
    npasswd: "",
    rpasswd: "",
  });
  const [formErrors, setFormErrors] = useState({
    oldpasswd: "",
    npasswd: "",
    rpasswd: "",
  });
  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    validatEditPassword,
    data,
    setData,
    formErrors,
    setFormErrors
  );
  function submit() {
    const { npasswd, rpasswd, oldpasswd } = values;
    const { token } = authContext.auth;
    axios
      .post(
        `http://${config.SERVER_HOST}:1337/users/update/password`,
        { npasswd, rpasswd, oldpasswd },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.error === true) {
          var error = res.data.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        }else if(res.data.success === true){
          Swal.fire({
            icon: "success",
            title: "success",
            text: "Your Wassword Was Changed",
          });
          history.replace('/')
        }
      });
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="npasswd"
            label="Password"
            type="password"
            name="npasswd"
            defaultValue={values.npasswd}
            onChange={handleChange}
            error={errors.npasswd ? true : false}
            helperText={errors.npasswd && errors.npasswd}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="rpasswd"
            type="password"
            label="Confirm"
            name="rpasswd"
            defaultValue={values.rpasswd}
            onChange={handleChange}
            error={errors.rpasswd ? true : false}
            helperText={errors.rpasswd && errors.rpasswd}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="oldpasswd"
            type="password"
            label="oldPassword"
            name="oldpasswd"
            defaultValue={values.oldpasswd}
            onChange={handleChange}
            error={errors.oldpasswd ? true : false}
            helperText={errors.oldpasswd && errors.oldpasswd}
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
        Change It
      </Button>
    </form>
  );
};

export default PasswordEdit;

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
