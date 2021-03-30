import React, { useState, useEffect } from "react";
import "../css/chat.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Moment from "react-moment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const useStyles = makeStyles({
});
function Chat() {
  // const URL = "http://localhost:3001";
  // const socket = socketIOClient(URL);
  
  return (<div>
    <div>
      <span>chat user</span>
    </div>
    <div>
      <span>chat</span>

      <input></input>

    </div>
  </div>)
}
export default Chat;
