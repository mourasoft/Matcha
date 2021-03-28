import { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Avatar,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import AddIcon from "@material-ui/icons/Add";
import { Menu } from "../../Helpers/Tags";
import Creatable from "react-select/creatable";
import useForm from "../../Helpers/useForm";
import validatProfileEdit from "../../Helpers/validatProfileEdit";
import list from "../../City.json";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import config from "../../config";
import axios from "axios";
import { AuthContext } from "../../context/authcontext";
import { useContext } from "react";
import Swal from "sweetalert2";
import DeleteIcon from "@material-ui/icons/Delete";
// import PublishIcon from "@material-ui/icons/Publish";

const ProfileEdite = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [tag, setTag] = useState({
    act: [""],
    ina: [""],
  });
  const [img, setImg] = useState([]);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    login: "",
    email: "",
    gender: "",
    preferences: "",
    biography: "",
    birthday: "",
    city: "",
  });
  const [formErrors, setFormErrors] = useState({
    fname: "",
    lname: "",
    login: "",
    email: "",
    biography: "",
    birthday: "",
  });
  useEffect(() => {
    // console.log(authContext.auth.login);
    if (
      typeof authContext.auth.token === "string" &&
      typeof authContext.auth.login === "string"
    ) {
      axios
        .get(
          `http://${config.SERVER_HOST}:1337/infos?login=${authContext.auth.login}`,
          {
            headers: {
              Authorization: authContext.auth.token,
            },
          }
        )
        .then((res) => {
          // console.log(res.data.data[0]);
          if (res.data.success) {
            const { birthday, city, desc, sex_pref, gendre } = res.data.data[0];
            setData((old) => ({
              ...old,
              birthday: birthday,
              city: city,
              biography: desc,
              gender: gendre === "female" ? "1" : "2",
              preferences:
                sex_pref === "female" ? "1" : sex_pref === "male" ? "2" : "1",
            }));
          }
        });
      axios
        .get(
          `http://${config.SERVER_HOST}:1337/users?login=${authContext.auth.login}`,
          {
            headers: {
              Authorization: authContext.auth.token,
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            const { email, first_name, last_name, login } = res.data.data[0];
            setData((old) => ({
              ...old,
              fname: first_name,
              lname: last_name,
              email: email,
              login: login,
            }));
          }
        });
      axios
        .get(
          `http://${config.SERVER_HOST}:1337/tags?login=${authContext.auth.login}`,
          {
            headers: {
              Authorization: authContext.auth.token,
            },
          }
        )
        .then((res) => {
          let active = [];
          let inactive = [];
          res.data.data.filter((e) => {
            if (e.state === "active") {
              active.push({ label: e.tag, value: e.tag });
              return "";
            } else {
              inactive.push({ label: e.tag, value: e.tag });
              return "";
            }
          });
          setTag((old) => ({
            ...old,
            act: active,
            ina: inactive,
          }));
        });
      axios
        .get(
          `http://${config.SERVER_HOST}:1337/images?login=${authContext.auth.login}`,
          {
            headers: {
              Authorization: authContext.auth.token,
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            console.log(res.data.data);
            let Imgs = [];
            res.data.data.forEach((e) => {
              Imgs.push(e.image_path);
            });
            setImg((old) => [...old, ...Imgs]);
          }
        });
    }
    // axios.getclg
  }, [authContext.auth.token, authContext.auth.login]);
  const handleChangeTag = (e, a) => {
    setTag((old) => ({ ...old, act: e }));
  };
  // console.log(val);
  //  console.log("value",val);
  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    validatProfileEdit,
    data,
    setData,
    formErrors,
    setFormErrors
  );
  const filterOptions = createFilterOptions({
    limit: 10,
  });
  // console.log("test", tag.act);
  function submit() {
    // console.log("2342343");
    let flag = true;
    if (tag.act) {
      // console.log(tag.act);
      let val = tag.act?.map((test, iKey) => {
        if (
          test?.value?.length > 1 &&
          test?.value?.length < 20 &&
          /^[a-zA-Z\s.0-9_-]+$/.test(test.value)
        ) {
          test = test.value;
          return test;
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "tag Not valid",
          });
          flag = false;

          return "";
        }
      });
      if (val.length < 1) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Choose a Tag ",
        });
      }
    }

    if (flag) {
      // axios calls
    }
  }
  const photoUpload = (e) => {
    // const name = e.target.name;
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    // console.log(e.target.files[0]);
    reader.onload = () => {
      // const img = new Image();
      setImg((oldImgs) => {
        if (oldImgs.length === 5) return oldImgs;
        return [...oldImgs, reader.result];
      });
    };
    reader.readAsDataURL(file);
  };
  function deleteFn(imgName) {
    let data = img.filter((image) => image !== imgName);
    setImg([...data]);
    axios
      .delete(`http://${config.SERVER_HOST}:1337/images`, {
        headers: {
          Authorization: authContext.auth.token,
        },
        data: {
          name: imgName,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }

  // console.log("image", img);
  return (
    <>
      <form
        className={classes.form}
        // autoComplete="off"
        onSubmit={handleSubmit}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="fname"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={data.fname}
              onChange={handleChange}
              error={errors.fname ? true : false}
              helperText={errors.fname && errors.fname}
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
              value={data.lname}
              onChange={handleChange}
              error={errors.lname ? true : false}
              helperText={errors.lname && errors.lname}
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
              value={values.login}
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
              id="email"
              label="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email}
            />
          </Grid>
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
              <FormControlLabel value="1" control={<Radio />} label="Female" />
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
              <FormControlLabel value="1" control={<Radio />} label="Female" />
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
              error={errors.biography ? true : false}
              helperText={errors.biography && errors.biography}
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
            <FormLabel className={classes.labeltag} required component="legend">
              Tags
            </FormLabel>
            <Creatable
              components={{ Menu }}
              isMulti
              name="tags"
              options={tag.ina}
              // value={tag.act}
              value={tag.act}
              // isValidNewOption={isValidNewOption}
              onChange={handleChangeTag}
            />
          </Grid>

          <Grid item xs={12}>
            {/* <FormControl fullWidth> */}
            {/* <FormLabel className={classes.labeltag} required component="legend">
              City
            </FormLabel> */}
            <Autocomplete
              id="city"
              // value={props.city[props.cityOwner]}
              name="city"
              options={list}
              disableClearable
              // getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  name="city"
                  required
                  variant="outlined"
                />
              )}
              onChange={(event, newValue) => {
                setData({ ...data, city: newValue });
              }}
              value={data.city}
              filterOptions={filterOptions}
            />
          </Grid>

          {/* Profile picture */}
          <FormControl fullWidth>
            <FormLabel className={classes.labeltag} required component="legend">
              profile Picture
            </FormLabel>
            <div className={classes.Profile}>
              <label htmlFor="img">
                <Avatar
                  // src={
                  //   img.toAdd[0] &&
                  //   `http://${config.SERVER_HOST}:1337${config.SERVER_IMGS}${img.toAdd[0]}`
                  // }
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
            {img?.map((imagePro, index) => (
              // <div key={index}
              <div key={index}>
                <DeleteIcon
                  // color={error}
                  onClick={() => deleteFn(imagePro)}
                ></DeleteIcon>
                <label htmlFor={index}>
                  <Avatar
                    src={
                      imagePro.indexOf("data:") === 0
                        ? imagePro
                        : `http://${config.SERVER_HOST}:1337${config.SERVER_IMGS}${imagePro}`
                    }
                    variant="square"
                    className={classes.large}
                  ></Avatar>
                </label>
                {/* <input
                  name={index}
                  accept="image/*"
                  hidden
                  id={index}
                  type="file"
                  onChange={photoUpload}
                /> */}
              </div>
            ))}
            {/* </div>; */}
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
          Change It
        </Button>
      </form>
    </>
  );
};
// console.log(list);
export default ProfileEdite;

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
  labeltag: {
    margin: "13px",
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
