import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Badge,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Slider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import ProfileIcon from "@material-ui/icons/PersonOutlineOutlined";
import { useState } from "react";
import Profile from "../components/auth/profil";

const ProfilePAdge = () => {
  const classes = useStyles();
  const [value, setValue] = useState([20, 37]);
  function valuetext(value) {
    return `${value}°C`;
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {value}
      <Container className={classes.all} maxWidth="sl">
        <span>Filter</span>
        <div className={classes.root}>
          <Typography id="range-slider" gutterBottom>
            Temperature range
          </Typography>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </div>
      </Container>
      <Container className={classes.all} maxWidth="sl">
        <Card
          onClick={(e) => {
            console.log(e);
          }}
          className={classes.root}
        >
          <CardActionArea className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
              title="Contemplative Reptile"
            />
            <CardContent className={classes.cardCont}>
              <Typography gutterBottom variant="h5" component="h2">
                FirstName and LastName
              </Typography>
              <Typography variant="h6" component="h2">
                2540 KM
              </Typography>
              <Typography variant="h6" component="h2">
                20 Age
              </Typography>
              <Typography variant="h6" component="h2">
                khouribga
              </Typography>
              <Rating name="read-only" value={3} readOnly />
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardCont}>
            <Button size="small" color="primary">
              View Profile
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default ProfilePAdge;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),

    [theme.breakpoints.down(480)]: {
      // display: "flex",
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(0),
      // alignItems: "center",
    },
  },
  all: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",

    [theme.breakpoints.down(480)]: {
      display: "flex",
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(0),
      alignItems: "center",
    },

    // alignItems: "center",
    // width: "320px",
    // border: "black solid ",
    // borderRadius: "50px",
    // backgroundColor: "gris",
  },
  // paper: {
  //   marginTop: theme.spacing(4),
  //   marginLeft: theme.spacing(4),
  //   padding: theme.spacing(2),
  //   display: "flex",
  //   flexDirection: "column",

  //   alignItems: "center",
  //   width: "320px",
  //   border: "black solid ",
  //   borderRadius: "50px",
  //   backgroundColor: "gris",
  // },
  media: {
    height: 190,
  },
  // large: {
  //   width: theme.spacing(10),
  //   height: theme.spacing(10),
  // },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  cardCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
