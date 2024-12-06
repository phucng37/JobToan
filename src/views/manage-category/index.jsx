import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CToastHeader,
} from "@coreui/react";
import {
  cilLaptop,
  cilHeadphones,
  cilKeyboard,
  cilMobile,
  cilMouse,
  cilScreenDesktop,
} from "@coreui/icons";
import { DocsExample } from "src/components";
import { Link } from "react-router-dom";
import { instanceAxios } from "../../utils/https";
import CIcon from "@coreui/icons-react";
import Toast from "src/components/Toast";
import ReactPaginate from 'react-paginate';
import { getIndex, getTotalPages, paginateConfig } from "../../utils/PaginationUtils";;

export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [validated, setValidated] = useState(false);
  const [toast, addToast] = useState(0);
  const toaster = React.useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const startIndex = useMemo(
    () => getIndex(currentPage, limit),
    [currentPage, limit]
  );

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    setCurrentPage(newOffset);
  };

  const fetchCategories = useCallback(async () => {
    const res = await instanceAxios.get("category/show", {
      params: {
        page: currentPage,
        limit
      }
    });
    if (res.data && res.status === 200) {
      const { categories, totalCategories } = res.data;
      setCategories(categories);
      setTotalPages(getTotalPages(totalCategories, limit));
    }
  }, [currentPage, limit, totalPages]);

  useEffect(() => {
    fetchCategories();
  }, [currentPage, limit]);

  const handleAction = useCallback(
    (category, action) => {
      setCategory(category);
      if (action === "EDIT") {
        setName(category?.name);
        console.log("category: ", category);
        setIcon(category?.icon);
        setVisible(true);
      } else {
        setIsVisible(true);
      }
    },
    [category, isVisible]
  );

  const handleDelete = useCallback(async () => {
    console.log("CATEGORY: ", category);
    const res = await instanceAxios.delete(`category/delete/${category._id}`);
    if (res.status === 200) {
      fetchCategories();
      setIsVisible(false);
      console.log("res delete: ", res);
      addToast(() => Toast(res?.data?.message));
    }
  }, [isVisible, category]);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
      return;
    }
    let res = null;
    const payload = {
      name,
      icon,
    };
    console.log(payload);
    // return;
    const headerConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (isCreate) {
      res = await instanceAxios.post("category/create", payload, headerConfig);
      setIsCreate(false);
    } else {
      res = await instanceAxios.put(
        `category/update/${category._id}`,
        payload,
        headerConfig
      );
    }
    if (res.status === 200) {
      setValidated(false);
      fetchCategories();
      setVisible(false);
      setName("");
      setIcon(null);
      setIsLoading(false);
      addToast(() => Toast(res?.data?.message));
    }
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CButton
              onClick={() => {
                setName("");
                setIcon(null);
                setCategory(null);
                setIsCreate(true);
                setVisible(true);
              }}
            >
              Create new category
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Icon</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created date</CTableHeaderCell>
                  <CTableHeaderCell scope="col" colSpan={2}>
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {categories.map((category, index) => (
                  <CTableRow key={category._id}>
                    <CTableHeaderCell scope="row">{startIndex + index + 1}</CTableHeaderCell>
                    <CTableDataCell>{category?.name}</CTableDataCell>
                    <CTableDataCell>
                      <CImage
                        hidden={!category?.icon}
                        rounded
                        thumbnail
                        src={category?.icon}
                        width={200}
                        height={200}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      {new Date(category?.createdAt).toDateString()}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        onClick={() => handleAction(category, "EDIT")}
                      >
                        Edit
                      </CButton>{" "}
                      <CButton
                        color="danger"
                        onClick={() => handleAction(category, "DELETE")}
                      >
                        Delete
                      </CButton>
                    </CTableDataCell>
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
            // forcePage={
            //   isGetDataProductListByParams && itemOffset === 0
            //     ? itemOffset
            //     : undefined
            // }
          />
        </div>
      </CCol>

      <CModal
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        aria-labelledby="delete-modal"
      >
        <CModalHeader>
          <CModalTitle id="delete-modal">Notification</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure to delete this category?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleDelete}>
            Yes
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="Write"
      >
        <CModalHeader>
          <CModalTitle id="Write">
            {isCreate ? "Create" : "Edit"} a category
          </CModalTitle>
        </CModalHeader>
        <CForm noValidate validated={validated} onSubmit={handleSubmit}>
          <CModalBody>
            <CCol md={12}>
              <CFormInput
                type="text"
                label="Category name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
              />
            </CCol>
            <CCol md={12} className="mt-2">
              <CImage
                hidden={!category?.icon}
                rounded
                thumbnail
                src={category?.icon}
                width={200}
                height={200}
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="file"
                label="Category icon"
                onChange={(e) => {
                  setIcon(e.target.files[0]);
                }}
                name="name"
              />
            </CCol>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit" disabled={isLoading}>
              Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
      <CToaster
        className="p-3"
        placement="top-end"
        push={toast}
        ref={toaster}
      />
    </CRow>
  );
}
