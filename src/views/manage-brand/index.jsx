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
import { DocsExample } from "src/components";
import { Link } from "react-router-dom";
import { instanceAxios } from "../../utils/https";
import { useForm } from "react-hook-form";
import Toast from "src/components/Toast";
import ReactPaginate from "react-paginate";
import {
  getIndex,
  getTotalPages,
  paginateConfig,
} from "../../utils/paginationUtils";
import DeleteBrandModal from "./components/DeleteBrandModal";
import { ACTION } from "../../constant/action";
import CreateEditBrandModal from "./components/CreateEditBrandModal";

const FIELDS = ["id", "name", "image", "createdAt", "action"];

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

export default function ManageBrand() {
  const [brands, setBrands] = useState([]);
  const [action, setAction] = useState("");
  const [brand, setBrand] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  const [toast, addToast] = useState(0);
  const toaster = React.useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = useMemo(() => getIndex(currentPage, 10), [currentPage]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    criteriaMode: "firstError",
  });

  const fetchBrands = useCallback(async () => {
    const res = await instanceAxios.get("brand/show", {
      params: {
        page: currentPage,
        limit,
      },
    });
    if (res.status === 200 && res.data) {
      const { brands, totalBrands } = res.data;
      console.log(res.data);
      setBrands(brands);
      setTotalPages(getTotalPages(totalBrands, limit));
    }
  }, [currentPage]);

  useEffect(() => {
    fetchBrands();
  }, [currentPage]);

  const handleAction = useCallback(
    (brand, action) => {
      setBrand(brand);
      if (action === "EDIT") {
        setAction(ACTION.delete);
        setValue("name", brand.name);
        setValue("image", brand.image);
      } else {
        setAction(ACTION.delete);
      }
    },
    [brand]
  );

  const handleDelete = useCallback(async () => {
    const res = await instanceAxios.delete(`brand/delete/${brand._id}`);
    console.log(res);
    if (res.status === 200) {
      fetchBrands();
      addToast(() => Toast(res?.data?.message));
    }
    setAction("");
  }, [brand]);

  const onSubmit = useCallback(
    async (data) => {
      console.log(isCreate);
      setIsLoading(true);
      console.log("data: ", data);
      let { name, image } = data;
      if (!(image instanceof String || typeof image === "string")) {
        console.log("IMAGE IS NOT OF STRING");
        image = image[0];
      }
      const payload = {
        name,
        image,
      };
      console.log(payload);
      // return;
      const headerConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let res = null;
      try {
        if (isCreate) {
          res = await instanceAxios.post("brand/create", payload, headerConfig);
        } else {
          res = await instanceAxios.put(
            `brand/update/${brand._id}`,
            payload,
            headerConfig
          );
        }
        if (res?.status === 200) {
          fetchBrands();
          addToast(() => Toast(res?.data?.message));
        }
      } catch (err) {
        addToast(() => Toast(err.response.data.message));
      } finally {
        reset();
        setAction("");
        setIsLoading(false);
      }
    },
    [isCreate, brand]
  );

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const [limit, setLimit] = useState(10);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    setCurrentPage(newOffset);
  };

  const mapToItems = (brands) =>
    brands?.map((brand, index) => ({
      id: startIndex + index + 1,
      name: brand?.name,
      image: (
        <CImage
          hidden={!brand?.image}
          rounded
          thumbnail
          src={brand?.image}
          width={200}
          height={200}
        />
      ),
      createdAt: new Date(brand?.createdAt).toDateString(),
      action: (
        <>
          <CButton color="primary" onClick={() => handleAction(brand, "EDIT")}>
            Edit
          </CButton>{" "}
          <CButton color="danger" onClick={() => handleAction(brand, "DELETE")}>
            Delete
          </CButton>
        </>
      ),
    }));
  const handleCloseModal = () => setAction("");
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CButton
              onClick={() => {
                setAction(ACTION.create);
                setBrand(null);
                reset();
              }}
            >
              Create new brand
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable columns={columns} items={mapToItems(brands)} />
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

      <DeleteBrandModal
        action={action}
        handleDelete={handleDelete}
        handleCloseModal={handleCloseModal}
      />
      <CreateEditBrandModal
        action={action}
        brand={brand}
        isLoading={isLoading}
        closeModal={handleCloseModal}
        handleSubmit={handleSubmit}
        dispatchSubmit={onSubmit}
        register={register}
        errors={errors}
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
