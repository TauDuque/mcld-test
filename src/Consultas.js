import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useGlobalContext } from "./context";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core/";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { API } from "aws-amplify";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Consultas = () => {
  const classes = useStyles();
  const { is_loading, loadStop } = useGlobalContext();
  const [patients, setPatients] = useState([]);

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
    apiData(API);
  }, [patients]);

  useEffect(() => {
    setTimeout(() => {
      loadStop();
    }, 2700);
  });

  if (is_loading) {
    return <Loading />;
  }
  return (
    <div>
      <Box margin={1}></Box>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Acessar</TableCell>
              <TableCell align="center">Paciente:</TableCell>
              <TableCell align="right">Nascimento:</TableCell>
              <TableCell align="right">Convênio:</TableCell>
              <TableCell align="right">Especialidade:</TableCell>
              <TableCell align="right">Dia da Consulta:</TableCell>
              <TableCell align="right">Horário da Consulta:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((item, index) => {
              const {
                nome,
                idade,
                convenio,
                especialidade,
                diaConsulta,
                horaConsulta,
                id,
              } = item;
              return (
                <TableRow scope="row" key={index}>
                  <TableCell align="center">
                    <Link to={`/consultas/${id}`}>
                      <AccountCircleIcon />
                    </Link>
                  </TableCell>
                  <TableCell align="center">{nome}</TableCell>
                  <TableCell align="right">{idade}</TableCell>
                  <TableCell align="right">{convenio}</TableCell>
                  <TableCell align="right">{especialidade}</TableCell>
                  <TableCell align="right">{diaConsulta}</TableCell>
                  <TableCell align="center">{horaConsulta}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Consultas;
