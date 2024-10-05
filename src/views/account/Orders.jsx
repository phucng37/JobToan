import { Link } from "react-router-dom";
import {
  handleGetOrderRedux,
  status,
  statusOrder,
} from "../../redux/slice/orderSlice";
import { ToastSuccess } from "../../notifi/toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import { FaCalculator } from "react-icons/fa";

const OrdersView = () => {
  const isStatusOrder = useSelector(
    (state) => state.orderReducer.isStatusOrder
  );
  const dataOrder = useSelector((state) => state.orderReducer.dataOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isStatusOrder === status.BOUGHT || isStatusOrder === status.NOTYET) {
      isStatusOrder === status.BOUGHT && ToastSuccess("Đặt hàng thành công");
      dispatch(handleGetOrderRedux());
    }
  }, [isStatusOrder]);
  console.log("dataorrder", dataOrder);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <div className="container mb-3">
      <div className="container mt-5">
        <button className="btn btn-primary" onClick={handleShow}>
          Xem Đơn Hàng
        </button>

        {/* Modal */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Danh Sách Đơn Hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product 1"
                  className="img-thumbnail mr-3"
                />
                <div>
                  <strong>Tên Sản Phẩm 1</strong>
                  <p>Số lượng: 2</p>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product 1"
                  className="img-thumbnail mr-3"
                />
                <div>
                  <strong>Tên Sản Phẩm 1</strong>
                  <p>Số lượng: 2</p>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product 1"
                  className="img-thumbnail mr-3"
                />
                <div>
                  <strong>Tên Sản Phẩm 1</strong>
                  <p>Số lượng: 2</p>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product 1"
                  className="img-thumbnail mr-3"
                />
                <div>
                  <strong>Tên Sản Phẩm 1</strong>
                  <p>Số lượng: 2</p>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product 1"
                  className="img-thumbnail mr-3"
                />
                <div>
                  <strong>Tên Sản Phẩm 1</strong>
                  <p>Số lượng: 2</p>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product 2"
                  className="img-thumbnail mr-3"
                />
                <div>
                  <strong>Tên Sản Phẩm 2</strong>
                  <p>Số lượng: 1</p>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product 3"
                  className="img-thumbnail mr-3"
                />
                <div>
                  <strong>Tên Sản Phẩm 3</strong>
                  <p>Số lượng: 5</p>
                </div>
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Đóng
            </button>
          </Modal.Footer>
        </Modal>
      </div>

      <div
        class="modal fade"
        id="orderModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="orderModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="orderModalLabel">
                Danh Sách Đơn Hàng
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Product 1"
                    class="img-thumbnail mr-3"
                  />
                  <div>
                    <strong>Tên Sản Phẩm 1</strong>
                    <p>Số lượng: 2</p>
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Product 2"
                    class="img-thumbnail mr-3"
                  />
                  <div>
                    <strong>Tên Sản Phẩm 2</strong>
                    <p>Số lượng: 1</p>
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Product 3"
                    class="img-thumbnail mr-3"
                  />
                  <div>
                    <strong>Tên Sản Phẩm 3</strong>
                    <p>Số lượng: 5</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
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
            {dataOrder.map((item, index) => (
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
                          <span className="text-muted me-2">Total Price:</span>
                          <span className="me-3">{item.totalPrice} VND</span>
                        </div>
                        <div className="mt-2"></div>
                      </div>
                      <div className="card-footer d-flex justify-content-between">
                        <div>
                          <span className="me-2">Status:</span>
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
                            <i
                              className={`bi me-1 ${item.status === statusOrder.COMPLETED ? "bi-check-circle-fill" : item.status === statusOrder.PROCESSING ? "bi-clock-history" : item.status === statusOrder.PENDING ? "bi-exclamation-triangle-fill" : "bi-x-circle-fill"}`}
                            ></i>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default OrdersView;
