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
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import config from "../config";
import Moment from "react-moment";
import io from 'socket.io-client';

const Notification = () => {
  const classes = useStyles();
  const {
    auth: { token, login },
  } = useContext(AuthContext);
  const [ntfslist, setntfslist] = useState([]);
  const [limit, setlimit] = useState(0);

  function configSocket() {
    const socket = io.connect(`http://${config.SERVER_HOST}:1337`);
    socket.on('connect', (sock) => {
      socket.on('updatentfs', (mm) => {
        console.log("update ntfs");
        realTimeAdd();
      })
    })
  }

  useEffect(() => {
    if (token) {
      configSocket();
      axios
        .get(`http://${config.SERVER_HOST}:1337/notifications?limit=0`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setntfslist(res.data.data);
            setlimit(res.data.length);
          }
        });
    }
    // eslint-disable-next-line
  }, [token]);realTimeAdd

  function realTimeAdd() {
    if (token) {
      axios
        .get(`http://${config.SERVER_HOST}:1337/notifications?g_ntsid=`
        + ((ntfslist[0] != undefined) ? ntfslist[0].nts_id : 0), {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            let data = res.data.data.concat(ntfslist);
            setntfslist(data);
          }
        });
    }
  }

  return (
    <div>
    {ntfslist.map(e =>(<NotifComp e={e}/>))}
    </div>
  );
};
export default Notification;

const NotifComp = ({e}) => {
  const classes = useStyles();
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Grid className={classes.paper}>
        <Grid item xs={2}>
          <Avatar />
        </Grid>
        <Grid item xs={6}>
          <span>
            {e.message}
          </span>
        </Grid>
        <Grid item xs={2}>
          <span>50 minute</span>
        </Grid>
        <Grid item alignContent="center" xs={2}>
          <Button size="small" variant="contained" color="secondary">
            Delete
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "wrap",
    // alignItems: "center",
    // border: "black solid ",
    borderRadius: "50px",
    backgroundColor: "gris",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));



