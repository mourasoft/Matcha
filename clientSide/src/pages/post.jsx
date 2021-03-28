import { useState, useEffect } from "react";
import Filter from "../components/home/filter";
import CardProfile from "../components/home/card";
import axios from "axios";
import config from "../config";
// import { AuthContext } from "../context/authcontext";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useInfiniteScroll from "react-infinite-scroll-hook";

function getInstance(token) {
  return axios.create({
    headers: { Authorization: `${token}` },
  });
}
const ProfilePAdge = () => {
  // const {
  //   auth: { token,
  // } = useContext(AuthContext);
  const [age, setAge] = useState([0, 100]);
  const [km, setKm] = useState([0, 12700]);
  const [rating, setRating] = useState([0, 5]);
  const [tag, setTag] = useState([0, 5]);
  const [sorted, setSorted] = useState("4");
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState([]);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [flag, setflag] = useState(0);

  // console.log(typeof pages);
  // console.log(authContex.auth.token);
  function filterData() {
    setflag(1);
    const token = localStorage.getItem("token");
    if (token !== undefined) {
      setPages(0);
      (async () => {
        const { data: datas } = await getInstance(token).get(
          `http://${config.SERVER_HOST}:1337/posts?limit=0&minAge=${
            age[0]
          }&maxAge=${age[1]}&minLoc=${km[0]}&maxLoc=${km[1]}&minCtags=${
            tag[0]
          }&maxCtags=${tag[1]}&minFameRat=${rating[0]}&maxFameRat=${
            rating[1]
          }&sortType=${parseInt(sorted)}&intereststags=&flag=1`
        );
        if (datas.success) {
          setData(datas.data);
          setDataLength(datas.length);
        }
        setPages(20);
        // setLoading(true);
      })();
    }
  }
  // console.log(dataLength);
  // console.log(data);
  // console.log("pages", pages);
  // console.log(data);
  const scrollIt = useInfiniteScroll({
    loading,
    hasNextPage: true,
    onLoadMore: LoadMore,
    scrollContainer: "window",
  });

  function LoadMore() {
    setTimeout(() => {
      if (pages >= dataLength) {
        setLoading(false);
      }

      const token = localStorage.getItem("token");

      setLoading(true);
      console.log("anahna");
      if (token !== undefined) {
        (async () => {
          // console.log("pages ==>", pages);
          // console.log("eeeeeeeeeeeeeeerereerreereerererrereerreerereee", pages);
          const { data: datas } = await getInstance(token).get(
            `http://${config.SERVER_HOST}:1337/posts?limit=${pages}&minAge=${
              age[0]
            }&maxAge=${age[1]}&minLoc=${km[0]}&maxLoc=${km[1]}&minCtags=${
              tag[0]
            }&maxCtags=${tag[1]}&minFameRat=${rating[0]}&maxFameRat=${
              rating[1]
            }&sortType=${parseInt(
              sorted
            )}&intereststags=&searchString=&flag=${flag}`
          );
          if (datas.success) {
            setData((old) => [...old, ...datas.data]);
            console.log("Data lenght from upload", data.length);
          }
          setPages(pages + 20);
          setLoading(false);
        })();
      }
    }, 500);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== undefined) {
      (async () => {
        const { data: datas } = await getInstance(token).get(
          `http://${config.SERVER_HOST}:1337/posts?limit=${pages}&minAge=${
            age[0]
          }&maxAge=${age[1]}&minLoc=${km[0]}&maxLoc=${km[1]}&minCtags=${
            tag[0]
          }&maxCtags=${tag[1]}&minFameRat=${rating[0]}&maxFameRat=${
            rating[1]
          }&sortType=${parseInt(
            sorted
          )}&intereststags=&searchString=&flag=${flag}`
        );
        if (datas.success) {
          setData(datas.data);
          setDataLength(datas.length);
        }
        setPages(20);
      })();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {/* {typeof parseInt(sorted)} */}
      <Filter
        filterData={filterData}
        age={age}
        setAge={setAge}
        km={km}
        setKm={setKm}
        setRating={setRating}
        rating={rating}
        tag={tag}
        setTag={setTag}
        sorted={sorted}
        setSorted={setSorted}
        setPages={setPages}
      />
      {(() => {
        if (data.length === 0)
          return (
            <span style={{ textAlign: "center", display: "block" }}>
              no data to load! ...
            </span>
          );
        return (
          <Container className={classes.all} maxWidth="xl" ref={scrollIt}>
            {data.map((el, index) => (
              <CardProfile key={index} data={el} />
            ))}
          </Container>
        );
      })()}
    </>
  );
};

export default ProfilePAdge;

const useStyles = makeStyles((theme) => ({
  all: {
    width: "100%",
    marginTop: theme.spacing(2),
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
      width: 250,
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
  },
}));
