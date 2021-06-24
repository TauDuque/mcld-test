import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  MuiCardContent: {
    height: "135px",
    backgroundColor: "#ffffff",
    border: "solid #AFB1A9",
    borderRadius: "18px",
    position: "fixed",
    top: "5rem",
    right: "7rem",
    boxShadow: "2px 1px 14px 1px rgba(0, 0, 0, 0.29)",
    zIndex: 10,
    display: "inline",
    cursor: "pointer",
    padding: theme.spacing(2),
  },
}));

const Menu = () => {
  const classes = useStyles();
  return (
    <Card className={classes.MuiCardContent}>
      <CardContent>
        <List>
          <ListItem>
            <ListItemText primary="Agendar Consulta" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Consultas da Semana" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Menu;
