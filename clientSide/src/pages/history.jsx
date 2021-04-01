import { AuthContext } from "../context/authcontext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import {
  Typography,
  Container,
  CssBaseline,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Moment from "react-moment";

const Histrory = () => {
  const authContext = useContext(AuthContext);
  const {
    auth: { token },
  } = authContext;
  const [history, setHistory] = useState([]);
  const [dataLenght, setDataLenght] = useState();
  function deletBlock(toDelet) {
    axios
      .delete(`http://${config.SERVER_HOST}:1337/history`, {
        headers: {
          Authorization: token,
        },
        data: {
          history_id: toDelet,
        },
      })
      .then((res) => {});
    setHistory(history.filter((e) => e.history_id !== toDelet));
  }
  useEffect(() => {
    if (token) {
      axios
        .get(`http://${config.SERVER_HOST}:1337/history?limit=0`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log();
          if (res.data.data) {
            setHistory(res.data.data);
            setDataLenght(res.data.length);
          }
        });
      // eslint-disable-next-line
    }
  }, [token]);
  const [loading, setLoading] = useState(false);
  console.log(history);
  function loadMore() {
    if (history.length >= dataLenght) return; //
    setLoading(true);
    axios
      .get(
        `http://${config.SERVER_HOST}:1337/history?limit=${history.length}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("======>>>>>>>", res.data.data);

        // console.log(arr);
        setHistory((old) => [...old, ...res.data.data]);
      });

    setLoading(false);
  }
  const scroll = useInfiniteScroll({
    loading,
    hasNextPage: true,
    onLoadMore: loadMore,
    scrollContainer: "window",
  });
  console.log(history);
  console.log(dataLenght);
  return (
    <>
      <Typography align="center" gutterBottom variant="h2" component="h2">
        History
      </Typography>

      {history?.map((e, i) => (
        <Unblock key={i} e={e} delet={deletBlock} scroll={scroll} />
      ))}
    </>
  );
};

export default Histrory;

const Unblock = ({ e, delet, scroll }) => {
  const classes = useStyles();
  return (
    <>
      <Container component="main" maxWidth="xs" ref={scroll}>
        <CssBaseline />

        <Grid className={classes.paper}>
          <Grid item xs={6}>
            <span>{e.message}</span>
          </Grid>
          <Grid item xs={4}>
            <Moment fromNow>{e.modified_dat}</Moment>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={() => {
                delet(e.history_id);
              }}
              size="small"
              variant="contained"
              color="secondary"
            >
              delete
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "wrap",
    alignItems: "center",
  },
}));
