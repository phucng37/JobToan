import { fork, put, take, takeLeading } from "redux-saga/effects";
import store from "../slice/rootSlice";
import { ToastError, ToastSuccess } from "../../notifi/toastify";
import { getToCartApi } from "../../utils/cart-api/cartApi";
import {
  GET_ORDER,
  handleFinishedOrderRedux,
  handleFinishedUpdatedOrderRedux,
  handleGetOrderDoneRedux,
  START_ORDER,
  START_UPDATE_ORDER,
  statusOrder,
} from "../slice/orderSlice";
import {
  addOrderApi,
  getOrderApi,
  updateOrderApi,
} from "../../utils/order-api/orderApi";

function* handleAddOrderSaga() {
  try {
    const bodyOrder = store.getState().orderReducer.bodyOrder;

    yield addOrderApi("/order/create", bodyOrder);

    yield put(handleFinishedOrderRedux());
  } catch (error) {
    ToastError("Lỗi khi mua hàng");
  }
}
function* handleGetOrderSaga() {
  try {
    const userId = localStorage.getItem("userId");
    const page = store.getState().orderReducer.page;
    const res = yield getOrderApi(`order/recentOrder/${userId}`, page);
    console.log("order", res.data);
    yield put(handleGetOrderDoneRedux(res.data));
  } catch (error) {
    console.log(error);
  }
}
function* handleUpdateOrderSaga() {
  try {
    const idOrder = store.getState().orderReducer.idOrder;
    yield updateOrderApi(`/order/update/${idOrder}`, {
      status: statusOrder.COMPLETED,
    });

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
