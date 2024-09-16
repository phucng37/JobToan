/* eslint-disable default-case */
/* eslint-disable no-undef */
const initStateCart = {
  product_id: "",
  buy_count: 0,
  dataCart: [],
  isStatusCart: false,
  dataBuyPurchase: [{ product_id: "", name: "", buy_count: 0, price: 0 }],
};

export const START_ADDING_TO_CART = "START_ADDING_TO_CART";
export const FINISHED_ADDING_TO_CART = "FINISHED_ADDING_TO_CART";
export const GET_TO_CART = "GET_TO_CART";
export const GET_TO_CART_DONE = "GET_TO_CART_DONE";
export const START_UPDATE_TO_CART = "START_UPDATE_TO_CART";
export const FINISHED_UPDATE_TO_CART = "FINISHED_UPDATE_TO_CART";
export const START_DELETE_TO_CART = "START_DELETE_TO_CART";
export const FINISHED_DELETE_TO_CART = "FINISHED_DELETE_TO_CART";
export const START_BUY_PURCHASE = "START_BUY_PURCHASE";
export const FINISHED_BUY_PURCHASE = "FINISHED_BUY_PURCHASE";

export const cartSlice = (state = initStateCart, action) => {
  const newState = { ...state };
  switch (action.type) {
    case START_ADDING_TO_CART:
      newState.product_id = action.payload.product_id;
      newState.buy_count = action.payload.buy_count;
      newState.isStatusCart = false;
      break;
    case FINISHED_ADDING_TO_CART:
      newState.isStatusCart = true;
      const findIndex = newState.dataCart.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      if (findIndex > -1) {
        newState.dataCart[findIndex].buy_count =
          Number(newState.dataCart[findIndex].buy_count) +
          Number(action.payload.buy_count);
      } else {
        newState.dataCart.push(action.payload);
      }
      break;
    case GET_TO_CART:
      newState.isStatusCart = false;
      break;
    case GET_TO_CART_DONE:
      newState.isStatusCart = true;
      newState.dataCart = action.payload;
      break;
    case START_UPDATE_TO_CART:
      newState.isStatusCart = false;
      newState.product_id = action.payload.product_id;
      newState.buy_count = action.payload.buy_count;
      break;
    case FINISHED_UPDATE_TO_CART:
      newState.isStatusCart = true;
      const id = newState.dataCart.findIndex(
        (item) => item.product_id === newState.product_id
      );
      if (id > -1) newState.dataCart[id].buy_count = newState.buy_count;
      break;
    case START_DELETE_TO_CART:
      newState.isStatusCart = false;
      newState.product_id = action.payload;
      break;
    case FINISHED_DELETE_TO_CART:
      newState.isStatusCart = true;
      newState.dataCart = newState.dataCart.filter(
        (item) => newState.product_id !== item.product_id
      );
      break;
    case START_BUY_PURCHASE:
      newState.dataBuyPurchase = action.payload;
      break;
    case FINISHED_BUY_PURCHASE:
      newState.dataCart = newState.dataCart.filter(
        (item) =>
          !newState.dataBuyPurchase
            .map((item2) => item2.product_id)
            .includes(item.product_id)
      );
      break;
  }
  return newState;
};

export const handleStartAddingToCartRedux = (
  payload = {
    product_id: "",
    buy_count: 0,
  }
) => ({
  type: START_ADDING_TO_CART,
  payload,
});

export const handleFinishedAddingToCartRedux = (payload) => ({
  type: FINISHED_ADDING_TO_CART,
  payload,
});
export const handleGetToCartRedux = () => ({
  type: GET_TO_CART,
});
export const handleGetToCartDoneRedux = (payload) => ({
  type: GET_TO_CART_DONE,
  payload,
});

export const handleStartUpdatedToCartRedux = (
  payload = {
    product_id: "",
    buy_count: 0,
  }
) => ({
  type: START_UPDATE_TO_CART,
  payload,
});

export const handleFinishedUpdatedToCartRedux = () => ({
  type: FINISHED_UPDATE_TO_CART,
});
export const handleStartDeleteToCartRedux = (payload) => ({
  type: START_DELETE_TO_CART,
  payload,
});

export const handleFinishedDeleteToCartRedux = () => ({
  type: FINISHED_DELETE_TO_CART,
});
export const handleStartBuyRedux = (
  payload = [{ product_id: "", buy_count: 0, price: 0, name: "" }]
) => ({
  type: START_BUY_PURCHASE,
  payload,
});

export const handleFinishedBuyRedux = () => ({
  type: FINISHED_BUY_PURCHASE,
});
