import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { useGlobalContext } from "../context";

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
  MuiListItem: {
    listStyle: "none",
    textDecoration: "none",
  },
}));

const Menu = () => {
  const { closeMenu } = useGlobalContext();

  const classes = useStyles();
  return (
    <Card className={classes.MuiCardContent}>
      <CardContent>
        <List className={classes.MuiListItem}>
          <Link to="/form" onClick={closeMenu}>
            <ListItem>
              <ListItemText primary="Agendar Consulta" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/consultas" onClick={closeMenu}>
            <ListItem>
              <ListItemText primary="Consultas Agendadas" />
            </ListItem>
          </Link>
        </List>
      </CardContent>
    </Card>
  );
};

export default Menu;
