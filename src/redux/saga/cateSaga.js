import { put, takeLatest } from "redux-saga/effects";
import store1 from "../slice/rootSlice";
import { GET_CATE_BEGIN, handleGetCateDoneRedux } from "../slice/cateSlice";
import { getCateApi } from "../../utils/cate-api/cateApi";

function* getDataCateSaga() {
  try {
    const data = yield getCateApi();
    yield put(handleGetCateDoneRedux(data.data));
  } catch (error) {
    console.log("lỗi r", error);
  }
}

export function* cateSaga() {
  yield takeLatest(GET_CATE_BEGIN, getDataCateSaga);
}
