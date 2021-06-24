import React, { useEffect, useState } from "react";
import { Button, Box, FormControlLabel, FormGroup } from "@material-ui/core/";
import { API } from "aws-amplify";
import { useGLobalContext } from "./context";

const Consultas = () => {
  const [patients, setPatients] = useState([]);

  const apiData = async () => {
    try {
      const response = await API.get("mctestapi", "/mctest");
      const dataDates = response.data.Items;
      setPatients(dataDates);
      console.log(patients.map((item) => item));
    } catch (error) {
      console.log("errrrou");
    }
  };
  useEffect(() => {
    apiData();
  }, []);
  return (
    <div>
      <button
        style={{ height: "50px", width: "50px" }}
        onClick={() => apiData()}
      ></button>
      {patients.map((item) => console.log(item))}
    </div>
  );
};

export default Consultas;
