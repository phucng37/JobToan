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
  totalOrders: 1,
  page: 1,
  isStatusOrder: status.NOTYET,
  bodyOrder: { products: [], userId: "", totalPrice: "" },
  idOrder: "",
  statusOrder: statusOrder.PENDING,
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
      newState.page = action.payload || 1;
      console.log(action, 'newState: ', newState);
      break;
    case GET_ORDER_DONE:
      newState.isStatusOrder = status.GOT;
      console.log('action: ', action);
      newState.dataOrder = action.payload.orders;
      newState.totalOrders = action.payload.totalOrders;
      console.log('NEW STATE: ', newState);
      break;
    case START_UPDATE_ORDER:
      newState.idOrder = action.payload;
      newState.statusOrder = statusOrder.PROCESSING;
      break;
    case FINISHED_UPDATE_ORDER:
      newState.statusOrder = statusOrder.COMPLETED;
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
export const handleGetOrderRedux = (payload) => ({
  type: GET_ORDER,
  payload
});
export const handleGetOrderDoneRedux = (payload) => ({
  type: GET_ORDER_DONE,
  payload,
});

export const handleStartUpdatedOrderRedux = (payload) => ({
  type: START_UPDATE_ORDER,
  payload,
});

export const handleFinishedUpdatedOrderRedux = () => ({
  type: FINISHED_UPDATE_ORDER,
});
