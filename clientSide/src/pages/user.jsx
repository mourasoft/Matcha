import { useParams, useHistory } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";
import Report from "@material-ui/icons/BugReportOutlined";
import Block from "@material-ui/icons/BlockOutlined";
import Follow from "@material-ui/icons/FavoriteOutlined";
import "../css/user.css";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import OnlineStatus from "@material-ui/icons/FiberManualRecord";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/authcontext";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import io from 'socket.io-client';
const socket = io.connect(`http://${config.SERVER_HOST}:1337`);

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "200px",
    height: "200px",
    marginBottom: "20px",
    marginTop: "20px",
  },
  cycle: {
    color: "green",
  },
  btn: {
    margin: "8px",
  },
}));

const User = () => {
  const classes = useStyles();
  const { user } = useParams();
  const history = useHistory();

  const authContext = useContext(AuthContext);
  const {
    auth: { token, login: userlogin },
  } = authContext;
  const [report, setReport] = useState({ report: "" });
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
    staus: "",
  });
  const [tag, setTag] = useState("");
  const [info, setInfo] = useState([]);
  const [image, setImage] = useState([]);
  const [like, setLike] = useState(false);
  function reportUser() {
    if (token && user) {
      axios
        .post(
          `http://${config.SERVER_HOST}:1337/report`,
          { login: user },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            setReport((old) => ({
              ...old,
              report: report.report === "Reported" ? "Unreported" : "Reported",
            }));
            // changeError({
            //   type: "success",
            //   msg: result.data.message,
            //   state: true,
            // });
          } else if (res.data.error) {
            //   changeError({
            //     type: "error",
            //     msg: result.data.message,
            //     state: true,
            //   });
          }
        });
    }
  }

  function blockUser() {
    if ((token, user)) {
      axios
        .post(
          `http://${config.SERVER_HOST}:1337/blocks`,
          { login: user },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((result) => {
          console.log(result);
          if (result.data.success) {
            history.replace("/post");
          } else if (result.data.error) {
          }
        });
    }
  }

  useEffect(() => {
    if (token) {
      axios
        .get(`http://${config.SERVER_HOST}:1337/infos?login=${user}`, {
          headers: {
            Authorization: authContext.auth.token,
          },
        })
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.data.message,
            });
            history.replace("/");
          } else if (res.data.success) {
            // console.log(res.data);

            const {
              birthday,
              city,
              desc,
              sex_pref,
              gendre,
              status,
            } = res.data.data[0];
            setData(() => ({
              birthday: birthday,
              city: city,
              biography: desc,
              gender: gendre,
              preferences: sex_pref,
              status: status,
            }));
          }
        });
      axios
        .get(`http://${config.SERVER_HOST}:1337/users?login=${user}`, {
          headers: {
            Authorization: authContext.auth.token,
          },
        })
        .then((res) => {
          //   console.log(res);
          if (res.data.success) {
            const { email, first_name, last_name, login } = res.data.data[0];
            setInfo(() => ({
              fname: first_name,
              lname: last_name,
              email: email,
              login: login,
            }));
          }
        });
      axios
        .get(`http://${config.SERVER_HOST}:1337/tags?login=${user}`, {
          headers: {
            Authorization: authContext.auth.token,
          },
        })
        .then((res) => {
          let active = [];
          res.data.data?.filter((e) => {
            if (e.state === "active") {
              active.push({ label: e.tag, value: e.tag });
            }
            return "";
          });
          setTag(() => ({
            active,
          }));
        });
      axios
        .get(`http://${config.SERVER_HOST}:1337/images?login=${user}`, {
          headers: {
            Authorization: authContext.auth.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setImage(res.data.data);
          }
        });
      axios
        .get(`http://${config.SERVER_HOST}:1337/report?login=${user}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setReport((old) => ({
              ...old,
              report: res.data.ureport ? "Reported" : "Unreported",
            }));
          }
        });
      /*
       *userRating
       */
      axios
        .get(`http://${config.SERVER_HOST}:1337/rating?login=${user}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          // console.log(res);
          // setuserRating(result.data.totalrat);
          // setRating(result.data.userrat);
        });
      axios
        .get(`http://${config.SERVER_HOST}:1337/follow?to_login=${user}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            setLike(res.data.data);
          }
        });
    }
    // eslint-disable-next-lineres.
  }, [token]);
  // console.log(report);
  function insetLike() {
    if ((token, user)) {
      axios
        .post(
          `http://${config.SERVER_HOST}:1337/follow`,
          {
            to_login: user,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((result) => {
          console.log(result);
          if (result.data.message === "Follow added successfully") {
            setLike(true);
          } else if (result.data.message === "Follow deleted successfully") {
            setLike(false);
          }
        });
        setTimeout(() => {
          socket.emit('updatentfs', '');
        }, 500);
    }
  }
  //   console.log(image[0].image_path);
  const { city, gender, preferences, biography } = data;
  const { login, fname, lname } = info;
  if (data.login) return null;
  return (
    <div className="userProfile">
      <Avatar
        src={
          image.length
            ? `http://${config.SERVER_HOST}:1337${config.SERVER_IMGS}${image[0].image_path}`
            : ""
        }
        className={classes.avatar}
      />
      <OnlineStatus className={classes.cycle} /> online
      <Rating name="read-only" value={3} readOnly />
      <h2>{login && login}</h2>
      {userlogin !== login?.toLowerCase() ? (
        <div className="btnClick">
          <Button
            className={classes.btn}
            variant="outlined"
            color={like ? "secondary" : "primary"}
            onClick={() => {
              insetLike();
            }}
          >
            <Follow />
          </Button>
          <Button className={classes.btn} variant="outlined" color="primary">
            <Block
              onClick={() => {
                blockUser();
              }}
            />
          </Button>
          <Button
            disabled={report.report === "Reported" ? true : false}
            className={classes.btn}
            variant="outlined"
            color="primary"
          >
            <Report
              onClick={() => {
                reportUser();
              }}
            />
          </Button>
        </div>
      ) : null}
      <div className="information">
        <h2>Information</h2>
        {/* <div className="info">
          <h4>Age :</h4>
          <p>{preferences}</p>
        </div> */}
        <div className="info">
          <h4>Firstname :</h4>
          <p>{fname}</p>
        </div>
        <div className="info">
          <h4>Lastname :</h4>
          <p>{lname}</p>
        </div>
        <div className="info">
          <h4>Gender :</h4>
          <p> {gender}</p>
        </div>
        <div className="info">
          <h4>Looking For :</h4>
          <p> {preferences}</p>
        </div>
        <div className="info">
          <h4>City :</h4>
          <p> {city}</p>
        </div>
      </div>
      <div className="information">
        <h2>Bioghraphie</h2>
        <div className="info">
          <p>{biography}</p>
        </div>
      </div>
      <div className="information">
        <h2>Tags</h2>
        <div className="info">
          {tag.active?.map((el, index) => (
            <Button variant="outlined" disabled key={index}>
              {el.value}
            </Button>
          ))}
        </div>
      </div>
      <div className="information">
        <h2>Gallery</h2>
        <div className="galleryInfo">
          {image?.map((e, index) => (
            <img
              key={index}
              className="gallery"
              alt="gallery"
              src={`http://${config.SERVER_HOST}:1337${config.SERVER_IMGS}${e.image_path}`}
            />
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default User;
