import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useGlobalContext } from "./context";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  textBox: {
    display: "flex",
    justifyContent: "center",
    color: "#404040",
    marginTop: theme.spacing(15),
  },
  usualText: {
    display: "flex",
    justifyContent: "center",
    color: "#404040",
    textTransform: "uppercase",
  },
  btnBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: theme.spacing(5),
  },
  btn: {
    backgroundColor: "#FFE070",
    color: "#000",
    minWidth: "145px",
    boxShadow: "1px 1px 8px 4px rgba(0, 0, 0, 0.26)",
  },
  btnTwo: {
    backgroundColor: "#404040",
    color: "#FFF300",
    minWidth: "145px",
    boxShadow: "1px 1px 8px 4px rgba(0, 0, 0, 0.26)",
  },
}));

const Home = () => {
  const classes = useStyles();
  const { is_form_submited, toSubmit, is_loading, loadStop, loadStart } =
    useGlobalContext();

  useEffect(() => {
    if (is_loading) {
      setTimeout(() => {
        loadStop();
      }, 2600);
    } // eslint-disable-next-line
  }, []);

  if (is_form_submited) {
    return (
      <div>
        <Typography variant="h2" gutterBottom className={classes.textBox}>
          Bem-vindo
        </Typography>
        <Typography variant="h5" gutterBottom className={classes.usualText}>
          Agende agora a sua consulta
        </Typography>
        <Box className={classes.btnBox}>
          <Link to="/form">
            <Button
              type="button"
              variant="contained"
              className={classes.btn}
              onClick={toSubmit}
            >
              agendar
            </Button>
          </Link>
          <Link to="/consultas">
            <Box marginTop={3}>
              <Button
                type="button"
                variant="contained"
                className={classes.btnTwo}
                onClick={toSubmit}
              >
                ver consultas
              </Button>
            </Box>
          </Link>
        </Box>
      </div>
    );
  }

  if (!is_form_submited) {
    return (
      <div>
        {is_loading && <Loading />}
        <Typography variant="h2" gutterBottom className={classes.textBox}>
          Consulta Agendada
        </Typography>
        <Typography variant="h5" gutterBottom className={classes.usualText}>
          deseja agendar outra consulta?
        </Typography>
        <Box className={classes.btnBox}>
          <Link to="/form">
            <Button
              type="button"
              onClick={toSubmit}
              variant="contained"
              className={classes.btn}
            >
              agendar
            </Button>
          </Link>
          <Link to="/consultas">
            <Box marginTop={3}>
              <Button
                type="button"
                variant="contained"
                onClick={toSubmit}
                className={classes.btnTwo}
              >
                ver consultas
              </Button>
            </Box>
          </Link>
        </Box>
      </div>
    );
  }
};

export default Home;
