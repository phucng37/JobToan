/* eslint-disable default-case */
/* eslint-disable no-undef */
export const status = {
  NOTYET: "NOTYET",
  BUYING: "BUYING",
  BOUGHT: "BOUGHT",
  FAILED: "FAILED",
  GETTING: "GETTING",
  GOT: "GOT",
};

export const statusOrder = {
  COMPLETED: "COMPLETED",
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  CANCELLED: "CANCELLED",
};

const initStateOrder = {
  dataOrder: [
    {
      id: "",
      date: new Date(),
      name: "",
      price: "",
      status: statusOrder.PENDING,
      color: "",
    },
  ],
  isStatusOrder: status.NOTYET,
  bodyOrder: { products: [], userId: "", totalPrice: "" },
};

export const START_ORDER = "START_ORDER";
export const FINISHED_ORDER = "FINISHED_ORDER";
export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_DONE = "GET_ORDER_DONE";
export const START_UPDATE_ORDER = "START_UPDATE_ORDER";
export const FINISHED_UPDATE_ORDER = "FINISHED_UPDATE_ORDER";

export const orderSlice = (state = initStateOrder, action) => {
  const newState = { ...state };
  switch (action.type) {
    case START_ORDER:
      newState.isStatusOrder = status.BUYING;
      newState.bodyOrder = action.payload;
      break;
    case FINISHED_ORDER:
      newState.isStatusOrder = status.BOUGHT;
      break;
    case GET_ORDER:
      newState.isStatusOrder = status.GETTING;
      break;
    case GET_ORDER_DONE:
      newState.isStatusOrder = status.GOT;
      newState.dataOrder = action.payload;
      break;
    case START_UPDATE_ORDER:
      //
      break;
    case FINISHED_UPDATE_ORDER:
      //
      break;
  }
  return newState;
};

export const handleStartOrderRedux = (payload) => ({
  type: START_ORDER,
  payload,
});

export const handleFinishedOrderRedux = () => ({
  type: FINISHED_ORDER,
});
export const handleGetOrderRedux = () => ({
  type: GET_ORDER,
});
export const handleGetOrderDoneRedux = (payload) => ({
  type: GET_ORDER_DONE,
  payload,
});

export const handleStartUpdatedOrderRedux = (
  payload = {
    product_id: "",
    status: "",
  }
) => ({
  type: START_UPDATE_ORDER,
  payload,
});

export const handleFinishedUpdatedOrderRedux = () => ({
  type: FINISHED_UPDATE_ORDER,
});
