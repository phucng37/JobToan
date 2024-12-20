/* eslint-disable default-case */
const initProductList = {
  products: [],
  bestsellers: [],
  product: {},
  idDetail: "",
  isGetDataProductList: false,
  isStarted: false,
  isGetDataProductListByParams: false,
  queryParams: {
    categoryId: "",
    brandId: "",
    review: "",
    priceMax: "",
    priceMin: "",
    productName: "",
    sortBy:''
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
export const GET_BESTSELLERS = "GET_BESTSELLERS";
export const SET_BESTSELLERS = "SET_BESTSELLERS";

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
      newState.queryParams.categoryId = action.payload.categoryId;
      newState.queryParams.brandId = action.payload.brandId;
      newState.queryParams.review = action.payload.review;
      newState.queryParams.priceMin = action.payload.priceMin;
      newState.queryParams.priceMax = action.payload.priceMax;
      newState.queryParams.productName = action.payload.productName;
      newState.queryParams.sortBy=action.payload.sortBy
      break;
    case GET_PRODUCT_LIST_BY_PARAMS_DONE:
      newState.isGetDataProductListByParams = true;
      newState.products = action.payload.products;
      break;
    case SET_BESTSELLERS:
      console.log(action);
      newState.bestsellers = action.payload.bestsellers;
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

export const handleGetBestSellers = () => ({
  type: GET_BESTSELLERS,
});

export const handleSetBestSellers = (payload) => ({
  type: SET_BESTSELLERS,
  payload
});

export const handleGetProductListByParamsDoneRedux = (payload) => ({
  type: GET_PRODUCT_LIST_BY_PARAMS_DONE,
  payload,
});
