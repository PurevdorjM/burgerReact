import axios from "axios";
import { loginUserSuccess } from "./loginActions";

export const signUpUser = (email, password) => {
  return function (dispatch) {
    dispatch(signUpUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnOjaRdC7TlMSqzEnowp50QAJGGL8cK5g",
        data
      )
      .then((result) => {
        const token = result.data.idToken;
        const userId = result.data.localId;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        dispatch(signUpUserSuccess(token, userId));
      })
      .catch((err) => {
        dispatch(signUpUserError(err));
      });
  };
};

export const signUpUserStart = () => {
  return {
    type: "SIGNUP_USER_START",
  };
};

export const signUpUserSuccess = (token, userId) => {
  return {
    type: "SIGNUP_USER_SUCCESS",
    token,
    userId,
  };
};

export const signUpUserError = (error) => {
  return {
    type: "SIGNUP_USER_ERROR",
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expireDate");
  localStorage.removeItem("refreshToken");
  return {
    type: "LOGOUT",
  };
};

export const autoLogoutAfterMillisec = (ms) => {
  return function (dispatch) {
    // token shinechleh

    // axios
    //   .post(
    //     ("https: //securetoken.googleapis.com/v1/token?key=AIzaSyBnOjaRdC7TlMSqzEnowp50QAJGGL8cK5g",
    //     {
    //       grant_type: "refresh_token",
    //       refresh_token: localStorage.get("refresh_token"),
    //     })
    //   )
    //   .then((result) => {
    //     const token = result.data.id_token;
    //     const userId = result.data.user_id;
    //     dispatch(loginUserSuccess(token, userId));
    //   })
    //   .catch((err) => {
    //     dispatch(signUpUserError(err));
    //   });

    // avtomat logout
    setTimeout(() => {
      dispatch(logout());
    }, ms);
  };
};
