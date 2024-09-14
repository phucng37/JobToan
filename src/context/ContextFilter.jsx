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
  console.log("isAddToCartSucces", isAddToCartSuccess);

  const dispatch = useDispatch();

  const handleClickAddToCart = (product_id, buy_count) => {
    console.log({ product_id, buy_count });

    dispatch(handleStartAddingToCartRedux({ product_id, buy_count }));
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
    // dispatch(
    //   handleGetProductListByParamsDoneRedux({
    //     products: [
    //       {
    //         id: 1,
    //         sku: "FAS-01",
    //         link: "/product/detail",
    //         name: "Great product name goes here",
    //         img: "../../images/products/tshirt_red_480x400.webp",
    //         price: 180,
    //         originPrice: 200,
    //         discountPrice: 20,
    //         discountPercentage: 10,
    //         isNew: true,
    //         isHot: false,
    //         star: 4,
    //         isFreeShipping: true,
    //         description:
    //           "Nulla sodales sit amet orci eu vehicula. Curabitur metus velit, fermentum a velit ac, sodales egestas lacus. Etiam congue velit vel luctus dictum. Pellentesque at pellentesque sapien.",
    //       },
    //       {
    //         id: 3,
    //         sku: "FAS-03",
    //         link: "/product/detail",
    //         name: "Great product name goes here",
    //         img: "../../images/products/tshirt_black_480x400.webp",
    //         price: 1900,
    //         originPrice: 2000,
    //         discountPrice: 100,
    //         discountPercentage: 0,
    //         isNew: true,
    //         isHot: true,
    //         star: 2,
    //         isFreeShipping: true,
    //         description:
    //           "Vivamus sapien eros, molestie sed lacus vitae, lacinia volutpat ipsum. Nam sollicitudin lorem eget ornare vulputate.",
    //       },
    //       {
    //         id: 1,
    //         sku: "FAS-01",
    //         link: "/product/detail",
    //         name: "Great product name goes here",
    //         img: "../../images/products/tshirt_red_480x400.webp",
    //         price: 180,
    //         originPrice: 200,
    //         discountPrice: 20,
    //         discountPercentage: 10,
    //         isNew: true,
    //         isHot: false,
    //         star: 4,
    //         isFreeShipping: true,
    //         description:
    //           "Nulla sodales sit amet orci eu vehicula. Curabitur metus velit, fermentum a velit ac, sodales egestas lacus. Etiam congue velit vel luctus dictum. Pellentesque at pellentesque sapien.",
    //       },
    //       {
    //         id: 3,
    //         sku: "FAS-03",
    //         link: "/product/detail",
    //         name: "Great product name goes here",
    //         img: "../../images/products/tshirt_black_480x400.webp",
    //         price: 1900,
    //         originPrice: 2000,
    //         discountPrice: 100,
    //         discountPercentage: 0,
    //         isNew: true,
    //         isHot: true,
    //         star: 2,
    //         isFreeShipping: true,
    //         description:
    //           "Vivamus sapien eros, molestie sed lacus vitae, lacinia volutpat ipsum. Nam sollicitudin lorem eget ornare vulputate.",
    //       },
    //       {
    //         id: 1,
    //         sku: "FAS-01",
    //         link: "/product/detail",
    //         name: "Great product name goes here",
    //         img: "../../images/products/tshirt_red_480x400.webp",
    //         price: 180,
    //         originPrice: 200,
    //         discountPrice: 20,
    //         discountPercentage: 10,
    //         isNew: true,
    //         isHot: false,
    //         star: 4,
    //         isFreeShipping: true,
    //         description:
    //           "Nulla sodales sit amet orci eu vehicula. Curabitur metus velit, fermentum a velit ac, sodales egestas lacus. Etiam congue velit vel luctus dictum. Pellentesque at pellentesque sapien.",
    //       },
    //       {
    //         id: 3,
    //         sku: "FAS-03",
    //         link: "/product/detail",
    //         name: "Great product name goes here",
    //         img: "../../images/products/tshirt_black_480x400.webp",
    //         price: 1900,
    //         originPrice: 2000,
    //         discountPrice: 100,
    //         discountPercentage: 0,
    //         isNew: true,
    //         isHot: true,
    //         star: 2,
    //         isFreeShipping: true,
    //         description:
    //           "Vivamus sapien eros, molestie sed lacus vitae, lacinia volutpat ipsum. Nam sollicitudin lorem eget ornare vulputate.",
    //       },
    //       {
    //         id: 1,
    //         sku: "FAS-01",
    //         link: "/product/detail",
    //         name: "Great product name goes here",
    //         img: "../../images/products/tshirt_red_480x400.webp",
    //         price: 180,
    //         originPrice: 200,
    //         discountPrice: 20,
    //         discountPercentage: 10,
    //         isNew: true,
    //         isHot: false,
    //         star: 4,
    //         isFreeShipping: true,
    //         description:
    //           "Nulla sodales sit amet orci eu vehicula. Curabitur metus velit, fermentum a velit ac, sodales egestas lacus. Etiam congue velit vel luctus dictum. Pellentesque at pellentesque sapien.",
    //       },
    //       {
    //         id: 3,
    //         sku: "FAS-03",
    //         link: "/product/detail",
    //         name: "Great product name goes here",
    //         img: "../../images/products/tshirt_black_480x400.webp",
    //         price: 1900,
    //         originPrice: 2000,
    //         discountPrice: 100,
    //         discountPercentage: 0,
    //         isNew: true,
    //         isHot: true,
    //         star: 2,
    //         isFreeShipping: true,
    //         description:
    //           "Vivamus sapien eros, molestie sed lacus vitae, lacinia volutpat ipsum. Nam sollicitudin lorem eget ornare vulputate.",
    //       },
    //     ],
    //   })
    // );
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
