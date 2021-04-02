import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authcontext";
import config from "../config";
import Moment from "react-moment";
import io from "socket.io-client";
import useInfiniteScroll from "react-infinite-scroll-hook";

function getInstance(token) {
  return axios.create({
    headers: { Authorization: `${token}` },
  });
}

const Notification = () => {
  const {
    auth: { token },
  } = useContext(AuthContext);
  const [ntfslist, setntfslist] = useState([]);
  const [limit, setlimit] = useState(0);
  const [free, setfree] = useState(false);
  function configSocket() {
    const socket = io.connect(`http://${config.SERVER_HOST}:1337`);
    socket.on("connect", (sock) => {
      socket.on("updatentfs", (mm) => {
        setTimeout(() => {
          realTimeAdd();
        }, 500);
      });
    });
  }

  useEffect(() => {
    let unmount;
    if (token) {
      configSocket();
      getInstance(token)
        .get(`http://${config.SERVER_HOST}:1337/notifications?limit=0`)
        .then((res) => {
          if (res.data.success) {
            if (!unmount) setntfslist(res.data.data);
            if (!unmount) setlimit(res.data.length);
          }
        });
    }
    setfree(true);
    return () => {
      unmount = true;
      setfree(false);
    };
    // eslint-disable-next-line
  }, [token]);
  function realTimeAdd() {
    if (token) {
      getInstance(token)
        .get(
          `http://${config.SERVER_HOST}:1337/notifications?g_ntsid=` +
            (ntfslist[0] !== undefined ? ntfslist[0].nts_id : 0)
        )
        .then((res) => {
          if (res.data.success) {
            let data = res.data.data.concat(ntfslist);
            setntfslist(data);
          }
        });
    }
  }
  function deletNotif(id) {
    getInstance(token)
      .delete(`http://${config.SERVER_HOST}:1337/notifications`, {
        data: {
          nts_id: id,
        },
      })
      .then((res) => {});
    setntfslist(
      ntfslist.filter((info) => {
        if (info.nts_id !== id) return true;
        return false;
      })
    );
  }

  const [loading, setLoading] = useState(false);

  function LoadMore() {
    if (ntfslist.length >= limit) return;
    setLoading(true);
    getInstance(token)
      .get(
        `http://${config.SERVER_HOST}:1337/notifications?limit=${ntfslist.length}`
      )
      .then((res) => {
        if (res.data.success) {
          setntfslist((old) => [...old, ...res.data.data]);
        }
      });
    setLoading(false);
  }

  const scroll = useInfiniteScroll({
    loading,
    hasNextPage: true,
    onLoadMore: LoadMore,
    scrollContainer: "window",
  });
  if (!free) return null;

  return (
    <div>
      <Typography align="center" gutterBottom variant="h2" component="h2">
        Notification
      </Typography>
      {ntfslist.map((e, index) => (
        <NotifComp key={index} e={e} deletNotif={deletNotif} scroll={scroll} />
      ))}
    </div>
  );
};
export default Notification;

const NotifComp = ({ e, deletNotif, scroll }) => {
  const classes = useStyles();
  return (
    <Container
      ref={scroll}
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
        <Grid item xs={6}>
          <span>{e.message}</span>
        </Grid>
        <Grid item xs={4}>
          <Moment fromNow>{e.creat_dat}</Moment>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => deletNotif(e.nts_id)}
            size="small"
            variant="contained"
            color="secondary"
          >
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
