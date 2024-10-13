import { Link } from "react-router-dom";
import {
  handleGetOrderRedux,
  handleStartUpdatedOrderRedux,
  status,
  statusOrder,
} from "../../redux/slice/orderSlice";
import { ToastSuccess } from "../../notifi/toastify";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import { FaCalculator } from "react-icons/fa";
import { createFilterContext } from "../../context/ContextFilter";
import { handleStartDeleteToCartRedux } from "../../redux/slice/cartSlice";

const OrdersView = () => {
  const isStatusOrder = useSelector(
    (state) => state.orderReducer.isStatusOrder
  );
  const statusOr = useSelector((state) => state.orderReducer.statusOrder);
  const idOrder = useSelector((state) => state.orderReducer.idOrder);
  const dataOrder = useSelector((state) => state.orderReducer.dataOrder);
  const dispatch = useDispatch();

  const { idRef } = useContext(createFilterContext);

  useEffect(() => {
    if (isStatusOrder === status.BOUGHT || isStatusOrder === status.NOTYET) {
      if (isStatusOrder === status.BOUGHT) {
        ToastSuccess("Đặt hàng thành công");
        dispatch(handleStartDeleteToCartRedux(idRef.current));
      }
      dispatch(handleGetOrderRedux());
    }
  }, [isStatusOrder]);

  useEffect(() => {
    if (statusOr === statusOrder.COMPLETED) {
      ToastSuccess(`đơn hàng có mã ${idOrder} đã được giao`);
      dispatch(handleGetOrderRedux());
    }
  }, [idOrder, statusOr]);
  console.log("dataorrder", dataOrder);

  const [showModal, setShowModal] = useState("");

  const handleClose = () => setShowModal(null);
  const handleShow = (_id) => setShowModal(_id);

  return (
    <div className="container mb-3">
      {isStatusOrder === status.BUYING ? (
        <div
          className="text-center mt-3"
          style={{
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ width: "5rem", height: "5rem" }}
          />
          <div className="mt-3">
            <FaCalculator size={50} /> {/* Icon calculator */}
          </div>
          <p>Đang tính toán hóa đơn, vui lòng đợi...</p>
        </div>
      ) : [status.BOUGHT, status.GOT].includes(isStatusOrder) ? (
        <>
          <h4 className="my-3">Orders</h4>
          <div className="row g-3">
            {dataOrder.map((item, index) => {
              console.log(item);

              return (
                <div className="col-md-6" key={index}>
                  <div className="card">
                    <div className="row g-0">
                      <div className="col-md-12">
                        <div className="card-header">
                          <div className="small">
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <span
                                className="border bg-secondary rounded-left px-2 text-white"
                                style={{
                                  width: "80px",
                                  display: "inline-block",
                                  textAlign: "center",
                                  flexShrink: 0,
                                }}
                              >
                                Order ID
                              </span>
                              <span
                                className="border bg-white rounded-right"
                                style={{
                                  textAlign: "center",
                                  flexGrow: 1,
                                }}
                              >
                                {item._id}
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <span
                                className="border bg-secondary rounded-left text-white"
                                style={{
                                  width: "80px",
                                  display: "inline-block",
                                  textAlign: "center",
                                  flexShrink: 0,
                                }}
                              >
                                Date
                              </span>
                              <span
                                className="border bg-white rounded-right px-2"
                                style={{
                                  textAlign: "center",
                                  flexGrow: 1,
                                }}
                              >
                                {item.createAt}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="small">
                            <span className="text-muted me-2">
                              Total Price:
                            </span>
                            <span className="me-3">{item.totalPrice} VND</span>
                          </div>
                          <div className="mt-2"></div>
                        </div>
                        <div
                          className="card-footer d-flex justify-content-between align-items-center"
                          style={{ height: "50px" }}
                        >
                          <div>
                            <span
                              className="me-2"
                              onClick={() => {
                                dispatch(
                                  handleStartUpdatedOrderRedux(item._id)
                                );
                              }}
                            >
                              Status:
                            </span>
                            <span
                              className={
                                item.status === statusOrder.COMPLETED
                                  ? "text-success"
                                  : item.status === statusOrder.PROCESSING
                                    ? "text-primary"
                                    : item.status === statusOrder.PENDING
                                      ? "text-warning"
                                      : "text-danger"
                              }
                            >
                              {item.status === statusOrder.PROCESSING ? (
                                <button className="btn btn-primary">
                                  <i
                                    className={`bi me-1 ${item.status === statusOrder.COMPLETED ? "bi-check-circle-fill" : item.status === statusOrder.PROCESSING ? "bi-clock-history" : item.status === statusOrder.PENDING ? "bi-exclamation-triangle-fill" : "bi-x-circle-fill"}`}
                                  ></i>
                                  {item.status}
                                </button>
                              ) : (
                                <>
                                  <i
                                    className={`bi me-1 ${item.status === statusOrder.COMPLETED ? "bi-check-circle-fill" : item.status === statusOrder.PROCESSING ? "bi-clock-history" : item.status === statusOrder.PENDING ? "bi-exclamation-triangle-fill" : "bi-x-circle-fill"}`}
                                  ></i>
                                  {item.status}
                                </>
                              )}
                            </span>
                          </div>
                          <div>
                            <div className="container">
                              <button
                                className="btn btn-primary"
                                onClick={() => handleShow(item._id)}
                              >
                                Xem Đơn Hàng
                              </button>

                              {/* Modal */}
                              <Modal
                                show={showModal === item._id}
                                onHide={() => handleClose(item._id)}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Danh Sách Đơn Hàng</Modal.Title>
                                </Modal.Header>
                                <Modal.Body
                                  style={{
                                    maxHeight: "400px",
                                    overflowY: "auto",
                                  }}
                                >
                                  <ul className="list-group">
                                    {item?.products?.map((item2, index2) => (
                                      <li
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                        key={index2}
                                      >
                                        <img
                                          style={{ width: "100px" }}
                                          src={item2.product.image}
                                          alt="Product 1"
                                          className="img-thumbnail mr-3"
                                        />
                                        <div>
                                          <strong>{item2.product.name}</strong>
                                          <p>Số lượng: {item2.quantity}</p>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </Modal.Body>
                                <Modal.Footer>
                                  <button
                                    className="btn btn-secondary"
                                    onClick={() => handleClose(item._id)}
                                  >
                                    Đóng
                                  </button>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default OrdersView;
