import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl/baseurl";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESSFUL,
  LOGIN_UNSUCCESSFULL,
  LOGOUT_PROCESS,
  STORE_USERDATA,
  STORE_USER_FAILED,
} from "../actionType/ActionType";

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccessful = (token) => {
  return {
    type: LOGIN_SUCCESSFUL,
    payload: token,
  };
};
export const logoutProcess = () => {
  return {
    type: LOGOUT_PROCESS,
  };
};

export const loginUnsuccessful = () => {
  return {
    type: LOGIN_UNSUCCESSFULL,
  };
};
export const loginUserData = (data) => {
  return {
    type: STORE_USERDATA,
    payload: data,
  };
};
export const loginUserFailed = () => {
  return {
    type: STORE_USER_FAILED,
  };
};
export const loginProcess = (formData) => async (dispatch, getState) => {
  try {
    dispatch(loginRequest());
    console.log("hello");
    const loginData = await axios.post(`${baseUrl}/user/login`, formData);
    if (loginData.status == 202) {
      const { token, message } = loginData.data;
      localStorage.setItem("Authentication", token); //set the login token into local storage
      dispatch(loginSuccessful(token));
      const { login } = getState();
      const { headers } = login;
      const storeData = await axios.get(
        `${baseUrl}/user/get/own/profile`,
        headers
      );
      if (storeData.status == 202) {
        dispatch(loginUserData(storeData.data));
        alert(loginData.data.message)
      } else {
        dispatch(loginUserFailed());
        alert(loginData.data.message)
      }
    } else {
      dispatch(loginUnsuccessful());
       alert(loginData.data.message)
    }
  } catch (error) {
    dispatch(loginUnsuccessful());
    console.log(error);
  }
};

export const checkUserLoginAction = () => async (dispatch, getState) => {
  const { headers } = getState.login;
  console.log({ headers });
  if (headers !== {}) {
    dispatch(loginSuccessful(localStorage.getItem("Authentication")));
    const { login } = getState();
    const { headers } = login;
    const storeData = await axios.get(
      `${baseUrl}/user/get/own/profile`,
      headers
    );
    if (storeData.status == 202) {
      dispatch(loginUserData(storeData.data.data));
    } else {
      dispatch(loginUserFailed());
    }
  } else {
    console.log(`hello`);
    dispatch(loginUnsuccessful());
    dispatch(loginUserFailed());
  }
};
