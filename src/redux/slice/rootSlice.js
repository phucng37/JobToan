import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import { registerSlice } from "./registerSlice";
import { loginSlice } from "./loginSlice";
import { productListSlice } from "./productListSlice";
import { cartSlice } from "./cartSlice";
import { cateSlice } from "./cateSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  registerReducer: registerSlice,
  loginReducer: loginSlice,
  productListReducer: productListSlice,
  cartReducer: cartSlice,
  cateReducer: cateSlice,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
