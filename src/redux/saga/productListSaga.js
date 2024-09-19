import { put, takeLatest } from "redux-saga/effects";
import {
  GET_PRODUCT_DETAIL_BEGIN,
  GET_PRODUCT_LIST_BEGIN,
  GET_PRODUCT_LIST_BY_PARAMS_BEGIN,
  handleGetProductDetailDoneRedux,
  handleGetProductListByParamsDoneRedux,
  handleGetProductListDoneRedux,
} from "../slice/productListSlice";
import {
  getProductApiById,
  getProductListApi,
  getProductListApiByParams,
} from "../../utils/product-api/productApi";
import { data } from "../../data";
import store1 from "../slice/rootSlice";

function* getDataProductList() {
  try {
    const data = yield getProductListApi();
    // const res = yield Array(10).fill(data.products).flat();
    yield put(handleGetProductListDoneRedux(data.data));
  } catch (error) {
    console.log("lỗi r", error);
  }
}
function* getDataProductDetail() {
  try {
    const idDetail = store1.getState().productListReducer.idDetail;
    const data = yield getProductApiById(idDetail);
    // const res = yield Array(10).fill(data.products).flat();
    yield put(handleGetProductDetailDoneRedux(data.data));
  } catch (error) {
    console.log("lỗi r", error);
  }
}
function* getDataProductListByParams() {
  try {
    const params = store1.getState().productListReducer.queryParams;
    const data = yield getProductListApiByParams(params);
    yield put(handleGetProductListByParamsDoneRedux(data.data));
  } catch (error) {
    console.log("lỗi r", error);
  }
}

export function* productListSaga() {
  yield takeLatest(GET_PRODUCT_LIST_BEGIN, getDataProductList);
  yield takeLatest(GET_PRODUCT_DETAIL_BEGIN, getDataProductDetail);
  yield takeLatest(
    GET_PRODUCT_LIST_BY_PARAMS_BEGIN,
    getDataProductListByParams
  );
}
