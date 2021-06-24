import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core/";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import Form from "./Form";
import Menu from "./Menu";
import Consultas from "./Consultas";
const useStyles = makeStyles((theme) => ({
  main: {
    height: "570px",
    marginTop: theme.spacing(),
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
  const classes = useStyles();
  const [isClicked, setIsClicked] = useState(false);
  console.log(isClicked);
  const menuHandler = () => {
    if (!isClicked) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  };

  return (
    <>
      <AddCircleSharpIcon
        className={classes.MuiSvgIcon}
        onClick={() => menuHandler()}
      />
      {isClicked && <Menu />}
      <Box className={classes.main}>
        <Form />
        <Consultas />
      </Box>
    </>
  );
};

export default App;
