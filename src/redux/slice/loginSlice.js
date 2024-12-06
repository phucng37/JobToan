export const START_LOGIN = "START_LOGIN";
export const END_LOGIN_SUCCESS = "END_LOGIN_SUCCESS";
export const END_LOGIN_FAILED = "END_LOGIN_FAILED";
export const LOGGED_OUT = "LOGGED_OUT";
export const ACCESS_TOKEN_EXPIRED = "ACCESS_TOKEN_EXPIRED";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";

const initLogin = {
  userId: "",
  phone: "",
  password: "",
  newPassword: "",
  isLoginDone: true,
  isLoginStatus: false,
  access_token: "",
  refresh_token: "",
  role: "user" || "admin",
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
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("role", action.payload.role);
      newState.userId = localStorage.getItem("userId");
      newState.isLoginDone = true;
      newState.isLoginStatus = true;
      newState.role = action.payload.role;
      newState.access_token = action.payload.token || "";
      localStorage.setItem("access_token", action.payload.token || "");
      window.location.href = 'http://localhost:3000/';
      break;
    case LOGGED_OUT:
      newState.phone = "";
      newState.password = "";
      newState.isLoginDone = true;
      newState.isLoginStatus = false;
      newState.access_token = "";
      newState.userId = "";
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      localStorage.removeItem("access_token");
      break;
    case CHANGE_PASSWORD:
      newState.newPassword = action.payload || "";
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
