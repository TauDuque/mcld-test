import {
  OPEN_MENU,
  CLOSE_MENU,
  FORM_NOT_SUBMITED,
  FORM_SUBMITED,
  STOP_LOADING,
} from "./actions";

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
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
