import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CToaster,
} from "@coreui/react";
import { DocsExample } from "src/components";
import { Link, useParams } from "react-router-dom";
import { instanceAxios } from "../../utils/https";
import ReactPaginate from "react-paginate";
import {
  getIndex,
  getTotalPages,
  paginateConfig,
} from "../../utils/PaginationUtils";
import { FaEdit } from "react-icons/fa";
import { MdDoneOutline, MdOutlineCancel } from "react-icons/md";
import Toast from "src/components/Toast";
const STATUSES = ["PENDING", "COMPLETED", "PROCESSING", "CANCELLED"];

export default function ManageOrder() {
  const [orders, setOrders] = React.useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const startIndex = useMemo(
    () => getIndex(currentPage, limit),
    [currentPage, limit]
  );
  const [selectedItem, setSelectedItem] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [toast, addToast] = useState(0);
  const toaster = React.useRef();
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    console.log(
      `User requested page number ${event.selected}, which is offset `
    );
    setCurrentPage(newOffset);
  };
  const fetchOrders = useCallback(async () => {
    const response = await instanceAxios.get("order/show", {
      params: {
        page: currentPage,
        limit,
      },
    });
    if (response.status === 200) {
      const { orders, totalOrders } = response.data;
      setOrders(orders);
      setTotalPages(getTotalPages(totalOrders, limit));
    }
  }, [currentPage]);

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const handleToggleEdit = (id) => {
    console.log("id: ", id);
    setOrderId(id);
  };
  const handleCancelEdit = () => {
    setOrderId(null);
  };

  const handleUpdateStatus = async () => {
    if (!selectedItem) {
      setOrderId(null);
      setSelectedItem("");
      return;
    }
    const res = await instanceAxios.put(`order/update/${orderId}`, {
      status: selectedItem,
    });
    if (res.status === 200) {
      fetchOrders();
      addToast(() => Toast(res?.data?.message));
      setOrderId(null);
      setSelectedItem("");
    }
    console.log(selectedItem, orderId);
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Order ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created at</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orders?.map((order, index) => (
                  <CTableRow key={order._id}>
                    <CTableHeaderCell scope="row">
                      {startIndex + index + 1}
                    </CTableHeaderCell>
                    <CTableDataCell>{order?._id}</CTableDataCell>
                    <CTableDataCell>{order?.customerName}</CTableDataCell>
                    <CTableDataCell>{order?.totalPrice}</CTableDataCell>
                    <CTableDataCell>
                      {orderId === order?._id && (
                        <div className="d-flex align-items-center gap-3">
                          <CFormSelect
                            width={2}
                            size="sm"
                            onChange={(event) => {
                              setSelectedItem(event.target.value);
                            }}
                          >
                            {STATUSES.map((status, index) => (
                              <option
                                value={status}
                                key={index}
                                selected={order?.status === status}
                              >
                                {status}
                              </option>
                            ))}
                          </CFormSelect>
                          <MdDoneOutline size={30}
                          color="#2eb85c"
                            onClick={() => handleUpdateStatus(order?._id)}
                          />
                          <MdOutlineCancel color="#e55353" size={30} onClick={handleCancelEdit} />
                        </div>
                      )}{" "}
                      {orderId !== order?._id && (
                        <div className="d-flex align-items-center gap-2">
                          <CBadge color="primary">{order?.status}</CBadge>
                          <FaEdit
                            color="#0d6efd"
                            size={20}
                            onClick={() => handleToggleEdit(order?._id)}
                          />
                        </div>
                      )}
                    </CTableDataCell>

                    <CTableDataCell>{(new Date(order?.createdAt)).toDateString()}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
        <div className="float-end">
          <ReactPaginate
            onPageChange={handlePageClick}
            pageCount={totalPages}
            {...paginateConfig}
          />
        </div>
      </CCol>
      <CToaster
        className="p-3"
        placement="top-end"
        push={toast}
        ref={toaster}
      />
    </CRow>
  );
}
