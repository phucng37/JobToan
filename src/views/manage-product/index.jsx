import React, { useCallback, useEffect, useState } from "react";
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

  const [toast, addToast] = useState(0);
  const toaster = React.useRef();
  const fetchProducts = useCallback(async () => {
    const res = await instanceAxios.get(`product/get-all?offset=1&limit=10`);
    if (res.data?.products) {
      setProducts(res.data?.products);
    }
  }, []);
  const fetchCategories = useCallback(async () => {
    const res = await instanceAxios.get("category/show");
    if (res.data?.categories) {
      setCategories(res.data?.categories);
    }
  }, []);
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
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
            if (item[0] === "category") {
              setValue("category", item[1]._id);
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
      const { category, name, price, quantity, shortDescription } = data;
      console.log("data: ", data);
      let primaryImg, subImg1, subImg2, subImg3;
      if (isCreate) {
        primaryImg = data.primaryImg[0];
        subImg1 = data.subImg1[0];
        subImg2 = data.subImg1[1];
        subImg3 = data.subImg1[2];
      } else {
        primaryImg = data.primaryImg?.[0] || image;
        subImg1 = data.subImg1[0] || subImages[0];
        subImg2 = data.subImg1[1] || subImages[1];
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
      };
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
        // reset();
        // setVisible(false);
      }
      console.log("res: ", response);
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
                  <CTableHeaderCell scope="col">Created date</CTableHeaderCell>
                  <CTableHeaderCell scope="col" colSpan={2}>
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.map((product, index) => (
                  <CTableRow key={product._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{product?.name}</CTableDataCell>
                    <CTableDataCell>{product.price}</CTableDataCell>
                    <CTableDataCell>{product.quantity}</CTableDataCell>
                    <CTableDataCell>{product.shortDescription}</CTableDataCell>
                    <CTableDataCell>{product.category?.name}</CTableDataCell>
                    <CTableDataCell>{product.brand}</CTableDataCell>
                    <CTableDataCell>
                      {new Date(product?.createAt).toDateString()}
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
              <CFormInput
                type="text"
                label="Product name"
                {...register("name", { require: "This input is required" })}
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
                <p role="alert">First name is required</p>
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
              lable="Thumbnail "
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
            <CButton color="primary" type="submit">
              {isCreate ? "Submit" : "Update"}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CRow>
  );
}
