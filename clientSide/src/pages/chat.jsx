// import React, { useState, useEffect } from "react";
// import "../css/chat.css";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Box from "@material-ui/core/Box";
// import axios from "axios";
// import { useHistory, Link } from "react-router-dom";
// import ScrollableFeed from "react-scrollable-feed";
// import Moment from "react-moment";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import Swal from "sweetalert2";

// const useStyles = makeStyles({
//   chat: {
//     "& > *": {
//       margin: "30px 0 0 17px",
//     },
//   },
//   area: {
//     width: "90%",
//     marginLeft: "12px",
//   },
//   input: {
//     borderRadius: "40px",
//   },
//   form: {
//     flexBasis: "125%",
//     display: "flex",
//   },
//   icon: {
//     color: "#5961f9ad",
//   },
//   send: {
//     display: "flex",
//     flexBasis: "10%",
//     borderRadius: "33px",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: "15px",
//     marginLeft: "10px",
//     height: "52px",
//     cursor: "pointer",
//   },
//   border: {
//     // width: "100%",
//     borderColor: "#e1e0e1",
//     margin: "0",
//   },
// });
// function Chat() {
//   // const URL = "http://localhost:3001";
//   // const socket = socketIOClient(URL);
//   const history = useHistory();
//   const classes = useStyles();
//   const [to, setTo] = useState();
//   const [msg, setMsg] = useState();
//   const [me, setMe] = useState();
//   const [chat, setChat] = useState();
//   const [matched, setMatch] = useState();
//   const [tousername, setTousername] = useState();
//   const [profile, setProfile] = useState();
//   const [classStatus, setclassStatus] = useState(0);
//   const handleChange = (e) => setMsg(e.target.value);
//   function insetMsg(from, to) {}
//   function viewfreinds() {
//     setclassStatus(0);
//   }
//   function getmsg(firstuser, lastuser, username, profilePic) {}

//   useEffect(() => {
//     return new Promise((resolve, reject) => {
//       let unmount = false;

//       return () => {
//         unmount = true;
//       };
//     }); // eslint-disable-next-line
//   }, []);

//   useEffect(
//     () => {
//       let unmount = false;
//       axios
//         .get(`http://${config.SERVER_HOST}:1337/inbox/users`, {
//           headers: {
//             Authorization: localStorage.getItem("Authorization"),
//           },
//         })
//         .then((result) => {
//           changeIformation(() => {
//             const arr = [];
//             for (let i = 0; i < result.data.length; i++)
//               arr.push({
//                 firstname: result.data[i].first_name,
//                 lastname: result.data[i].last_name,
//                 image:
//                   result.data[i].img !== undefined
//                     ? "http://" +
//                       config.SERVER_HOST +
//                       ":" +
//                       config.SERVER_PORT +
//                       config.SERVER_IMGS +
//                       result.data[i].img
//                     : userprofil,
//                 status: result.data[i].status[0].status,
//               });
//             return arr;
//           });
//         });
//       return () => {
//         unmount = true;
//       };
//     },
//     // eslint-disable-next-line
//     []
//   );
//   const lasTtime = chat?.[chat?.length - 1];
//   return (
//     <div className="center-chat">
//       <div className="chat">
//         <div
//           className={`messages ${classStatus === 1 ? "inactive" : "active"}`}
//         >
//           <div className="title">
//             <h3>
//               <Link to="/chat">Messages</Link>
//             </h3>
//             <div className={classes.chat}></div>
//           </div>
//           <div>
//             <h4>All Conversation</h4>
//           </div>
//           <div className="personal">
//             {matched?.map((listmatched, index) => (
//               <div key={index}>
//                 <Box borderBottom={1} className={classes.border} />
//                 <div
//                   className="users_chat"
//                   id={listmatched.id}
//                   onClick={() => getmsg()}
//                 >
//                   <div className="profile_img">
//                     <img alt="" src={""} />
//                     <div>
//                       <h4>ahmed</h4>
//                       <p>@ahmed</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <Box borderBottom={1} className={classes.border} />
//           </div>
//         </div>
//         <div
//           className={`conversation ${
//             classStatus === 1 ? "active" : "inactive"
//           }`}
//         >
//           {tousername != null ? (
//             <div className="chatDiv">
//               <ArrowBackIcon
//                 className="backbutton"
//                 onClick={() => viewfreinds()}
//               ></ArrowBackIcon>
//               <img className="chatprofileImg" alt="" src={""} />
//               <h3>
//                 <Link className="username" to={`/profile/${tousername}`}>
//                   @{tousername}
//                 </Link>
//               </h3>
//             </div>
//           ) : (
//             ""
//           )}
//           <div className="conver">
//             <ScrollableFeed className="te"></ScrollableFeed>
//           </div>
//           {to != null ? (
//             <div>
//               <form className={classes.form} noValidate autoComplete="off">
//                 <TextField
//                   className={classes.area}
//                   id="outlined-basic"
//                   label="Message"
//                   onChange={handleChange}
//                   multiline
//                   rows={1}
//                   variant="outlined"
//                   placeholder="Type your message"
//                   InputProps={{
//                     className: classes.input,
//                   }}
//                 />
//                 <div className={classes.send} onClick={() => insetMsg(me, to)}>
//                   <FontAwesomeIcon
//                     icon={faPaperPlane}
//                     size="2x"
//                     className={classes.icon}
//                   />
//                 </div>
//               </form>
//             </div>
//           ) : (
//             ""
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Chat;
