/* eslint-disable default-case */
const initCate = {
  dataCate: [
    {
      name: "",
      icon: "",
      img: "",
      products: [],
      createdDate: "",
    },
  ],
  isGetDataCate: false,
};

export const GET_CATE_BEGIN = "GET_CATE_BEGIN";
export const GET_CATE_DONE = "GET_CATE_DONE";

export const cateSlice = (state = initCate, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_CATE_BEGIN:
      newState.isGetDataCate = false;
      break;
    case GET_CATE_DONE:
      newState.isGetDataCate = true;
      newState.dataCate = action.payload;
      break;
  }
  return newState;
};

export const handleGetCateBeginRedux = () => ({
  type: GET_CATE_BEGIN,
});
export const handleGetCateDoneRedux = (payload) => ({
  type: GET_CATE_DONE,
  payload,
});
