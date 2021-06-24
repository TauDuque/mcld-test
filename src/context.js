import React, { useContext, useReducer, useEffect, useState } from "react";
import { API } from "aws-amplify";

import { OPEN_MENU, CLOSE_MENU, DATA_HANDLER } from "./actions";

import reducer from "./reducer";

const initialState = {
  is_menu_open: false,
  dataDates: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const apiData = async () => {
    try {
      const response = await API.get("mctestapi", "/mctest");
      const dataDates = response.data.Items;
      dispatch({ type: DATA_HANDLER, payload: dataDates });
    } catch (error) {
      console.log("errrrou");
    }
  };
  useEffect(() => {
    apiData();
  }, []);

  const openMenu = () => {
    dispatch({ type: OPEN_MENU });
  };
  const closeMenu = () => {
    dispatch({ type: CLOSE_MENU });
  };

  return (
    <AppContext.Provider value={{ ...state, openMenu, closeMenu }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGLobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
