import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core/";
import { API } from "aws-amplify";

const Consultas = () => {
  const [patients, setPatients] = useState([]);

  const apiData = async () => {
    try {
      const response = await API.get("mctestapi", "/mctest");
      const data = response.data.Items;
      setPatients(data);
      console.log(patients.map((item) => item));
    } catch (error) {
      console.log("errrrou");
    }
  };
  useEffect(() => {
    apiData(API);
  }, []);
  return (
    <div>
      <Box margin={1}></Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Paciente:</TableCell>
              <TableCell align="right">Nascimento:</TableCell>
              <TableCell align="right">Telefone:</TableCell>
              <TableCell align="right">Identidade:</TableCell>
              <TableCell align="right">E-mail:</TableCell>
              <TableCell align="right">Convênio:</TableCell>
              <TableCell align="right">Retorno:</TableCell>
              <TableCell align="right">Alergia:</TableCell>
              <TableCell align="right">Sintomas:</TableCell>
              <TableCell align="right">Especialidade:</TableCell>
              <TableCell align="right">Dia da Consulta:</TableCell>
              <TableCell align="right">Horário da Consulta:</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      {patients.map((item) => {})}
    </div>
  );
};

export default Consultas;
