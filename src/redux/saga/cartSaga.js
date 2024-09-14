import { fork, put, take, takeLeading } from "redux-saga/effects";
import {
  GET_TO_CART,
  handleFinishedAddingToCartRedux,
  handleFinishedBuyRedux,
  handleFinishedDeleteToCartRedux,
  handleFinishedUpdatedToCartRedux,
  handleGetToCartDoneRedux,
  START_ADDING_TO_CART,
  START_BUY_PURCHASE,
  START_DELETE_TO_CART,
  START_UPDATE_TO_CART,
} from "../../redux/slice/cartSlice";
import store1 from "../../redux/slice/rootSlice";
import { ToastError, ToastSuccess } from "../../notifi/toastify";
import {
  addToCartApi,
  buyPurchasesApi,
  deleteToCartApi,
  getToCartApi,
  updateToCartApi,
} from "../../utils/cart-api/cartApi";

function* handleAddToCartSaga() {
  try {
    const product_id = store1.getState().cartReducer.product_id;
    const buy_count = store1.getState().cartReducer.buy_count;
    const data = yield addToCartApi("/cart/add-to-cart", {
      product_id,
      buy_count,
    });
    yield put(
      handleFinishedAddingToCartRedux({
        data: data.data.data,
      })
    );
    ToastSuccess("Đã thêm sản phẩm vào giỏ hàng");
  } catch (error) {
    ToastError("Lỗi khi thêm sản phẩm vào giỏ hàng");
  }
}
function* handleGetToCartSaga() {
  try {
    const data = yield getToCartApi("/cart");
    yield put(handleGetToCartDoneRedux(data.data.data));
  } catch (error) {
    console.log(error);
  }
}
function* handleUpdateToCartSaga() {
  try {
    const product_id = store1.getState().cartReducer.product_id;
    const buy_count = store1.getState().cartReducer.buy_count;
    yield updateToCartApi("/cart/update-purchase", {
      product_id,
      buy_count,
    });
    yield put(handleFinishedUpdatedToCartRedux());
  } catch (error) {
    console.log(error);
  }
}
function* handleDeleteToCartSaga() {
  try {
    const purchase_id = store1.getState().cartReducer.purchase_id;
    const data = yield deleteToCartApi("/cart", purchase_id);
    ToastSuccess(data.data.message);
    yield put(handleFinishedDeleteToCartRedux());
  } catch (error) {
    ToastError("Không thể xóa đơn hàng");
  }
}
function* handleBuyPurchaseSaga() {
  try {
    const dataBuyPurchase = store1.getState().cartReducer.dataBuyPurchase;
    const data = yield buyPurchasesApi("/cart/buy-products", dataBuyPurchase);
    ToastSuccess(data.data.message);
    yield put(handleFinishedBuyRedux());
  } catch (error) {
    ToastError("Không thể mua hàng");
  }
}

export default function* cartSaga() {
  yield takeLeading(START_ADDING_TO_CART, handleAddToCartSaga);
  yield takeLeading(START_UPDATE_TO_CART, handleUpdateToCartSaga);
  yield takeLeading(START_DELETE_TO_CART, handleDeleteToCartSaga);
  yield takeLeading(START_BUY_PURCHASE, handleBuyPurchaseSaga);
  yield take(GET_TO_CART);
  yield fork(handleGetToCartSaga);
}
