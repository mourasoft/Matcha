import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config";

async function getResponse(login, key) {
  try {
    const res = axios.get(
      `http://${config.SERVER_HOST}:1337/confirm?login=${login}&key=${key}`
    );
    return res;
  } catch (e) {
    console.log(e);
  }
}

function Confirm() {
  const { login, key } = useParams();
  const history = useHistory();
  console.log(login, key);

  useEffect(() => {
    const data = async () => {
      const { data } = await getResponse(login, key);
      if (data.error === true) {
        var error = data.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
        history.replace("/signin");
      } else if (data.success === true) {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Your Account has ben viryfed",
        });
        history.replace("/signin");
      }
    };
    data();
  }, [login, key, history]);

  return null;
}

export default Confirm;
