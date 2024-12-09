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
import Toast from "src/components/Toast";
import ReactPaginate from "react-paginate";
import {
  getIndex,
  getTotalPages,
  paginateConfig,
} from "../../utils/PaginationUtils";
import CustomInput from "src/components/base/CustomInput";
import CreateEditProductModal from "./components/CreateEditProductModal";
import { ACTION } from "../../constant/action";
import DeleteProductModal from "./components/DeleteProductModal";

const unexpectedInput = new Set(["_id", "image", "subImages", "createdAt"]);

const FIELDS = [
  "id",
  "name",
  "price",
  "quantity",
  "category",
  "brand",
  "createdAt",
  "action",
];

const columns = FIELDS.map((field) => {
  const column = {
    key: field,
    _props: { scope: "col" },
  };
  if (field === "id") {
    column.label = "#";
  }
  if (field === "createdAt") {
    column.label = "Created at";
  }
  return column;
});

export default function ManageProduct() {
  const [categories, setCategories] = useState([]);
  const [action, setAction] = useState("");
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [image, setImage] = useState({
    primaryImage: null,
    subImages: [],
  });
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, addToast] = useState(0);
  const toaster = React.useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

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

  const mapToItems = useCallback(
    (products) =>
      products?.map((product, index) => ({
        id: startIndex + index + 1,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        category: product.category.name,
        brand: product.brand.name,
        createdAt: new Date(product?.createdAt).toDateString(),
        action: (
          <>
            <CButton
              className="me-2"
              color="primary"
              onClick={() => handleAction(product, ACTION.edit)}
            >
              Edit
            </CButton>
            <CButton
              color="danger"
              onClick={() => handleAction(product, ACTION.delete)}
            >
              Delete
            </CButton>
          </>
        ),
      })),
    [products]
  );

  const fetchCategories = useCallback(async () => {
    const res = await instanceAxios.get("category/show");
    const { categories } = res.data;
    if (categories?.length > 0) {
      setCategories(categories);
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

  useEffect(() => {
    fetchProducts();
  }, [currentPage, limit]);

  const handleAction = useCallback(
    async (product, action) => {
      setProductId(product._id);
      if (action === ACTION.edit) {
        reset();
        setAction(ACTION.edit);
        setImage({
          primaryImage: product.image,
          subImages: product.subImages,
        });
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
        setAction(ACTION.delete);
      }
    },
    [productId]
  );
  const handleDelete = useCallback(async () => {
    console.log("productId: ", productId);
    const res = await instanceAxios.delete(`product/delete/${productId}`);
    if (res.status === 200) {
      fetchProducts();
      handleCloseModal();
    }
  }, [productId]);

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(false);
      const { category, name, price, quantity, shortDescription, brand } = data;
      console.log(action, "data: ", data);
      let primaryImg, subImg1, subImg2, subImg3;
      if (action === ACTION.create) {
        console.log("CREATE");
        primaryImg = data.primaryImg[0];
        subImg1 = data.subImg1[0];
        subImg2 = data.subImg1[1];
        subImg3 = data.subImg1[2];
      } else {
        console.log("EIDIT", image.subImages);
        primaryImg = data.primaryImg?.[0] || image.primaryImage;
        subImg1 = data.subImg1[0] || image.subImages[0];
        subImg2 = data.subImg1[1] || image.subImages[1];
        subImg3 = data.subImg1[2] || image.subImages[2];
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
        brand,
      };
      console.log(payload);
      let response = null;
      const headerConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if (action === ACTION.create) {
        response = await instanceAxios.post(
          "product/create",
          payload,
          headerConfig
        );
      } else {
        response = await instanceAxios.put(
          `product/update/${productId}`,
          payload,
          headerConfig
        );
        setImage(null);
      }
      if (response.status === 200) {
        fetchProducts();
        reset();
        addToast(() => Toast(response?.data?.message));
      }
      console.log("res: ", response);
      setIsLoading(false);
      setAction("");
    },
    [productId, action]
  );

  const handleCloseModal = () => {
    setAction("");
  };

  const handleClearImage = () => {
    setImage(null);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CButton
              onClick={() => {
                reset();
                setImage(null);
                setAction(ACTION.create);
              }}
            >
              Create new product
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable columns={columns} items={mapToItems(products)} />
          </CCardBody>
        </CCard>
        <div className="float-end">
          <ReactPaginate
            {...paginateConfig}
            pageCount={totalPages}
            onPageChange={handlePageClick}
          />
        </div>
      </CCol>
      <DeleteProductModal
        closeModal={handleCloseModal}
        action={action}
        deleteProduct={handleDelete}
      />
      <CreateEditProductModal
        action={action}
        brands={brands}
        isLoading={isLoading}
        categories={categories}
        image={image}
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
