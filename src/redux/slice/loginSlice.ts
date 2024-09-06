export type State = {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  isLoginDone: boolean;
  isLoginStatus: boolean;
  access_token: string;
  refresh_token: string;
};

export enum loginEnum {
  START_LOGIN = "START_LOGIN",
  END_LOGIN_SUCCESS = "END_LOGIN_SUCCESS",
  END_LOGIN_FAILED = "END_LOGIN_FAILED",
  LOGGED_OUT = "LOGGED_OUT",
  ACCESS_TOKEN_EXPIRED = "ACCESS_TOKEN_EXPIRED",
}

type loginAction = {
  type: loginEnum;
  payload?:
    | {
        access_token: string;
        refresh_token: string;
      }
    | { firstName: string; lastName: string; phone: string; password: string }
    | { new_access_token: string };
};

const initLogin: State = {
  firstName: "",
  lastName: "",
  phone: "",
  password: "",
  isLoginDone: true,
  isLoginStatus: false,
  access_token: "",
  refresh_token: "",
};

export const loginSlice = (state = initLogin, action: loginAction) => {
  const newState = { ...state };
  switch (action.type) {
    case loginEnum.START_LOGIN:
      newState.isLoginDone = false;
      newState.firstName = action.payload
        ? "firstName" in action.payload
          ? action.payload.firstName
          : ""
        : "";
      newState.lastName = action.payload
        ? "lastName" in action.payload
          ? action.payload.lastName
          : ""
        : "";
      newState.phone = action.payload
        ? "phone" in action.payload
          ? action.payload.phone
          : ""
        : "";
      newState.password = action.payload
        ? "password" in action.payload
          ? action.payload.password
          : ""
        : "";
      break;
    case loginEnum.END_LOGIN_FAILED:
      newState.isLoginDone = true;
      newState.isLoginStatus = false;
      break;
    case loginEnum.END_LOGIN_SUCCESS:
      newState.isLoginDone = true;
      newState.isLoginStatus = true;
      newState.access_token = action.payload
        ? "access_token" in action.payload
          ? action.payload.access_token
          : ""
        : "";
      newState.refresh_token = action.payload
        ? "refresh_token" in action.payload
          ? action.payload.refresh_token
          : ""
        : "";
      localStorage.setItem(
        "access_token",
        action.payload
          ? "access_token" in action.payload
            ? action.payload.access_token
            : ""
          : ""
      );
      localStorage.setItem(
        "refresh_token",
        action.payload
          ? "refresh_token" in action.payload
            ? action.payload.refresh_token
            : ""
          : ""
      );
      break;
    case loginEnum.LOGGED_OUT:
      newState.phone = "";
      newState.password = "";
      newState.firstName = "";
      newState.lastName = "";
      newState.isLoginDone = true;
      newState.isLoginStatus = false;
      newState.access_token = "";
      newState.refresh_token = "";
      break;
    case loginEnum.ACCESS_TOKEN_EXPIRED:
      newState.access_token = action.payload
        ? "new_access_token" in action.payload
          ? action.payload.new_access_token
          : ""
        : "";
  }
  return newState;
};

export const handleStartLoginRedux = (payload: {
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
}) => ({
  type: loginEnum.START_LOGIN,
  payload,
});
export const handleEndSuccessLoginRedux = (payload: {
  access_token: string;
  refresh_token: string;
}) => ({
  type: loginEnum.END_LOGIN_SUCCESS,
  payload,
});
export const handleEndFailedLoginRedux = () => ({
  type: loginEnum.END_LOGIN_FAILED,
});
export const handleLogoutRedux = () => ({
  type: loginEnum.LOGGED_OUT,
});
export const handleAccessTokenExpiredRedux = (payload: {
  new_access_token: string;
}) => ({
  type: loginEnum.ACCESS_TOKEN_EXPIRED,
  payload,
});
