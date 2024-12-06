import { call, takeLeading } from "redux-saga/effects";
import {
  CHANGE_PASSWORD,
  handleEndFailedLoginRedux,
  handleEndSuccessLoginRedux,
  START_LOGIN,
} from "../slice/loginSlice";
import store from "../slice/rootSlice";
import postApiLogin, {
  changeApiPassword,
} from "../../utils/login-api/loginApi";
import { ToastError, ToastSuccess } from "../../notifi/toastify";

function* handleLogin() {
  const phone = store.getState().loginReducer.phone;
  const password = store.getState().loginReducer.password;

  try {
    const data = yield call(postApiLogin, "login", { phone, password });
    console.log(data);

    const { role, token, userId } = data.data;
    store.dispatch(handleEndSuccessLoginRedux({ role, token, userId }));
  } catch (error) {
    console.log(error);
    ToastError("Đăng nhập không thành công");
    store.dispatch(handleEndFailedLoginRedux());
  }
}

function* handleChangePassword() {
  const currentPassword = JSON.parse(localStorage.getItem("pw"));
  const newPassword = store.getState().loginReducer.newPassword;
  const userId = localStorage.getItem("userId");
  try {
    const data = yield call(changeApiPassword, "/change-password", {
      currentPassword,
      newPassword,
      userId,
    });
    console.log("chnage", data);
    localStorage.setItem("pw", newPassword);
    ToastSuccess(data?.data?.message);
  } catch (error) {
    ToastError("lỗi khi change pw", error);
  }
}

export default function* loginSaga() {
  yield takeLeading(START_LOGIN, handleLogin);
  yield takeLeading(CHANGE_PASSWORD, handleChangePassword);
}
