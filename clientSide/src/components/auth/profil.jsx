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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
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
}));

const Profile = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    gender: "female",
    preferences: "male",
    biography: "",
    birthday: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log("the name of value >>>>>", name, "the value is ", value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(data.gender);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                className={classes.radio}
                aria-label="gender"
                name="gender"
                value={data.gender}
                onChange={handlechange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="bisexual"
                  control={<Radio />}
                  label="Bisexual"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Sexual preferences</FormLabel>
              <RadioGroup
                className={classes.radio}
                aria-label="gender"
                name="preferences"
                value={data.preferences}
                onChange={handlechange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="bisexual"
                  control={<Radio />}
                  label="Bisexual"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                rows={6}
                multiline
                name="biography"
                label="Biography"
                type="text"
                id="Biography"
                value={data.biography}
                onChange={handlechange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="tags"
                label="Tags"
                type="text"
                name="tags"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="date"
                margin="normal"
                fullWidth
                required
                label="Birthday"
                name="birthday"
                type="date"
                value={data.birthday}
                onChange={handlechange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CreatableSelect
                isMulti
                label="Mouras"
                // onChange={this.handleChange}
                // options={colourOptions}
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
            Next
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Profile;
