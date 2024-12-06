import { lazy, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  handleGetToCartRedux,
  handleStartBuyRedux,
  handleStartDeleteToCartRedux,
  handleStartUpdatedToCartRedux,
} from "../../redux/slice/cartSlice";
import { handleStartOrderRedux, status } from "../../redux/slice/orderSlice";
import ContextFilter, {
  createFilterContext,
} from "../../context/ContextFilter";
import { ToastSuccess } from "../../notifi/toastify";
import { formatToVND } from "../../utils/CurrencyUtils";
const CouponApplyForm = lazy(
  () => import("../../components/others/CouponApplyForm")
);

const CartView = () => {
  const isStatusCart = useSelector((state) => state.cartReducer.isStatusCart);
  const dataCart = useSelector((state) => state.cartReducer.dataCart);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState([]);

  const deleteRef = useRef(false);

  const { idRef } = useContext(createFilterContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isStatusCart) {
      setCart(dataCart);
      setCount(
        dataCart.map((item) => ({
          idCart: item.product._id,
          count: item.quantity,
        }))
      );
    }
  }, [isStatusCart]);

  const handleChangeCount = (action, id) => {
    const element = count.find((item) => item.idCart === id);
    const countClone = count.filter((item) => item.idCart !== id);
    if (action === "decrement" && element.count > 1) {
      element.count -= 1;
    } else if (action === "increment") {
      element.count += 1;
    }
    countClone.push(element);
    setCount(countClone);
  };

  const handlePurchase = (item) => {
    dispatch(
      handleStartOrderRedux({
        products: [{ product: item.product, quantity: item.quantity }],
        userId: localStorage.getItem("userId"),
        totalPrice: item.product.price * item.quantity,
      })
    );
    navigate("/account/orders");
    idRef.current = item.product._id;
  };
  const handleSaveCart = (id) => {
    const itemUpdate = count.find((item) => item.idCart === id);

    dispatch(
      handleStartUpdatedToCartRedux({
        productId: itemUpdate.idCart,
        quantity: itemUpdate.count,
      })
    );
  };
  const handleDeleteCart = (id) => {
    dispatch(handleStartDeleteToCartRedux(id));
    deleteRef.current = true;
  };

  useEffect(() => {
    if (deleteRef.current && isStatusCart) {
      ToastSuccess("Deleted successfully!");
      deleteRef.current = false;
    }
  }, [deleteRef.current, isStatusCart]);

  const handleAllPurchase = () => {
    dispatch(
      handleStartOrderRedux({
        products: cart,
        userId: localStorage.getItem("userId"),
        totalPrice: cart.reduce(
          (value, item) => value + item.quantity * item.product.price,
          0
        ),
      })
    );
  };

  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width={120}>
                        Quantity
                      </th>
                      <th scope="col" width={150}>
                        Price
                      </th>
                      <th scope="col" className="text-end" width={130}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="row">
                            <div className="col-3 d-none d-md-block">
                              <img src={item.product.image} width="80" alt="" />
                            </div>
                            <div className="col">
                              <Link
                                to={`/product/detail/${item.product._id}`}
                                className="text-decoration-none"
                              >
                                {item.product.name}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="input-group input-group-sm mw-140">
                            <button
                              className="btn btn-primary text-white"
                              type="button"
                              onClick={() =>
                                handleChangeCount("decrement", item.product._id)
                              }
                            >
                              <i className="bi bi-dash-lg"></i>
                            </button>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="1"
                              value={
                                count.find(
                                  (countItem) =>
                                    countItem.idCart === item.product._id
                                )?.count
                              }
                            />
                            <button
                              className="btn btn-primary text-white"
                              type="button"
                              onClick={() =>
                                handleChangeCount("increment", item.product._id)
                              }
                            >
                              <i className="bi bi-plus-lg"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <var className="price">
                            {formatToVND(Number(item.product.price) *
                              count.find(
                                (countItem) =>
                                  countItem.idCart === item.product._id
                              )?.count)}
                          </var>
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handlePurchase(item)}
                          >
                            <i className="bi bi-bag-fill"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={() => handleSaveCart(item.product._id)}
                          >
                            <i className="bi bi-save"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteCart(item.product._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer" onClick={handleAllPurchase}>
                <Link
                  to="/account/orders"
                  className="btn btn-primary float-end"
                >
                  Make Purchase <i className="bi bi-chevron-right"></i>
                </Link>
                <Link to="/" className="btn btn-secondary">
                  <i className="bi bi-chevron-left"></i> Continue shopping
                </Link>
              </div>
            </div>
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <i className="bi bi-truck"></i> Free Delivery within 1-2 weeks
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <dl className="row">
                  <dt className="col-3">Total:</dt>
                  <dd className="col-9 text-end  h5">
                    <strong>
                      {formatToVND(cart.reduce(
                        (value, item) =>
                          Number(value) +
                          Number(
                            count.find(
                              (item2) => item2.idCart === item.product._id
                            )?.count * item.product.price
                          ),

                        [0]
                      ))}
                    </strong>
                  </dd>
                </dl>
                <hr />
                <p className="text-center">
                  <img
                    src="../../images/payment/payments.webp"
                    alt="..."
                    height={26}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default CartView;
