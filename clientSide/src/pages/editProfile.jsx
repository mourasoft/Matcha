import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  Button,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import PasswordEdit from "../components/editProfile/passwordEdit";
import ProfileEdite from "../components/editProfile/profilEdit";
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
}));

const EditProfile = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);

  return (
    <Container component="main" maxWidth="xs">
      {/* <div>{location.lon}</div> */}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          {page ? "Edit Profile" : "Change Password"}
        </Typography>
        <Grid spacing={6} justify="center" container>
          <Grid item>
            <Button
              onClick={() => setPage(1)}
              variant="contained"
              color="primary"
            >
              profile
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setPage(0)}
              variant="contained"
              color="primary"
            >
              Password
            </Button>
          </Grid>
        </Grid>
        {page === 1 && <ProfileEdite />}
        {page === 0 && <PasswordEdit />}
      </div>
    </Container>
  );
};

export default EditProfile;
