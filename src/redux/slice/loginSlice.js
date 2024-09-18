/* eslint-disable default-case */
// export type State = {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   password: string;
//   isLoginDone: boolean;
//   isLoginStatus: boolean;
//   access_token: string;
//   refresh_token: string;
// };

export const START_LOGIN = "START_LOGIN";
export const END_LOGIN_SUCCESS = "END_LOGIN_SUCCESS";
export const END_LOGIN_FAILED = "END_LOGIN_FAILED";
export const LOGGED_OUT = "LOGGED_OUT";
export const ACCESS_TOKEN_EXPIRED = "ACCESS_TOKEN_EXPIRED";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";

// type loginAction = {
//   type: loginEnum;
//   payload?:
//     | {
//         access_token: string;
//         refresh_token: string;
//       }
//     | { firstName: string; lastName: string; phone: string; password: string }
//     | { new_access_token: string };
// };

const initLogin = {
  phone: "",
  password: "123",
  isLoginDone: true,
  isLoginStatus: false,
  access_token: "",
  refresh_token: "",
};

export const loginSlice = (state = initLogin, action) => {
  const newState = { ...state };
  switch (action.type) {
    case START_LOGIN:
      newState.isLoginDone = false;
      newState.phone = action.payload.phone || "";
      newState.password = action.payload.password || "";
      break;
    case END_LOGIN_FAILED:
      newState.isLoginDone = true;
      newState.isLoginStatus = false;
      break;
    case END_LOGIN_SUCCESS:
      newState.isLoginDone = true;
      newState.isLoginStatus = true;
      newState.access_token = action.payload.token || "";
      localStorage.setItem("access_token", action.payload.token || "");
      break;
    case LOGGED_OUT:
      newState.phone = "";
      newState.password = "";
      newState.isLoginDone = true;
      newState.isLoginStatus = false;
      newState.access_token = "";
      break;
    case CHANGE_PASSWORD:
      newState.password = action.payload.new_password || "";
      break;
  }
  return newState;
};

export const handleStartLoginRedux = (payload) => ({
  type: START_LOGIN,
  payload,
});
export const handleEndSuccessLoginRedux = (payload) => ({
  type: END_LOGIN_SUCCESS,
  payload,
});
export const handleEndFailedLoginRedux = () => ({
  type: END_LOGIN_FAILED,
});
export const handleLogoutRedux = () => ({
  type: LOGGED_OUT,
});
export const handleChangePasswordRedux = (payload) => ({
  type: CHANGE_PASSWORD,
  payload,
});
