import {
  Container,
  Typography,
  Button,
  //   Avatar,
  //   Badge,
  //   RadioGroup,
  //   FormLabel,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  //   Slider,
  //   Radio,
  //   FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import config from "../../config";
const CardProfile = (props) => {
  const classes = useStyles();
  const { awaykm, age, image, fameRat, infos } = props.data;
  //   console.log(args);
  return (
    <Card
      onClick={(e) => {
        console.log(e);
      }}
      className={classes.root}
    >
      <CardActionArea className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`http://${config.SERVER_HOST}:1337${config.SERVER_IMGS}${image}`}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.cardCont}>
          <Typography gutterBottom variant="h5" component="h2">
            {infos[0].first_name + " "} {infos[0].last_name}
          </Typography>
          {/* <Typography gutterBottom variant="h5" component="h2">
              {"@"+infos[0].login} 
            </Typography> */}
          <Typography variant="h6" component="h2">
            {parseInt(awaykm)} KM
          </Typography>
          <Typography variant="h6" component="h2">
            {age} Age
          </Typography>
          <Typography variant="h6" component="h2">
            {infos[0].gendre}
          </Typography>
          <Typography variant="h6" component="h2">
            {infos[0].city}
          </Typography>
          <Rating name="read-only" value={fameRat} readOnly />
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardCont}>
        <Button size="small" color="primary">
          View Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardProfile;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "1%",
    // marginTop: theme.spacing(1),
    // marginLeft: theme.spacing(1),

    [theme.breakpoints.down(480)]: {
      // display: "flex",
      //   marginTop: theme.spacing(2),
      //   marginLeft: theme.spacing(0),
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
  },
  radio: {
    flexDirection: "row",
    justifyContent: "center",
    // flexDirection: "row",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  // alignItems: "center",
  // width: "320px",
  // border: "black solid ",
  // borderRadius: "50px",
  // backgroundColor: "gris",

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
