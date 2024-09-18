import { all, call } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import { registerSaga } from "./registerSaga";
import { productListSaga } from "./productListSaga";
import cartSaga from "./cartSaga";
import { cateSaga } from "./cateSaga";

export default function* rootSaga() {
  yield all([
    call(loginSaga),
    call(registerSaga),
    call(productListSaga),
    call(cartSaga),
    call(cateSaga),
  ]);
}
