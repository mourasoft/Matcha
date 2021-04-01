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

  // Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect, useContext, useCallback } from "react";
import * as pubIP from "public-ip";
import * as ipLocation from "iplocation";
import config from "../../config";
import AddIcon from "@material-ui/icons/Add";
import useForm from "../../Helpers/useForm";
import validateProfile from "../../Helpers/validationProfile";
import axios from "axios";
import { AuthContext } from "../../context/authcontext";
import { Menu } from "../../Helpers/Tags";
import Creatable from "react-select/creatable";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
function getInstance(token) {
  return axios.create({
    headers: { Authorization: `${token}` },
  });
}
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
    [theme.breakpoints.down(780)]: {
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
  },
}));

const Profile = () => {
  const authcontext = useContext(AuthContext);
  const classes = useStyles();
  let unmount = false;
  // set location
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });
  const history = useHistory();
  // set data
  const [data, setData] = useState({
    gender: "1",
    preferences: "2",
    biography: "",
    birthday: "",
    city: "Unknown",
  });
  // set errors
  const [formErrors, setFormErrors] = useState({
    birthday: "",
    bio: "",
  });
  // setTag
  const [tag, setTag] = useState([]);
  // upload picture profile
  const [img, setImg] = useState([]);
  // position from navigateur
  const showPosition = useCallback(async (pos) => {
    const { latitude, longitude } = pos.coords;
    if (!unmount) setLocation({ lat: latitude, lon: longitude });
    // console.log(lat,lon);
  }, []);
  //  position from ipV4
  const getLocation = useCallback(async (err) => {
    if (err.code) {
      try {
        const publicLoction = await pubIP.v4();
        const { latitude, longitude } = await ipLocation(publicLoction);
        if (!unmount) setLocation({ lat: latitude, lon: longitude });
      } catch (err) {}
    }
  }, []);
  // to set localisation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, getLocation);
    }
    return () => (unmount = true);
  }, []);
  console.log(location);
  //  useForm hook
  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    validateProfile,
    data,
    setData,
    formErrors,
    setFormErrors
  );
  console.log(location);
  const photoUpload = (e) => {
    const name = e.target.name;
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file.size !== 0) {
      reader.onload = () => {
        setImg({
          ...img,
          [name]: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeTag = (e, a) => {
    setTag(e);
    // setTag([...tag, e.value]);
  };
  // let val = tag?.map((test) => {
  //   if (
  //     test.value.length > 1 &&
  //     test.value.length < 20 &&
  //     /^[a-zA-Z\s.0-9_-]+$/.test(test.value)
  //   ) {
  //     test = test.value;
  //     return test;
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "tag Not valid",
  //     });
  //     return "";
  //   }
  // });
  // console.log(val);
  const isValidNewOption = (inputValue, selectValue) =>
    inputValue.length > 0 && selectValue.length < 5;

  function submit() {
    let val = tag?.map((test) => {
      if (
        test.value.length > 1 &&
        test.value.length < 20 &&
        /^[a-zA-Z\s.0-9_#-]+$/.test(test.value)
      ) {
        test = test.value;
        return test;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "tag Not valid",
        });
        return "";
      }
    });
    if (val.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Choose a Tag ",
      });
    } else if (img.img === undefined) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Choose a Picture ",
      });
    } else {
      const { token } = authcontext.auth;
      const { gender, city, birthday, preferences, biography } = values;
      const { lat, lon } = location;
      let imgs = Object.values(img);
      imgs.forEach((i) => {
        getInstance(token)
          .post(`http://${config.SERVER_HOST}:1337/images`, { img: i })
          .then((res) => {
            console.log(res);
          });
      });
      getInstance(token)
        .post(`http://${config.SERVER_HOST}:1337/infos`, {
          city,
          birthday,
          gendre: gender,
          sexpref: preferences,
          desc: biography,
        })
        .then((res) => {
          console.log(res);
        });

      getInstance(token)
        .post(
          `http://${config.SERVER_HOST}:1337/tags`,
          { tags: JSON.stringify(val) },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
      getInstance(token)
        .post(`http://${config.SERVER_HOST}:1337/position`, { lat, lon })
        .then((res) => {
          console.log(res);
        });

      history.replace("/");
    }
  }

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
                  value="1"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="2" control={<Radio />} label="Male" />
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
                  value="1"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="2" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="3"
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
              {/* <FormControl fullWidth> */}
              <FormLabel required component="legend">
                Tags
              </FormLabel>
              <Creatable
                components={{ Menu }}
                isMulti
                name="tags"
                // onCreateOption={handleCreate}
                isValidNewOption={isValidNewOption}
                onChange={handleChangeTag}
              />
            </Grid>

            {/* Profile picture */}
            <FormControl fullWidth>
              <FormLabel required component="legend">
                profile Picture
              </FormLabel>
              <div className={classes.Profile}>
                <label htmlFor="img">
                  <Avatar
                    src={img.img}
                    style={{ cursor: "pointer" }}
                    className={classes.large}
                  />
                </label>
                <input
                  name="img"
                  accept="image/*"
                  hidden
                  id="img"
                  type="file"
                  onChange={photoUpload}
                />
              </div>
            </FormControl>
            {/* all other picture */}
            <Grid item xs={12} className={classes.gallery}>
              {/* picture 1 */}
              <label htmlFor="img1">
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
              <label htmlFor="img2">
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
              <label htmlFor="img3">
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
              <label htmlFor="img4">
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
            Valid
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Profile;
