import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useGlobalContext } from "../context";
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
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import paginate from "../utils/paginate";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  pages: {
    display: "flex",
    justifyContent: "center",
    color: "#000000",
    gap: "25px",
    textTransform: "none",
    padding: "10px",
  },
  icons: {
    paddingTop: "5px",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.4)",
    },
  },
  pageNumber: {
    display: "flex",
    gap: "8px",
  },
  MuiTableContainer: {
    minHeight: "550px",
  },
});

const Consultas = () => {
  const classes = useStyles();
  const { is_loading, api_data, apiGetData, patients } = useGlobalContext();
  const [page, setPage] = useState(0);
  console.log(page);
  useEffect(() => {
    apiGetData();
  }, []);

  const data = patients[page];
  const pages = paginate(api_data);
  console.log(pages.length);
  function goFoward() {
    if (page > pages.length - 2) {
      setPage(0);
    } else setPage(page + 1);
  }

  function goBack() {
    if (page <= 0) {
      setPage(3);
    } else setPage(page - 1);
  }

  if (is_loading) {
    return <Loading />;
  }
  return (
    <div>
      <Box margin={1}></Box>
      <TableContainer className={classes.MuiTableContainer}>
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
            {data ? (
              data.map((item, index) => {
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
              })
            ) : (
              <Loading />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.pages}>
        <span className={classes.icons}>
          <ArrowBackIcon onClick={() => goBack()} />
        </span>
        <Box className={classes.pageNumber}>
          <span>{page + 1}</span>
          <span>de</span>
          <span>{pages.length}</span>
        </Box>
        <span className={classes.icons}>
          <ArrowForwardIcon onClick={() => goFoward()} />
        </span>
      </Box>
    </div>
  );
};

export default Consultas;
