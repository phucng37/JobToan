import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
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
import { instanceAxios } from "src/utils/https";
import CIcon from "@coreui/icons-react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Toast from 'src/components/Toast';
import ReactPaginate from 'react-paginate';
import { getIndex, getTotalPages, paginateConfig } from "../../utils/PaginationUtils";;

const CRHookInput = ({
  multiple,
  style,
  lable,
  size,
  type = "text",
  name,
  validation,
  errors,
  register,
}) => (
  <CCol md={size} style={style}>
    <CFormInput
      type={type}
      label={lable}
      {...register(name, {
        ...validation,
      })}
      multiple={multiple}
    />
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
    />
  </CCol>
);
const unexpectedInput = new Set(["_id", "image", "subImages", "createdAt"]);

export default function ManageProduct() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [visible, setVisible] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [image, setImage] = useState(null);
  const [subImages, setSubImages] = useState(null);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, addToast] = useState(0);
  const toaster = React.useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const startIndex = useMemo(
    () => getIndex(currentPage, limit),
    [currentPage, limit]
  );

  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    setCurrentPage(newOffset);
  };

  const fetchProducts = useCallback(async () => {
    const res = await instanceAxios.get(`product/get-all?offset=1&limit=10`);
    if (res.data && res.status === 200) {
      const { products, totalProducts } = res.data;
      setProducts(products);
      setTotalPages(getTotalPages(totalProducts, limit));
    }
  }, [currentPage, limit]);

  const fetchCategories = useCallback(async () => {
    const res = await instanceAxios.get("category/show");
    if (res.data?.categories) {
      setCategories(res.data?.categories);
    }
  }, []);

  const fetchBrands = useCallback(async () => {
    const res = await instanceAxios.get("brand/show");
    if (res.status === 200 && res.data) {
      console.log(res.data);
      setBrands(res.data.brands);
    }
  }, []);

  useEffect(() => {    
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(()=>{
    fetchProducts();
  }, [currentPage, limit]);
  
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

  const handleAction = useCallback(
    async (product, action) => {
      setIdProduct(product._id);
      if (action === "EDIT") {
        setVisible(true);
        setImage(product.image);
        setSubImages(product.subImages);
        console.log("product: ", product);
        Object.entries(product).forEach((item) => {
          if (!unexpectedInput.has(item[0])) {
            console.log("item", item);
            if (item[0] === "category" || item[0] === "brand") {
              setValue(item[0], item[1]._id);
            } else setValue(item[0], item[1]);
          }
        });
      } else {
        setIsVisible(true);
      }
    },
    [idProduct]
  );
  const handleDelete = useCallback(async () => {
    console.log("idProduct: ", idProduct);
    const res = await instanceAxios.delete(`product/delete/${idProduct}`);
    if (res.status === 200) {
      fetchProducts();
      setIsVisible(false);
    }
  }, [idProduct]);

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(false);
      const { category, name, price, quantity, shortDescription, brand } = data;
      console.log(isCreate, "data: ", data,);
      let primaryImg, subImg1, subImg2, subImg3;
      if (isCreate) {
        console.log('CREATE');
        primaryImg = data.primaryImg[0];
        subImg1 = data.subImg1[0];
        subImg2 = data.subImg1[1];
        subImg3 = data.subImg1[2];
      } else {
        console.log('EIDIT');
        primaryImg = data.primaryImg?.[0] || image;
        if (subImages.length === 1) 
          subImg1 = data.subImg1[0] || subImages[0];
        if (subImages.length === 2) 
          subImg2 = data.subImg1[1] || subImages[1];
        if (subImages.length === 3) 
          subImg3 = data.subImg1[2] || subImages[2];
      }
      const payload = {
        category,
        name,
        price,
        quantity,
        shortDescription,
        primaryImg,
        subImg1,
        subImg2,
        subImg3,
        brand
      };
      console.log(payload);
      let response = null;
      const headerConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if (isCreate) {
        response = await instanceAxios.post(
          "product/create",
          payload,
          headerConfig
        );
        setIsCreate(false);
      } else {
        response = await instanceAxios.put(
          `product/update/${idProduct}`,
          payload,
          headerConfig
        );
        setImage(null);
        setSubImages([]);
      }
      if (response.status === 200) {
        fetchProducts();
        reset();
        setVisible(false);
        addToast(() => Toast(response?.data?.message));
      }
      console.log("res: ", response);
      setIsLoading(false);
    },
    [idProduct]
  );
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CButton
              onClick={() => {
                reset();
                setIsCreate(true);
                setVisible(true);
              }}
            >
              Create new product
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Short description
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created at</CTableHeaderCell>
                  <CTableHeaderCell scope="col" colSpan={2}>
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.map((product, index) => (
                  <CTableRow key={product._id}>
                    <CTableHeaderCell scope="row">{startIndex + index + 1}</CTableHeaderCell>
                    <CTableDataCell>{product?.name}</CTableDataCell>
                    <CTableDataCell>{product.price}</CTableDataCell>
                    <CTableDataCell>{product.quantity}</CTableDataCell>
                    <CTableDataCell>{product.shortDescription}</CTableDataCell>
                    <CTableDataCell>{product.category?.name}</CTableDataCell>
                    <CTableDataCell>{product.brand?.name}</CTableDataCell>
                    <CTableDataCell>
                      {new Date(product?.createdAt).toDateString()}
                    </CTableDataCell>

                    <CTableDataCell>
                      <CButton
                        color="primary"
                        onClick={() => handleAction(product, "EDIT")}
                      >
                        Edit
                      </CButton>{" "}
                      <CButton
                        color="danger"
                        onClick={() => handleAction(product, "DELETE")}
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
        aria-hidden
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        aria-labelledby="delete-modal"
      >
        <CModalHeader>
          <CModalTitle id="delete-modal">Notification</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure to delete this product?</p>
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
        size="lg"
        aria-hidden
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="create-edit-modal"
      >
        <CModalHeader>
          <CModalTitle id="create-edit-modal">
            {isCreate ? "Create" : "Edit"} a product
          </CModalTitle>
        </CModalHeader>
        <CForm encType="" onSubmit={handleSubmit(onSubmit)}>
          <CModalBody className="overflow-auto" style={{ height: 700 }}>
            <CCol md={12}>
            <CRHookInput
              size={12}
              name="name"
              lable="Product name"
              validation={{
                required: "This input is required",
              }}
              errors={errors}
              register={register}
            />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="text"
                label="Price"
                {...register("price", {
                  required: true,
                  pattern: {
                    value: /\d+/,
                    message: "This input is number only.",
                  },
                })}
              />
              {errors.price?.type === "required" && (
                <p role="alert">This input is required</p>
              )}
            </CCol>
            <CRHookInput
              size={12}
              name="quantity"
              lable="Quantity"
              validation={{
                required: "This input is required",
                pattern: {
                  value: /\d+/,
                  message: "This input is number only.",
                },
              }}
              errors={errors}
              register={register}
            />
            <CRHookInput
              size={12}
              name="shortDescription"
              lable="Short description"
              validation={{
                required: "This input is required",
              }}
              errors={errors}
              register={register}
            />
            <div className="text-center my-2">
              <CImage rounded thumbnail src={image} height={200} />
            </div>
            <CRHookInput
              size={12}
              type="file"
              name="primaryImg"
              lable="Thumbnail"
              validation={{
                required: !image,
              }}
              errors={errors}
              register={register}
            />
            <div className="d-flex justify-content-around my-2 gap-2">
              {subImages?.map((image) => (
                <CImage
                  rounded
                  src={image}
                  height={150}
                  style={{ border: "1px solid #ccc" }}
                />
              ))}
            </div>
            <CRHookInput
              multiple
              size={12}
              type="file"
              name="subImg1"
              lable="Sub Image"
              errors={errors}
              register={register}
              validation={{
                required: !subImages?.length,
                min: {
                  value: 3,
                  message: "This input needs 3 files",
                },
                minLength: {
                  value: 3,
                  message: "This input needs 3 files",
                },
              }}
            />
            {/* <CRHookInput size={12} type='file' name='subImg2' style={{marginTop: 5}}  errors={errors} register={register}/>
   <CRHookInput size={12} type='file' name='subImg3' style={{marginTop: 5}}   errors={errors} register={register}/> */}
            <CCol md={12}>
              <CFormSelect
                label="Category"
                {...register("category")}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category._id,
                }))}
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Brand"
                {...register("brand")}
                options={brands.map((brand) => ({
                  label: brand.name,
                  value: brand._id,
                }))}
              />
            </CCol>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                setVisible(false);
                setPrimaryImg(null);
                setSubImages([]);
              }}
            >
              Close
            </CButton>
            <CButton color="primary" type="submit" disabled={isLoading}>
              {isCreate ? "Submit" : "Update"}
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
