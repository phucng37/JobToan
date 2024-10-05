import { all, call } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import { registerSaga } from "./registerSaga";
import { productListSaga } from "./productListSaga";
import cartSaga from "./cartSaga";
import { brandSaga } from "./brandSaga";
import orderSaga from "./orderSaga";

export default function* rootSaga() {
  yield all([
    call(loginSaga),
    call(registerSaga),
    call(productListSaga),
    call(cartSaga),
    call(brandSaga),
    call(orderSaga),
  ]);
}
