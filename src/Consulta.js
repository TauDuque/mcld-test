import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { makeStyles, FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Box,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@material-ui/core/";
import { API } from "aws-amplify";
import clsx from "clsx";
import { useGlobalContext } from "./context";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "570px",
    marginTop: theme.spacing(3),
    borderRadius: "18px",
    border: "solid #AFB1A9",
    backgroundColor: "#EFE7CC",
    boxShadow: "2px 1px 75px 1px rgba(0, 0, 0, 0.54)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(0),
    padding: theme.spacing(0.5),
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 420,
  },
  planeField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 180,
    borderRadius: "5px",
  },
  icon: {
    borderRadius: "50%",
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    width: 16,
    height: 16,
  },
  checkedIcon: {
    backgroundColor: "#B39E54",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
    },
  },
  switch: {
    color: "#000",
  },
  btn: {
    backgroundColor: "#FFE070",
    color: "#000",
  },
  typography: {
    variant: "h5",
    color: "#000",
  },
}));

const Consulta = () => {
  const [patients, setPatients] = useState([]);
  const { id } = useParams();
  // eslint-disable-next-line
  const [color, setColor] = useState(null);
  const { is_loading, loadStop } = useGlobalContext();
  const classes = useStyles();

  function StyledRadio(props) {
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

  const apiData = async () => {
    try {
      const response = await API.get("mctestapi", "/mctest");
      const data = response.data.Items;
      setPatients(data);
    } catch (error) {
      console.log("errrrou");
    }
  };
  useEffect(() => {
    apiData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      loadStop();
    }, 2700);
  });

  if (is_loading) {
    return <Loading />;
  }

  return (
    <>
      {patients.map((item, index) => {
        if (id === item.id) {
          return (
            <form className={classes.form}>
              <Box
                margin={1}
                marginTop={1}
                display="flex"
                alignItems="center"
                marginRight="70px"
              >
                <Box p={1}>
                  <Typography align="center" variant="caption">
                    paciente:{" "}
                  </Typography>
                </Box>
                <Typography className={classes.typography} variante="h6">
                  {item.nome}
                </Typography>
              </Box>
              <Box display="flex">
                <FormControl>
                  <Box margin={0.6}>
                    <TextField
                      key={index}
                      required
                      className={classes.planeField}
                      type="date"
                      label="Nascimento"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={item.idade}
                    />
                  </Box>
                </FormControl>
                <Box marginLeft={3} margin={0.5}>
                  <TextField
                    key={index}
                    required
                    label="Contato"
                    className={classes.planeField}
                    type="tel"
                    value={item.telefone}
                  />
                </Box>
              </Box>
              <Box display="flex">
                <TextField
                  key={index}
                  className={classes.planeField}
                  label="identidade"
                  type="text"
                  value={item.identidade}
                />
                <Box marginLeft={3}>
                  <TextField
                    label="e-mail"
                    className={classes.planeField}
                    type="email"
                    key={index}
                    value={item.email}
                  />
                </Box>
              </Box>
              <Box marginTop={2.5} display="flex">
                <FormControl component="fieldset">
                  <RadioGroup
                    required
                    className={classes.formGroup}
                    name="consulta"
                    row
                    key={index}
                    value={item.convenio}
                  >
                    <FormControlLabel
                      className={item.convenio === "convenio" ? "switch" : null}
                      value="Convênio"
                      checked={item.convenio === "convenio" ? true : false}
                      control={<StyledRadio />}
                      label="Convênio"
                    />
                    <FormControlLabel
                      className={
                        item.convenio === "particular" ? "switch" : null
                      }
                      checked={item.convenio === "particular" ? true : false}
                      value="Particular"
                      control={<StyledRadio />}
                      label="Particular"
                      key={index}
                    />
                  </RadioGroup>
                </FormControl>
                <FormGroup>
                  <FormControlLabel
                    className={color}
                    control={
                      <Switch
                        key={index}
                        color="default"
                        style={{ color: "#B39E54" }}
                        checked={item.retorno ? true : false}
                        defaultValue={item.retorno}
                      />
                    }
                    label="Consulta de Retorno"
                  />
                </FormGroup>
              </Box>
              <Box marginTop={-1}>
                <TextField
                  label="Alergias"
                  key={index}
                  className={classes.textField}
                  type="text"
                  value={item.alergia}
                />
              </Box>
              <Box margin={2}>
                <TextField
                  key={index}
                  label="Sintomas"
                  className={classes.textField}
                  type="text"
                  value={item.sintomas}
                />
              </Box>
              <Box margin={1}>
                <TextField
                  value={item.especialidade}
                  key={index}
                  variant="outlined"
                  label="especialidade"
                  required
                />
              </Box>
              <Box margin={1} display="flex">
                <FormControl>
                  <FormLabel component="legend">Agendar consulta</FormLabel>
                  <Box display="flex" marginTop={1}>
                    <Box marginRight={1.5}>
                      <TextField
                        required
                        key={index}
                        className={classes.planeField}
                        format="MM/dd/yyyy"
                        type="date"
                        label="Dia"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={item.diaConsulta}
                      />
                    </Box>
                    <Box marginLeft={1.5}>
                      <TextField
                        required
                        key={index}
                        className={classes.planeField}
                        type="time"
                        label="Hora"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={item.horaConsulta}
                      />
                    </Box>
                  </Box>
                </FormControl>
              </Box>
              <Box marginTop={1}>
                <Link to="/consultas">
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.btn}
                  >
                    Voltar
                  </Button>
                </Link>
              </Box>
            </form>
          );
        }
      })}
    </>
  );
};

export default Consulta;
