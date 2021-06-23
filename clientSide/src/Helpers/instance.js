import config from "../config";
import  axios  from 'axios';


export function getInstance(token) {
    return axios.create({
      headers: { Authorization: `${token}` },
      baseURL:`http://${config.SERVER_HOST}:1337/`
    });
  }