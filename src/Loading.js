import React from "react";
import { makeStyles } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "570px",
  },
  MuiCircularProgress: {
    color: "#404040",
    height: "85px",
    size: 35,
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <CircularProgress className={classes.MuiCircularProgress} size={95} />
    </div>
  );
};

export default Loading;
