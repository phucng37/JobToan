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

    const { role, token,userId } = data.data;
    store.dispatch(handleEndSuccessLoginRedux({ role, token,userId }));
  } catch (error) {
    ToastError("Đăng nhập không thành công");
    store.dispatch(handleEndFailedLoginRedux());
  }
}

function* handleChangePassword() {
  const newPw = store.getState().loginReducer.password;
  try {
    yield call(changeApiPassword, "/changePw", { newPw });
    ToastSuccess("Thay đổi pw thành công");
  } catch (error) {
    ToastError("lỗi khi change pw", error);
  }
}

export default function* loginSaga() {
  yield takeLeading(START_LOGIN, handleLogin);
  yield takeLeading(CHANGE_PASSWORD, handleChangePassword);
}
