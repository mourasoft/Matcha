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
import CreatableSelect from "react-select/creatable";
import * as pubIP from "public-ip";
import * as ipLocation from "iplocation";
import config from "../../config";
import AddIcon from "@material-ui/icons/Add";
import useForm from "../../Helpers/useForm";
import validateProfile from "../../Helpers/validationProfile";
import { axios } from "axios";
import { AuthContext } from "../../context/authcontext";

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

const Profile = () => {
  const authcontext = useContext(AuthContext);
  const classes = useStyles();
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });

  const [data, setData] = useState({
    gender: "female",
    preferences: "male",
    biography: "",
    birthday: "",
    tags: [],
  });

  const [formErrors, setFormErrors] = useState({
    birthday: "",
    bio: "",
  });

  // position from navigateur
  const showPosition = useCallback(async (pos) => {
    const { latitude, longitude } = pos.coords;
    setLocation({ lat: latitude, lon: longitude });
    // console.log(lat,lon);
  }, []);
  //  position from ipV4
  const getLocation = useCallback(async (err) => {
    if (err.code) {
      try {
        const publicLoction = await pubIP.v4();
        const { latitude, longitude } = await ipLocation(publicLoction);
        // console.log(latitude, longitude, country);
        setLocation({ lat:latitude, lon:longitude });
        console.log("ip", location);
      } catch (err) {}
    }
  }, []);
  async function getResponse({ lat, lon }, to) {
    try {
      const res = axios.get(
        `http://${config.SERVER_HOST}:1337/position`,
        {
          lat,
          lon,
        },
        {
          headers: {
            Authorization: to,
          },
        }
      );
      return res;
    } catch (e) {
      console.log(e);
    }
  }
  // to send localisation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, getLocation);
      // console.log(location);
      // send data to api
    }
    console.log("localisation in useeffect", authcontext.auth.token);
    const position = async () => {
      const { position } = await getResponse(location, authcontext.auth.token);
      console.log();
    };
  }, []);

  //  useForm hook
  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    validateProfile,
    data,
    setData,
    formErrors,
    setFormErrors
  );

  // upload picture profile

  const [img, setImg] = useState({
    img: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
  });

  const photoUpload = (e) => {
    const name = e.target.name;
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    // console.log(e.target.files[0]);
    reader.onload = () => {
      setImg({
        ...img,
        [name]: reader.result,
      });
      // console.log(img);
      // console.log(img);
    };
    reader.readAsDataURL(file);
    // console.log(img);
  };
  function submit() {
    // console.log(values);
    // console.log("im here bro");
  }

  return (
    <Container component="main" maxWidth="xs">
      <div>
        {location.lat}
        {"   "}
        {location.lon}
      </div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                error={errors.bio ? true : false}
                helperText={errors.bio && errors.bio}
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
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                error={errors.birthday ? true : false}
                helperText={errors.birthday && errors.birthday}
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
                  // onChange={}
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
              <div className={classes.Profile}>
                <label for="avatar-image-upload">
                  <Avatar
                    // alt="Remy Sharp"
                    src={img.img}
                    style={{ cursor: "pointer" }}
                    className={classes.large}
                    // onClick={handlProfileUpdate}
                  />
                </label>
                <input
                  name="img"
                  accept="image/*"
                  hidden
                  id="avatar-image-upload"
                  type="file"
                  onChange={photoUpload}
                />
              </div>
            </FormControl>
            <Grid item xs={12} className={classes.gallery}>
              {/* <div> */}
              <label for="img1">
                <Avatar
                  src={img.img1}
                  variant="square"
                  className={classes.large}
                >
                  <AddIcon />
                </Avatar>
              </label>
              <input
                name="img1"
                accept="image/*"
                hidden
                id="img1"
                type="file"
                onChange={photoUpload}
              />
              <label for="img2">
                <Avatar
                  src={img.img2}
                  variant="square"
                  className={classes.large}
                >
                  <AddIcon />
                </Avatar>
              </label>
              <input
                name="img2"
                accept="image/*"
                hidden
                id="img2"
                type="file"
                onChange={photoUpload}
              />
              {/* image3 */}
              <label for="img3">
                <Avatar
                  src={img.img3}
                  variant="square"
                  className={classes.large}
                >
                  <AddIcon />
                </Avatar>
              </label>
              <input
                name="img3"
                accept="image/*"
                hidden
                id="img3"
                type="file"
                onChange={photoUpload}
              />
              {/* image4 */}
              <label for="img4">
                <Avatar
                  src={img.img4}
                  variant="square"
                  className={classes.large}
                >
                  <AddIcon />
                </Avatar>
              </label>
              <input
                name="img4"
                accept="image/*"
                hidden
                id="img4"
                type="file"
                onChange={photoUpload}
              />

              {/* </div> */}
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
