import { lazy, useContext, useEffect, useState } from "react";
import { data } from "../../data";
import { createFilterContext } from "../../context/ContextFilter";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetProductDetailBeginRedux,
  handleGetProductListByParamsBeginRedux,
} from "../../redux/slice/productListSlice";
import { formatToVND } from "../../utils/CurrencyUtils";
import {
  CButton,
  CCarousel,
  CCarouselItem,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import "./style.css";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const CardFeaturedProduct = lazy(
  () => import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(
  () => import("../../components/others/RatingsReviews")
);
const QuestionAnswer = lazy(
  () => import("../../components/others/QuestionAnswer")
);
const ShippingReturns = lazy(
  () => import("../../components/others/ShippingReturns")
);
const SizeChart = lazy(() => import("../../components/others/SizeChart"));

const ProductDetailView = () => {
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useState(false);
  const { handleClickAddToCart } = useContext(createFilterContext);
  const { id } = useParams();
  const product = useSelector((state) => state.productListReducer.product);
  const dispatch = useDispatch();
  console.log(product);

  const productRetaled = useSelector(
    (state) => state.productListReducer.products
  );
  useEffect(() => {
    dispatch(
      handleGetProductListByParamsBeginRedux({
        categoryId: product.category,
      })
    );
  }, [product.category]);

  useEffect(() => {
    dispatch(handleGetProductDetailBeginRedux(id));
  }, [id]);
  console.log("SUBIMAGE: ", product.subImages);
  const isEmptyObject = (obj) => Object.keys(obj).length === 0;
  if (isEmptyObject(product)) {
    return (
      <>
        <Skeleton count={10} height={100} />
      </>
    );
  }
  return (
    product && (
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            <div className="row mb-3">
              <div className="col-md-5 text-center">
                <CButton className="p-0" onClick={() => setVisible(!visible)}>
                  <LazyLoadImage
                    className="img-fluid mb-3"
                    src={product.image}
                  />
                </CButton>
                {product?.subImages?.length &&
                  product?.subImages?.map((item, index) => (
                    <CButton
                      className="p-0"
                      onClick={() => setVisible(!visible)}
                    >
                      <LazyLoadImage
                        src={item}
                        className="border me-2"
                        height={100}
                        key={index}
                      />
                    </CButton>
                  ))}
              </div>
              <div className="col-md-7">
                <h1 className="h5 d-inline me-2">{product.name}</h1>
                <span className="badge bg-success me-2">New</span>
                <span className="badge bg-danger me-2">Hot</span>
                {/* <div className="mb-3">
                  {product?.review > 0
                    ? Array(Number(product?.review || 1))
                        .fill(0)
                        .map((_, index) => (
                          <i
                            className="bi bi-star-fill text-warning me-1"
                            key={index}
                          />
                        ))
                    : Array(5 - (Number(product?.review) || 0))
                        .fill(0)
                        .map((_, index) => (
                          <i
                            className="bi bi-star-fill text-secondary me-1"
                            key={index}
                          />
                        ))} */}
                {/* |{" "} */}
                {/* <span className="text-muted small"> */}
                {/* 42 ratings and 4 reviews */}
                {/* {product.ratings} */}
                {/* </span> */}
                {/* </div> */}
                {/* <dl className="row small mb-3">
                  <dt className="col-sm-3">Description</dt>
                  <dd className="col-sm-9">{product.shortDescription}</dd>
                  <dt className="col-sm-3">Color</dt>
                  <dd className="col-sm-9">
                    <button className="btn btn-sm btn-primary p-2 me-2"></button>
                    <button className="btn btn-sm btn-secondary p-2 me-2"></button>
                    <button className="btn btn-sm btn-success p-2 me-2"></button>
                    <button className="btn btn-sm btn-danger p-2 me-2"></button>
                    <button className="btn btn-sm btn-warning p-2 me-2"></button>
                    <button className="btn btn-sm btn-info p-2 me-2"></button>
                    <button className="btn btn-sm btn-dark p-2 me-2"></button>
                  </dd>
                </dl> */}

                <div className="mb-3">
                  <br />
                  <span className="fw-bold h5 me-2">
                    {formatToVND(product.price)}
                  </span>
                  {/* <del className="small text-muted me-2">$2000</del>
                  <span className="rounded p-1 bg-warning  me-2 small">
                    -$100
                  </span> */}
                </div>
                <div className="mb-3">
                  <div className="d-inline float-start me-2">
                    <div className="input-group input-group-sm mw-140">
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={(e) => setCount(count > 1 ? count - 1 : 1)}
                      >
                        <i className="bi bi-dash-lg"></i>
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="1"
                        value={count}
                        max={product.quantity}
                      />
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={(e) => setCount(count + 1)}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary me-2"
                    title="Add to cart"
                    onClick={() =>
                      handleClickAddToCart({
                        product: product,
                        quantity: count,
                      })
                    }
                  >
                    <i className="bi bi-cart-plus me-1"></i>Add to cart
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      className="nav-link active"
                      id="nav-details-tab"
                      data-bs-toggle="tab"
                      href="#nav-details"
                      role="tab"
                      aria-controls="nav-details"
                      aria-selected="true"
                    >
                      Details
                    </a>
                  </div>
                </nav>
                <div className="tab-content p-3 small" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-details"
                    role="tabpanel"
                    aria-labelledby="nav-details-tab"
                  >
                    {product.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <CardFeaturedProduct data={productRetaled} />
            <CardServices />
          </div>
        </div>
        <CModal
          backdrop="static"
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="StaticBackdropExampleLabel"
          className="modal-preview"
        >
          <CModalHeader>
            <CModalTitle id="StaticBackdropExampleLabel">
              Preview {product.name}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCarousel controls>
              {[product.image, ...product?.subImages].map((imageURL) => (
                <CCarouselItem>
                  <CImage
                    className="d-block image-preview w-100"
                    src={imageURL}
                    alt="slide 1"
                  />
                </CCarouselItem>
              ))}
            </CCarousel>
          </CModalBody>
        </CModal>
      </div>
    )
  );
};

export default ProductDetailView;
