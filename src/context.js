import React, { useContext, useReducer, useEffect } from "react";
import { API } from "aws-amplify";

import {
  OPEN_MENU,
  CLOSE_MENU,
  FORM_NOT_SUBMITED,
  FORM_SUBMITED,
  STOP_LOADING,
  START_LOADING,
  API_DATA,
  SINGLE_PATIENT_API,
} from "./actions";

import reducer from "./reducer";

const initialState = {
  show_menu: false,
  is_menu_open: false,
  is_form_submited: true,
  is_loading: false,
  api_data: [],
  singleData: {
    nome: "",
    idade: "",
    telefone: "",
    identidade: "",
    email: "",
    convenio: "",
    alergia: "",
    sintomas: "",
    retorno: "",
    especialidade: "",
    diaConsulta: "",
    horaConsulta: "",
  },
  patients: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openMenu = () => {
    dispatch({ type: OPEN_MENU });
  };
  const closeMenu = () => {
    dispatch({ type: CLOSE_MENU });
  };

  const loadStop = () => {
    dispatch({ type: STOP_LOADING });
  };

  const loadStart = () => {
    dispatch({ type: START_LOADING });
  };

  const toSubmit = () => {
    dispatch({ type: FORM_NOT_SUBMITED });
  };
  const justSubmited = () => {
    dispatch({ type: FORM_SUBMITED });
  };

  const apiGetData = async () => {
    dispatch({ type: START_LOADING });
    try {
      const response = await API.get("mctestapi", "/mctest");
      const data = response.data.Items;
      dispatch({ type: API_DATA, payload: data });
    } catch (error) {
      console.log("errrrou");
    }
  };

  const apiSinglePatientData = async (id) => {
    dispatch({ type: START_LOADING });
    try {
      const response = await API.get("mctestapi", "/mctest");
      const data = response.data.Items;
      dispatch({ type: SINGLE_PATIENT_API, payload: { data, id } });
    } catch (error) {
      console.log("errrrou");
    }
  };

  useEffect(() => {
    apiGetData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        openMenu,
        closeMenu,
        toSubmit,
        justSubmited,
        loadStop,
        loadStart,
        apiGetData,
        apiSinglePatientData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
