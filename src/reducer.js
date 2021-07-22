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

import paginate from "./utils/paginate";

const reducer = (state, action) => {
  if (action.type === OPEN_MENU) {
    return { ...state, is_menu_open: true };
  }
  if (action.type === CLOSE_MENU) {
    return { ...state, is_menu_open: false };
  }
  if (action.type === FORM_NOT_SUBMITED) {
    return { ...state, is_form_submited: false };
  }
  if (action.type === FORM_SUBMITED) {
    return { ...state, is_form_submited: true };
  }
  if (action.type === STOP_LOADING) {
    return { ...state, is_loading: false };
  }
  if (action.type === START_LOADING) {
    return { ...state, is_loading: true };
  }
  if (action.type === API_DATA) {
    const pages = paginate(action.payload);
    return {
      ...state,
      is_loading: false,
      api_data: action.payload,
      patients: pages,
    };
  }
  if (action.type === SINGLE_PATIENT_API) {
    const { id, data } = action.payload;
    const singlePatient = data.find((item) => item.id === id);
    return { ...state, is_loading: false, singleData: singlePatient };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
