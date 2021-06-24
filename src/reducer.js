import { OPEN_MENU, CLOSE_MENU } from "./actions";

const reducer = (state, action) => {
  if (action.type === OPEN_MENU) {
    return { ...state, is_menu_open: true };
  }
  if (action.type === CLOSE_MENU) {
    return { ...state, is_menu_open: false };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
