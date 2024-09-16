import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  handleStartBuyRedux,
  handleStartDeleteToCartRedux,
  handleStartUpdatedToCartRedux,
} from "../../redux/slice/cartSlice";
const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);

const data = [
  {
    id: 1,
    img: "../../images/products/tshirt_red_480x400.webp",
    name: "Laptop gaming i5",
    count: 2,
    price: "237",
  },
  {
    id: 2,
    img: "../../images/products/tshirt_grey_480x400.webp",
    name: "ASUS Vivobook",
    count: 5,
    price: "500",
  },
];

const CartView = () => {
  const onSubmitApplyCouponCode = async (values) => {
    alert(JSON.stringify(values));
  };
  const isStatusCart = useSelector((state) => state.cartReducer.isStatusCart);
  const dataCart = useSelector((state) => state.cartReducer.dataCart);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // if (isStatusCart) {
    // setCart(dataCart);
    // setCount(
    //   dataCart.map((item) => ({ idCart: item.id, count: item.count }))
    // );
    // }
    //nháp
    if (!isStatusCart) {
      setCart(data);
      setCount(data.map((item) => ({ idCart: item.id, count: item.count })));
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

  const handlePurchase = (ids = []) => {
    const itemPurchase = count.filter((item) => ids.includes(item.idCart));
    dispatch(
      handleStartBuyRedux(
        itemPurchase.map((item) => ({
          product_id: item.idCart,
          buy_count: item.count,
        }))
      )
    );
  };
  const handleSaveCart = (id) => {
    const itemUpdate = count.find((item) => item.idCart === id);
    dispatch(
      handleStartUpdatedToCartRedux({
        product_id: itemUpdate.idCart,
        buy_count: itemUpdate.count,
        price: cart.find((item) => item.id === id).price,
        name: cart.find((item2) => item2.id === id).name,
      })
    );
  };
  const handleDeleteCart = (id) => {
    dispatch(handleStartDeleteToCartRedux(id));
  };

  const handleAllPurchase = () => {
    dispatch(
      handleStartBuyRedux(
        count.map((item) => ({
          product_id: item.idCart,
          buy_count: item.count,
          price: cart.find((item2) => item2.id === item.idCart).price,
          name: cart.find((item2) => item2.id === item.idCart).name,
        }))
      )
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
                              <img src={item.img} width="80" alt="" />
                            </div>
                            <div className="col">
                              <Link
                                to={`/product/detail/${item.id}`}
                                className="text-decoration-none"
                              >
                                {item.name}
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
                                handleChangeCount("decrement", item.id)
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
                                  (countItem) => countItem.idCart === item.id
                                ).count
                              }
                            />
                            <button
                              className="btn btn-primary text-white"
                              type="button"
                              onClick={() =>
                                handleChangeCount("increment", item.id)
                              }
                            >
                              <i className="bi bi-plus-lg"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <var className="price">
                            {item.price *
                              count.find(
                                (countItem) => countItem.idCart === item.id
                              ).count}
                          </var>
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handlePurchase([item.id])}
                          >
                            <i className="bi bi-bag-fill"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={() => handleSaveCart(item.id)}
                          >
                            <i className="bi bi-save"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteCart(item.id)}
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
                <Link to="/checkout" className="btn btn-primary float-end">
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
                  <dt className="col-6">Total:</dt>
                  <dd className="col-6 text-end  h5">
                    <strong>
                      {cart.reduce(
                        (value, item) =>
                          Number(value) +
                          Number(
                            count.find((item2) => item2.idCart === item.id)
                              ?.count * item.price
                          ),

                        [0]
                      )}{" "}
                      VND
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
      <div className="bg-light border-top p-4">
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
      </div>
    </div>
  );
};

export default CartView;
