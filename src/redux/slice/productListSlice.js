/* eslint-disable default-case */
const initProductList = {
  products: [],
  product: {},
  idDetail: "",
  isGetDataProductList: false,
  isGetDataProductListByParams: false,
  queryParams: {
    sort_by: "",
    categoryId: "",
    rating_filter: "",
    price_max: "",
    price_min: "",
    name: "",
  },
};

export const GET_PRODUCT_LIST_BEGIN = "GET_PRODUCT_LIST_BEGIN";
export const GET_PRODUCT_LIST_DONE = "GET_PRODUCT_LIST_DONE";
export const GET_PRODUCT_DETAIL_BEGIN = "GET_PRODUCT_DETAIL_BEGIN";
export const GET_PRODUCT_DETAIL_DONE = "GET_PRODUCT_DETAIL_DONE";
export const GET_PRODUCT_LIST_BY_PARAMS_BEGIN =
  "GET_PRODUCT_LIST_BY_PARAMS_BEGIN";
export const GET_PRODUCT_LIST_BY_PARAMS_DONE =
  "GET_PRODUCT_LIST_BY_PARAMS_DONE";
export const RESET_BY_PARAMS = "RESET_BY_PARAMS";

export const productListSlice = (state = initProductList, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_PRODUCT_LIST_BEGIN:
      newState.isGetDataProductList = false;
      break;
    case GET_PRODUCT_LIST_DONE:
      newState.isGetDataProductList = true;
      newState.products = action?.payload.products;
      break;
    case GET_PRODUCT_DETAIL_BEGIN:
      newState.idDetail = action.payload;
      break;
    case GET_PRODUCT_DETAIL_DONE:
      newState.product = action.payload.product;
      break;
    case GET_PRODUCT_LIST_BY_PARAMS_BEGIN:
      newState.isGetDataProductListByParams = false;
      newState.queryParams.sort_by = action.payload.sort_by;
      newState.queryParams.categoryId = action.payload.categoryId;
      newState.queryParams.rating_filter = action.payload.rating_filter;
      newState.queryParams.price_min = action.payload.price_min;
      newState.queryParams.price_max = action.payload.price_max;
      newState.queryParams.name = action.payload.name;
      break;
    case GET_PRODUCT_LIST_BY_PARAMS_DONE:
      newState.isGetDataProductListByParams = true;
      newState.products = action.payload.products;
      break;
  }
  return newState;
};

export const handleGetProductListBeginRedux = () => ({
  type: GET_PRODUCT_LIST_BEGIN,
});
export const handleGetProductListDoneRedux = (payload) => ({
  type: GET_PRODUCT_LIST_DONE,
  payload,
});
export const handleGetProductDetailBeginRedux = (payload) => ({
  type: GET_PRODUCT_DETAIL_BEGIN,
  payload,
});
export const handleGetProductDetailDoneRedux = (payload) => ({
  type: GET_PRODUCT_DETAIL_DONE,
  payload,
});

export const handleGetProductListByParamsBeginRedux = (payload) => ({
  type: GET_PRODUCT_LIST_BY_PARAMS_BEGIN,
  payload,
});

export const handleGetProductListByParamsDoneRedux = (payload) => ({
  type: GET_PRODUCT_LIST_BY_PARAMS_DONE,
  payload,
});
