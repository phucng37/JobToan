import { fork, put, take, takeLeading } from "redux-saga/effects";
import store1 from "../../redux/slice/rootSlice";
import { ToastError, ToastSuccess } from "../../notifi/toastify";
import { getToCartApi } from "../../utils/cart-api/cartApi";
import {
  GET_ORDER,
  handleFinishedOrderRedux,
  handleFinishedUpdatedOrderRedux,
  handleGetOrderDoneRedux,
  START_ORDER,
  START_UPDATE_ORDER,
} from "../slice/orderSlice";
import {
  addOrderApi,
  getOrderApi,
  updateOrderApi,
} from "../../utils/order-api/orderApi";

function* handleAddOrderSaga() {
  try {
    const bodyOrder = store1.getState().orderReducer.bodyOrder;

    yield addOrderApi("/order/create", bodyOrder);

    yield put(handleFinishedOrderRedux());
  } catch (error) {
    ToastError("Lỗi khi mua hàng");
  }
}
function* handleGetOrderSaga() {
  try {
    const userId = localStorage.getItem("userId");
    const data = yield getOrderApi(`order/recentOrder/${userId}`);
    console.log("order", data);

    yield put(handleGetOrderDoneRedux(data.data.orders));
  } catch (error) {
    console.log(error);
  }
}
function* handleUpdateOrderSaga() {
  try {
    // const productId = store1.getState().orderReducer.productId;
    // const status = store1.getState().orderReducer.status;
    const data = yield updateOrderApi("/cart/update-product", {
      productId,
      status,
    });
    ToastSuccess(data.data.message);
    yield put(handleFinishedUpdatedOrderRedux());
  } catch (error) {
    console.log(error);
  }
}

export default function* orderSaga() {
  yield takeLeading(START_ORDER, handleAddOrderSaga);
  yield takeLeading(START_UPDATE_ORDER, handleUpdateOrderSaga);
  while (true) {
    yield take(GET_ORDER);
    yield fork(handleGetOrderSaga);
  }
}
