import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetProductListByParamsBeginRedux,
  handleGetProductListByParamsDoneRedux,
} from "../redux/slice/productListSlice";
import { handleStartAddingToCartRedux } from "../redux/slice/cartSlice";
import { ToastSuccess } from "../notifi/toastify";
import { useNavigate } from "react-router-dom";

export const createFilterContext = createContext();

const ContextFilter = ({ children }) => {
  const paramsProductRedux = useSelector(
    (state) => state.productListReducer.queryParams
  );

  const isAddToCartSuccess = useSelector(
    (state) => state.cartReducer.isAddToCartSuccess
  );

  const dispatch = useDispatch();

  const handleClickAddToCart = (obj) => {
    dispatch(handleStartAddingToCartRedux(obj));
  };

  const onChangeFilter = (optionParam) => {
    console.log({
      ...paramsProductRedux,
      ...optionParam,
    });

    dispatch(
      handleGetProductListByParamsBeginRedux({
        ...paramsProductRedux,
        ...optionParam,
      })
    );
  };

  useEffect(() => {
    if (isAddToCartSuccess) window.location.href = "/cart";
  }, [isAddToCartSuccess]);

  return (
    <createFilterContext.Provider
      value={{ onChangeFilter, handleClickAddToCart }}
    >
      {children}
    </createFilterContext.Provider>
  );
};
export default ContextFilter;
