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
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
function getInstance(token) {
  return axios.create({
    headers: { Authorization: `${token}` },
  });
}

const UnblockUser = () => {
  const authContext = useContext(AuthContext);
  const {
    auth: { token },
  } = authContext;
  const [block, setBlock] = useState([]);

  function deletBlock(toDelet) {
    getInstance(token)
      .delete(`http://${config.SERVER_HOST}:1337/blocks`, {
        data: { login: toDelet },
      })
      .then((res) => {});
    setBlock(block.filter((e) => e.login !== toDelet));
  }
  useEffect(() => {
    if (token) {
      getInstance(token)
        .get(`http://${config.SERVER_HOST}:1337/blocks/get`)
        .then((res) => {
          if (res.data.success) {
            setBlock(res.data.data);
          }
        });
      // eslint-disable-next-line
    }
  }, [token]);

  return (
    <>
      <Typography align="center" gutterBottom variant="h2" component="h2">
        Unblock Pages
      </Typography>

      {block?.map((e, i) => (
        <Unblock key={i} e={e} delet={deletBlock} />
      ))}
    </>
  );
};

export default UnblockUser;

const Unblock = ({ e, delet }) => {
  const classes = useStyles();
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Grid className={classes.paper}>
          <Grid item xs={2}>
            <Avatar
              src={
                e.to_img
                  ? `http://${config.SERVER_HOST}:1337${config.SERVER_IMGS}${e.to_img}`
                  : ""
              }
            />
          </Grid>
          <Grid item xs={8}>
            <span>{e.login}</span>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={() => {
                delet(e.login);
              }}
              size="small"
              variant="contained"
              color="secondary"
            >
              Unblock
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
