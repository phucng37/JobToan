import React, { useCallback, useEffect, useState } from "react";
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
import ReactPaginate from 'react-paginate';
import { getTotalPages, paginateConfig } from "../../utils/PaginationUtils";

export default function ManageBrand() {
  const [brands, setBrands] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [brand, setBrand] = useState();
  const [visible, setVisible] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [toast, addToast] = useState(0);
  const toaster = React.useRef();
  const [currentPage, setCurrentPage] = useState(1);
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
        limit
      }
    });
    if (res.status === 200 && res.data) {
      const {brands, totalBrands} = res.data;
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
        setVisible(true);
        setValue("name", brand.name);
        setValue("image", brand.image);
      } else {
        setIsVisible(true);
      }
    },
    [brand]
  );

  const handleDelete = useCallback(async () => {
    const res = await instanceAxios.delete(`brand/delete/${brand._id}`);
    console.log(res);
    if (res.status === 200) {
      fetchBrands();
      setIsVisible(false);
      addToast(() => Toast(res?.data?.message));
    }
  }, [brand]);

  const onSubmit = useCallback(
    async (data) => {
      console.log(isCreate);
      setIsLoading(true);
      console.log("data: ", data);
      let { name, image } = data;
      if (!(image instanceof String || typeof image === 'string')) {
        console.log('IMAGE IS NOT OF STRING')
        image = image[0];
      }
      const payload = {
        name,
        image      };
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
          setIsCreate(false);
        } else {
          res = await instanceAxios.put(
            `brand/update/${brand._id}`,
            payload,
            headerConfig
          );
        }
        if (res?.status === 200) {
          fetchBrands();
          setVisible(false);
          setIsLoading(false);
          addToast(() => Toast(res?.data?.message));
          reset();
        }
      } catch (err) {
        setIsLoading(false);
        addToast(() => Toast(err.response.data.message));
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CButton
              onClick={() => {
                setIsCreate(true);
                setVisible(true);
                setBrand(null);
                reset();
              }}
            >
              Create new brand
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                  <CTableHeaderCell scope="col" colSpan={2}>
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {brands.map((brand, index) => (
                  <CTableRow key={brand?._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{brand?.name}</CTableDataCell>
                    <CTableDataCell>
                      {" "}
                      <CImage
                        hidden={!brand?.image}
                        rounded
                        thumbnail
                        src={brand?.image}
                        width={200}
                        height={200}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      {new Date(brand?.createdAt).toDateString()}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        onClick={() => handleAction(brand, "EDIT")}
                      >
                        Edit
                      </CButton>{" "}
                      <CButton
                        color="danger"
                        onClick={() => handleAction(brand, "DELETE")}
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
          <p>Are you sure to delete this brand?</p>
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
            {isCreate ? "Create" : "Edit"} a brand
          </CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <CModalBody>
            <CCol md={12}>
              <CFormInput
                type="text"
                label="Brand name"
                {...register("name", { require: "This input is required" })}
              />
            </CCol>
            <CCol md={12} className="mt-2">
              <CImage
                hidden={!brand?.image}
                rounded
                thumbnail
                src={brand?.image}
                width={200}
                height={200}
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="file"
                label="Brand image"
                {...register("image", { require: "This input is required" })}
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
