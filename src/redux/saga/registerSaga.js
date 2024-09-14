import { takeLeading } from "redux-saga/effects";
import {
  handleEndRegisterFailedRedux,
  handleEndRegisterSuccessRedux,
  START_REGISTER,
} from "../slice/registerSlice";
import store from "../slice/rootSlice";
import { postApiRegister } from "../../utils/register-api/registerApi";
import { ToastError, ToastSuccess } from "../../notifi/toastify";

function* handleStartRegister() {
  const phone = store.getState().registerReducer.phone;
  const password = store.getState().registerReducer.password;
  try {
    const data = yield postApiRegister("register", { phone, password });
    ToastSuccess(data.data.message);
    store.dispatch(handleEndRegisterSuccessRedux());
  } catch (error) {
    ToastError(error?.response?.data?.data?.email);
    store.dispatch(handleEndRegisterFailedRedux());
  }
}

export function* registerSaga() {
  yield takeLeading(START_REGISTER, handleStartRegister);
}
