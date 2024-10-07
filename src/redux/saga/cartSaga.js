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
    const product = store1.getState().cartReducer.product;
    const quantity = store1.getState().cartReducer.quantity;

    yield addToCartApi("/cart/add-product", {
      product,
      quantity,
    });

    yield put(handleFinishedAddingToCartRedux());
    ToastSuccess("Đã thêm sản phẩm vào giỏ hàng");
  } catch (error) {
    ToastError("Lỗi khi thêm sản phẩm vào giỏ hàng");
  }
}
function* handleGetToCartSaga() {
  try {
    const userId = localStorage.getItem("userId");
    const data = yield getToCartApi(`/cart/show/${userId}`);
    console.log("cart", data);

    yield put(handleGetToCartDoneRedux(data.data.userInfo.cart.products));
  } catch (error) {
    console.log(error);
  }
}
function* handleUpdateToCartSaga() {
  try {
    const productId = store1.getState().cartReducer.productId;
    const quantity = store1.getState().cartReducer.quantity;
    const data = yield updateToCartApi("/cart/update-product", {
      productId,
      quantity,
    });
    ToastSuccess(data.data.message);
    yield put(handleFinishedUpdatedToCartRedux());
  } catch (error) {
    console.log(error);
  }
}
function* handleDeleteToCartSaga() {
  try {
    const userId = localStorage.getItem("userId");
    const productId = store1.getState().cartReducer.productId;
    const data = yield deleteToCartApi("/cart/remove-product", {
      productId,
      userId,
    });
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
  while (true) {
    yield take(GET_TO_CART);
    yield fork(handleGetToCartSaga);
  }
}
