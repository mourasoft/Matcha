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
  Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import AddIcon from "@material-ui/icons/Add";
import test from "../../images/1.png";
import UpBtn from "../incl/upload";
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
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  Profile: {
    flexBasis: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  upload: {
    display: "none",
  },
  buttonUpload: {
    // display: "flex",
  },
}));
const handleCreateOption = (v, a) => {
  console.log(v);
  console.log(a);
};
const Profile = () => {
  const classes = useStyles();
  const [uploadImg, setuploadImg] = useState([]);
  // localisation Data

  const [location, setLocation] = useState({
    lng: null,
    lat: null,
  });
  // form Data
  const [data, setData] = useState({
    gender: "female",
    preferences: "male",
    biography: "",
    birthday: "",
    tags: [],
    img: [],
    location: { lng: "", lat: "" },
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    // console.log("the name of value >>>>>", name, "the value is ", value);
  };
  // useEffect(() => {
  //   console.log(navigator.geolocation);
  //   console.log(data.gender);
  // });
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ ...data, ...location });
  };
  // function valudare(img)
  // {
  //   djdaajkdaddkd adhaddjjdahjad adjhadjkajadddkdhadhdahjadhad
  // }
  // function upload (img)
  // {
  //   axios.post('laccacacj/fajfhaj', dadyadyaddy, {image:img}).then(res)
  //   {
  //     if (res.data === "done")
  //     {
  //       adhadjkadad {

  //       }
  //       let val = {
  //         image : img;
  //       }
  //       setduadu(uploadImg.concat(val))
  //     }
  //     else if (res.data === "no valid")
  //     {
  //       swal.fire()
  //     }
  //   }
  // }
  useEffect(() => {
    // Update the document title using the browser API
    setuploadImg([
      {
        image: test,
      },
    ]);
  }, []);
  const handleUpdat = (e) => {
    console.log(e);
  };
  const handlProfileUpdate = (e) => {
    console.log(e);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabel required component="legend">
                Gender
              </FormLabel>
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
              <FormLabel required component="legend">
                Sexual preferences
              </FormLabel>
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
              {/* <TextField
                variant="outlined"
                name="tags"
                required
                fullWidth
                id="tags"
                label="Tags"
                type="text"
                name="tags"
              /> */}
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
              <FormControl fullWidth>
                <FormLabel required error component="legend">
                  Tags
                </FormLabel>
                <CreatableSelect
                  isClearable
                  isMulti
                  onChange={handleCreateOption}
                />
                <FormHelperText error id="my-helper-text">
                  We'll never share your email.
                </FormHelperText>
              </FormControl>
            </Grid>
            <FormControl fullWidth>
              <FormLabel required component="legend">
                profile Picture
              </FormLabel>
              <UpBtn />
              <p>tach</p>
              {/* <div className={classes.Profile}>
                {uploadImg?.map((i, index) => (
                  <div key={index}>
                    <Avatar
                      alt="Remy Sharp"
                      src={i.image}
                      className={classes.large}
                      onClick={handlProfileUpdate}
                    />
                  </div>
                ))}
              </div> */}
              <FormHelperText error id="my-helper-text">
                required
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.buttonUpload}>
              <input
                accept="image/*"
                className={classes.upload}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
            </FormControl>
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
