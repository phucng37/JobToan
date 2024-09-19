import { put, takeLatest } from "redux-saga/effects";
import store1 from "../slice/rootSlice";
import { GET_BRAND_BEGIN, handleGetBrandDoneRedux } from "../slice/brandSlice";
import { getBrandApi } from "../../utils/brand-api/brandApi";

function* getDataBrandSaga() {
  try {
    const data = yield getBrandApi();
    yield put(handleGetBrandDoneRedux(data.data.categories));
  } catch (error) {
    console.log("lỗi r", error);
  }
}

export function* brandSaga() {
  yield takeLatest(GET_BRAND_BEGIN, getDataBrandSaga);
}
