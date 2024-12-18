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
  CTooltip,
} from "@coreui/react";
import { DocsExample } from "src/components";
import { Link, useParams } from "react-router-dom";
import { instanceAxios } from "../../utils/https";
import ReactPaginate from "react-paginate";
import {
  getIndex,
  getTotalPages,
  paginateConfig,
} from "../../utils/paginationUtils";
import { FaEdit } from "react-icons/fa";
import { MdDoneOutline, MdOutlineCancel } from "react-icons/md";
import Toast from "src/components/Toast";
import { formatDateToVN } from "../../utils/date";

const STATUSES = ["PENDING", "COMPLETED", "PROCESSING", "CANCELLED"];
const FIELDS = [
  "id",
  "orderId",
  "customer",
  "address",
  "orderTotal",
  "status",
  "createdAt",
];

const columns = FIELDS.map((field) => {
  const column = {
    key: field,
    _props: { scope: "col" },
  };
  switch (field) {
    case "id":
      column.label = "#";
      break;
    case "orderId":
      column.label = "Order id";
      break;
    case "orderTotal":
      column.label = "Order Total";
      break;
    case "createdAt":
      column.label = "Created at";
      break;
    default:
      break;
  }
  return column;
});

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

  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
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
  
  const mapToItems = (orders) =>
    orders?.map((order, index) => ({
      id: startIndex + index + 1,
      orderId: order?._id,
      customer: order?.customerName,
      address: <CTooltip content={order?.customerAddress}>
        <p style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '300px'
        }}>{order?.customerAddress}</p>
      </CTooltip>,
      orderTotal: order?.totalPrice,
      status: (
        <>
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
              <MdDoneOutline
                size={30}
                color="#2eb85c"
                onClick={() => handleUpdateStatus(order?._id)}
              />
              <MdOutlineCancel
                color="#e55353"
                size={30}
                onClick={handleCancelEdit}
              />
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
        </>
      ),
      createdAt: formatDateToVN(order?.createdAt),
    }));
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable columns={columns} items={mapToItems(orders)}/>
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
