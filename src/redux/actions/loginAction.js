import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  LOGOUT,
} from "../constants/action-type";

export const getLogin = (user) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUESTED });
    await axios
      .post("http://34.245.213.76:3000/auth/signin", {
        username: user.username,
        password: user.password,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const token = response.data.accessToken;
        localStorage.setItem("token", token);

        dispatch({ type: LOGIN_SUCCESS, response });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILED, err });
      });
  };
};
export const logoutUser = () => ({
  type: LOGOUT,
});
