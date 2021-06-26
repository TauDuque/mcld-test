import React, { useState, useEffect } from "react";
import { makeStyles, FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useParams, Redirect, Route } from "react-router-dom";
import {
  Button,
  Box,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@material-ui/core/";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { API } from "aws-amplify";
import clsx from "clsx";

import { Especialidades } from "./data";

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
}));

const Consulta = () => {
  const [patients, setPatients] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const { id } = useParams();
  const [color, setColor] = useState(null);
  const classes = useStyles();
  const [name, setName] = useState("");
  const [age, setAge] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isConvd, setIsConvd] = useState("");
  const [allergy, setAllergy] = useState("");
  const [symptom, setSymptom] = useState("");
  const [isReturn, setIsReturn] = useState();
  const [docType, setDocType] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState();

  const toggleChecked = () => {
    setIsReturn((prev) => !prev);
    if (!isReturn) {
      setColor("switch");
    } else {
      setColor(null);
    }
  };

  const handleRadio = (e) => {
    setIsConvd(e.target.value);
  };

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

  async function putData(e) {
    e.preventDefault();
    const data = {
      body: {
        name: name,
        age: age,
        phone: phone,
        idNumber: idNumber,
        email: email,
        isConvd: isConvd,
        allergy: allergy,
        symptom: symptom,
        isReturn: isReturn,
        docType: docType,
        day: day,
        time: time,
      },
    };

    console.log(data);
    const apiData = await API.put("mctestapi", "/mctest", data);
    console.log(data);
    console.log({ apiData });
  }

  return (
    <>
      {patients.map((item, index) => {
        if (id === item.id) {
          return (
            <form className={classes.form} onSubmit={putData}>
              <Box margin={1} marginTop={1}>
                <TextField
                  key={index}
                  required
                  className={classes.textField}
                  defaultValue={item.nome}
                  onChange={(e) => setName(e.target.value)}
                />
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
                      defaultValue={item.idade}
                      onChange={(e) => setAge(e.target.value)}
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
                    defaultValue={item.telefone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Box>
              </Box>
              <Box display="flex">
                <TextField
                  key={index}
                  className={classes.planeField}
                  label="identidade"
                  type="text"
                  defaultValue={item.identidade}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
                <Box marginLeft={3}>
                  <TextField
                    label="e-mail"
                    className={classes.planeField}
                    type="email"
                    key={index}
                    defaultValue={item.email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={() => handleRadio()}
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
                        onClick={toggleChecked}
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
                  defaultValue={item.alergia}
                  onChange={(e) => setAllergy(e.target.value)}
                />
              </Box>
              <Box margin={2}>
                <TextField
                  key={index}
                  label="Sintomas"
                  className={classes.textField}
                  type="text"
                  defaultValue={item.sintomas}
                  onChange={(e) => setSymptom(e.target.value)}
                />
              </Box>
              <Box margin={1}>
                <Autocomplete
                  freeSolo
                  onChange={(handleDocs, value) => setDocType(value)}
                  options={Especialidades}
                  getOptionLabel={(option) => option}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      key={index}
                      variant="outlined"
                      label={item.especialidade}
                      required
                    />
                  )}
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
                        defaultValue={item.diaConsulta}
                        onChange={(e) => setDay(e.target.value)}
                      />
                    </Box>
                    <Box marginLeft={1.5}>
                      <TextField
                        required
                        key={index}
                        className={classes.planeField}
                        defaultValue="07:30"
                        type="time"
                        label="Hora"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        defaultValue={item.horaConsulta}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </Box>
                  </Box>
                </FormControl>
              </Box>
              <Box marginTop={2}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.btn}
                  onClick={() => setIsSubmit(true)}
                >
                  Agendar
                </Button>
              </Box>
            </form>
          );
        }
      })}
    </>
  );
};

export default Consulta;
