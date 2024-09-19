/* eslint-disable default-case */
const initBrand = {
  dataBrand: [
    {
      name: "",
      icon: "",
      img: "",
      products: [],
      createdDate: "",
    },
  ],
  isGetDataBrand: false,
};

export const GET_BRAND_BEGIN = "GET_BRAND_BEGIN";
export const GET_BRAND_DONE = "GET_BRAND_DONE";

export const BrandSlice = (state = initBrand, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_BRAND_BEGIN:
      newState.isGetDataBrand = false;
      break;
    case GET_BRAND_DONE:
      newState.isGetDataBrand = true;
      newState.dataBrand = action.payload;
      break;
  }
  return newState;
};

export const handleGetBrandBeginRedux = () => ({
  type: GET_BRAND_BEGIN,
});
export const handleGetBrandDoneRedux = (payload) => ({
  type: GET_BRAND_DONE,
  payload,
});
