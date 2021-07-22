import React from "react";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box } from "@material-ui/core/";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import { useGlobalContext } from "./context";
import Home from "./Home";
import { Consultas, Consulta, Menu, Form } from "./components";

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: "570px",
    minWidth: "550px",
    height: "fit-content",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(6),
    borderRadius: "18px",
    border: "solid #AFB1A9",
    backgroundColor: "#EFE7CC",
    boxShadow: "2px 1px 75px 1px rgba(0, 0, 0, 0.54)",
  },
  MuiSvgIcon: {
    fontSize: "4rem",
    position: "fixed",
    top: "1.4rem",
    right: "4rem",
    zIndex: 10,
    display: "inline",
    cursor: "pointer",
  },
}));

const App = () => {
  const { is_menu_open, closeMenu, openMenu } = useGlobalContext();
  const classes = useStyles();

  const menuHandler = () => {
    if (!is_menu_open) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  return (
    <>
      <Router>
        <AddCircleSharpIcon
          className={classes.MuiSvgIcon}
          onClick={() => menuHandler()}
        />
        {is_menu_open && <Menu />}
        <Box className={classes.main}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/form">
              <Form />
            </Route>
            <Route exact path="/consultas">
              <Consultas />
            </Route>
            <Route exact path="/consultas/:id" children={<Consulta />} />
          </Switch>
        </Box>
      </Router>
    </>
  );
};

export default App;
