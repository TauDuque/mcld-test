import React, { useContext, useReducer, useEffect, useState } from "react";

import {
  OPEN_MENU,
  CLOSE_MENU,
  FORM_NOT_SUBMITED,
  FORM_SUBMITED,
  START_LOADING,
  STOP_LOADING,
} from "./actions";

import reducer from "./reducer";

const initialState = {
  show_menu: false,
  is_menu_open: false,
  is_form_submited: true,
  is_loading: true,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [menuMount, setMenuMount] = useState(false);

  const openMenu = () => {
    dispatch({ type: OPEN_MENU });
    setMenuMount(true);
  };
  const closeMenu = () => {
    dispatch({ type: CLOSE_MENU });
    setMenuMount(false);
  };

  const loadStart = () => {
    dispatch({ type: START_LOADING });
  };

  const loadStop = () => {
    dispatch({ type: STOP_LOADING });
  };

  const toSubmit = () => {
    dispatch({ type: FORM_NOT_SUBMITED });
  };
  const justSubmited = () => {
    dispatch({ type: FORM_SUBMITED });
  };

  useEffect(() => {
    loadStart();
  }, [menuMount]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        openMenu,
        closeMenu,
        toSubmit,
        justSubmited,
        loadStart,
        loadStop,
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
