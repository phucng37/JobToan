import { lazy, useContext, useEffect, useState } from "react";
import { data } from "../../data";
import { createFilterContext } from "../../context/ContextFilter";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetProductDetailBeginRedux,
  handleGetProductListByParamsBeginRedux,
} from "../../redux/slice/productListSlice";
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
  const { handleClickAddToCart } = useContext(createFilterContext);
  const { id } = useParams();
  const productDetail = useSelector(
    (state) => state.productListReducer.product
  );
  const dispatch = useDispatch();
  console.log(productDetail);

  const productRetaled = useSelector(
    (state) => state.productListReducer.products
  );
  useEffect(() => {
    dispatch(
      handleGetProductListByParamsBeginRedux({
        categoryId: productDetail.category,
      })
    );
  }, [productDetail.category]);

  useEffect(() => {
    dispatch(handleGetProductDetailBeginRedux(id));
  }, [id]);

  return (
    productDetail && (
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            <div className="row mb-3">
              <div className="col-md-5 text-center">
                <img
                  src={productDetail.image}
                  className="img-fluid mb-3"
                  alt=""
                />
                {productDetail?.subImages?.length &&
                  productDetail?.subImages?.map((item, index) => (
                    <img
                      src={item}
                      className="border me-2"
                      width="75"
                      height="100"
                      alt="..."
                      key={index}
                    />
                  ))}
              </div>
              <div className="col-md-7">
                <h1 className="h5 d-inline me-2">{productDetail.name}</h1>
                <span className="badge bg-success me-2">New</span>
                <span className="badge bg-danger me-2">Hot</span>
                <div className="mb-3">
                  {productDetail?.review > 0
                    ? Array(Number(productDetail?.review || 1))
                        .fill(0)
                        .map((_, index) => (
                          <i
                            className="bi bi-star-fill text-warning me-1"
                            key={index}
                          />
                        ))
                    : Array(5 - (Number(productDetail?.review) || 0))
                        .fill(0)
                        .map((_, index) => (
                          <i
                            className="bi bi-star-fill text-secondary me-1"
                            key={index}
                          />
                        ))}
                  |{" "}
                  <span className="text-muted small">
                    42 ratings and 4 reviews
                    {/* {productDetail.ratings} */}
                  </span>
                </div>
                <dl className="row small mb-3">
                  <dt className="col-sm-3">Description</dt>
                  <dd className="col-sm-9">{productDetail.shortDescription}</dd>
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
                </dl>

                <div className="mb-3">
                  <span className="fw-bold h5 me-2">{productDetail.price}</span>
                  <del className="small text-muted me-2">$2000</del>
                  <span className="rounded p-1 bg-warning  me-2 small">
                    -$100
                  </span>
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
                        max={productDetail.quantity}
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
                    onClick={() => handleClickAddToCart(id, count)}
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
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Delectus commodi quaerat ullam vitae maxime consequatur
                    itaque. Eligendi temporibus pariatur, illo deleniti debitis
                    labore ullam perspiciatis, consequatur sed, cum nulla autem?
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
      </div>
    )
  );
};

export default ProductDetailView;
