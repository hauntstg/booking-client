import { createStore, combineReducers } from "redux";

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
};

const authReducer = (state = { isLoggedIn: false }, action) => {
  if (action.type === "LOGIN") {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user", JSON.stringify(action.payload));
    return { ...state, isLoggedIn: true };
  }
  if (action.type === "LOGOUT") {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    return { ...state, isLoggedIn: false };
  }
  return state;
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
