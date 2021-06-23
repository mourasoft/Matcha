import { AuthContext } from "../context/authcontext";
import { useContext, useEffect, useState } from "react";
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
import  { getInstance } from "../Helpers/instance";

const Histrory = () => {
  const authContext = useContext(AuthContext);
  const {
    auth: { token },
  } = authContext;
  const [history, setHistory] = useState([]);
  const [dataLenght, setDataLenght] = useState();
  const [loading, setLoading] = useState(false);
  

  function deletBlock(toDelet) {
    getInstance(token)
      .delete(`history`, {
        data: {
          history_id: toDelet,
        },
      })
      .then((res) => {});
    setHistory(history.filter((e) => e.history_id !== toDelet));
  }
 

  useEffect(() => {
    if (token) {
      getInstance(token)
        .get(`history?limit=0`)
        .then((res) => {
          if (res.data.data) {
            setHistory(res.data.data);
            setDataLenght(res.data.length);
          }
        });
      // eslint-disable-next-line
    }
  }, [token]);
  

  function loadMore() {
    if (history.length >= dataLenght) return; //
    setLoading(true);
    getInstance(token)
      .get(
        `history?limit=${history.length}`
      )
      .then((res) => {
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
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "wrap",
    alignItems: "center",
    backgroundColor: "#d6d6d6",
    padding: "5px",
    borderRadius:"5px",
    "&:hover": {
      // backgroundColor:"red",
      transform: "scale(1.05)",
      transition: "0.01s",
    
    }
  },

}));
