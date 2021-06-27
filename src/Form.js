import React, { useState } from "react";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";
import { makeStyles, FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
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
import { useEffect } from "react";
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
}));

const Form = () => {
  const classes = useStyles();
  const history = useHistory();
  const { is_loading, loadStop } = useGlobalContext();
  const [color, setColor] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isConvd, setIsConvd] = useState("");
  const [allergy, setAllergy] = useState("");
  const [symptom, setSymptom] = useState("");
  const [isReturn, setIsReturn] = useState(false);
  const [docType, setDocType] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState();
  const [isSent, setIsSent] = useState(false);

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

  function handleSubmit(e) {
    setIsSent(true);
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
    // eslint-disable-next-line
    const apiData = API.post("mctestapi", "/mctest", data);
  }

  useEffect(() => {
    if (isSent) {
      setTimeout(() => {
        return history.push("/");
      }, 3400);
    }
    // eslint-disable-next-line
  }, [isSent]);

  useEffect(() => {
    setTimeout(() => {
      loadStop();
    }, 2700);
  });

  if (is_loading) {
    return <Loading />;
  }
  return (
    <form className={classes.form}>
      <Box margin={1} marginTop={0}>
        <TextField
          required
          className={classes.textField}
          label="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Box display="flex">
        <FormControl>
          <Box margin={0.6}>
            <TextField
              required
              className={classes.planeField}
              type="date"
              label="Nascimento"
              InputLabelProps={{
                shrink: true,
              }}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Box>
        </FormControl>
        <Box marginLeft={3} margin={0.5}>
          <TextField
            required
            label="Contato"
            className={classes.planeField}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Box>
      </Box>
      <Box display="flex">
        <TextField
          className={classes.planeField}
          label="identidade"
          type="text"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
        <Box marginLeft={3}>
          <TextField
            label="e-mail"
            className={classes.planeField}
            type="email"
            value={email}
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
            value={isConvd}
            onChange={handleRadio}
          >
            <FormControlLabel
              className={isConvd === "Convênio" ? "switch" : null}
              value="Convênio"
              control={<StyledRadio />}
              label="Convênio"
            />
            <FormControlLabel
              className={isConvd === "Particular" ? "switch" : null}
              value="Particular"
              control={<StyledRadio />}
              label="Particular"
            />
          </RadioGroup>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            className={color}
            control={
              <Switch
                color="default"
                style={{ color: "#B39E54" }}
                checked={isReturn}
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
          className={classes.textField}
          type="text"
          value={allergy}
          onChange={(e) => setAllergy(e.target.value)}
        />
      </Box>
      <Box margin={2}>
        <TextField
          label="Sintomas"
          className={classes.textField}
          type="text"
          value={symptom}
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
              label="Especialidade"
              variant="outlined"
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
                className={classes.planeField}
                format="MM/dd/yyyy"
                type="date"
                label="Dia"
                InputLabelProps={{
                  shrink: true,
                }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
            </Box>
            <Box marginLeft={1.5}>
              <TextField
                required
                className={classes.planeField}
                defaultValue="07:30"
                type="time"
                label="Hora"
                InputLabelProps={{
                  shrink: true,
                }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Box>
          </Box>
        </FormControl>
      </Box>
      <Box marginTop={2}>
        <Button
          type="button"
          variant="contained"
          className={classes.btn}
          onClick={() => handleSubmit()}
        >
          Agendar
        </Button>
      </Box>
    </form>
  );
};

export default Form;
