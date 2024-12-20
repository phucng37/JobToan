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
import ReactPaginate from "react-paginate";
import {
  getIndex,
  getTotalPages,
  paginateConfig,
} from "../utils/PaginationUtils";
import { ACTION } from "../../constant/action";
import CreateEditCategoryModal from "./components/CreateEditCategoryModal";
import { formatDateToVN } from "../../utils/date";
import DeleteItemModal from "../../components/modals/DeleteItemModal";

const DEFAULT_CATEGORY = {
  id: "",
  name: "",
  icon: "",
};

const FIELDS = ["id", "name", "icon", "createdAt", "action"];

const columns = FIELDS.map((field, index) => {
  const column = {
    key: field,
    _props: { scope: "col" },
  };
  if (field === "id") {
    column.label = "#";
  }
  if (field === "createdAt") {
    column.label = "Created At";
  }
  return column;
});

export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
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
        limit,
      },
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
  const [action, setAction] = useState("");
  const handleAction = useCallback(
    (category, action) => {
      setAction(action);
      setCategory({
        id: category?._id,
        name: category?.name,
        icon: category?.icon,
      });
    },
    [category, isVisible]
  );

  const handleDelete = useCallback(async () => {
    console.log("CATEGORY: ", category);
    try {
      const res = await instanceAxios.delete(
        `category/delete/${category?._id}`
      );
      if (res.status === 200) {
        fetchCategories();
        addToast(() => Toast(res?.data?.message));
      }
    } catch (error) {
      addToast(() => Toast(res?.data?.message));
    } finally {
      handleCloseModal();
    }
  }, [action, category]);

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
    const headerConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      if (action === ACTION.create) {
        res = await instanceAxios.post(
          "category/create",
          payload,
          headerConfig
        );
      } else {
        res = await instanceAxios.put(
          `category/update/${category._id}`,
          payload,
          headerConfig
        );
      }
      if (res.status === 200) {
        fetchCategories();
        addToast(() => Toast(res?.data?.message));
      }
    } catch (error) {
      addToast(() => Toast(res?.data?.message));
    } finally {
      setValidated(false);
      setIsLoading(false);
      handleCloseModal();
    }
  };

  const handleCloseModal = useCallback(() => {
    setAction("");
    setCategory(null);
  }, [action, category]);

  const mapToItems = () =>
    categories?.map((category, index) => ({
      id: startIndex + index + 1,
      name: category?.name,
      icon: (
        <CImage
          hidden={!category?.icon}
          rounded
          thumbnail
          src={category?.icon}
          width={200}
          height={200}
        />
      ),
      createdAt: formatDateToVN(category?.createdAt),
      action: (
        <>
          <CButton
            color="primary"
            onClick={() => handleAction(category, ACTION.edit)}
          >
            Edit
          </CButton>{" "}
          <CButton
            color="danger"
            onClick={() => handleAction(category, ACTION.delete)}
          >
            Delete
          </CButton>
        </>
      ),
    }));

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CButton
              onClick={() => {
                setAction(ACTION.create);
              }}
            >
              Create new category
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable columns={columns} items={mapToItems()} />
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

      <DeleteItemModal
        action={action}
        name={category?.name}
        closeModal={closeModal}
        dispatchDelete={handleDelete}
      />

      <CreateEditCategoryModal
        isLoading={isLoading}
        action={action}
        category={category}
        closeModal={handleCloseModal}
        dispatchSubmit={handleSubmit}
      />

      <CToaster
        className="p-3"
        placement="top-end"
        push={toast}
        ref={toaster}
      />
    </CRow>
  );
}
