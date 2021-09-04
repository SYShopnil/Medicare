import {
  LOGIN_REQUEST,
  LOGIN_SUCCESSFUL,
  LOGIN_UNSUCCESSFULL,
  LOGOUT_PROCESS,
  STORE_USERDATA,
  STORE_USER_FAILED,
} from "../actionType/ActionType";

const token = localStorage.getItem("Authentication");
const header = token
  ? {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  : {};

const isLoggedIn = token ? true : false;

console.log(isLoggedIn);

const initialState = {
  isLoading: true,
  isLoggedIn: isLoggedIn,
  loggedInUserData: "",
  headers: header,
};
const loginReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESSFUL: {
      const token = action.payload;
      const option = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      return {
        ...state,
        headers: option,
        isLoggedIn: true,
      };
    }
    case LOGIN_UNSUCCESSFULL:
      return {
        ...state,
        isLoading: false,
        headers: {},
      };
    case STORE_USERDATA: {
      return {
        ...state,
        isLoading: false,
        loggedInUserData: action.payload,
      };
    }
    case LOGOUT_PROCESS: {
      localStorage.removeItem("Authentication");
      return {
        ...state,
        isLoggedIn: false,
        loggedInUserData: "",
        headers: {},
        isLoading: false,
      };
    }

    case STORE_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        loggedInUserData: "",
      };

    default:
      return state;
  }
};
export default loginReducers;
