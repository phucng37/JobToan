import React, { lazy, Component, useEffect } from "react";
import { Link } from "react-router-dom";
import { data } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { handleGetBrandBeginRedux } from "../redux/slice/brandSlice";
import CardProductGrid from "../components/card/CardProductGrid";
import { handleGetProductListByParamsBeginRedux } from "../redux/slice/productListSlice";
import CIcon from "@coreui/icons-react";

const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../components/card/CardIcon"));
const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../components/card/CardImage"));
const CardDealsOfTheDay = lazy(
  () => import("../components/card/CardDealsOfTheDay")
);

const HomeView = () => {
  const isGetDataBrand = useSelector(
    (state) => state.brandReducer.isGetDataBrand
  );
  const dataBrand = useSelector((state) => state.brandReducer.dataBrand);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isGetDataBrand) dispatch(handleGetBrandBeginRedux());
  }, [isGetDataBrand]);

  const productFeatured = useSelector(
    (state) => state.productListReducer.products
  );
  useEffect(() => {
    dispatch(handleGetProductListByParamsBeginRedux({ review: 4 }));
  }, []);

  const carouselContent = dataBrand.map((row, idx) => {
    return (
      <div
        className="card col-sm-4 grid g-3"
        style={{ width: "350px" }}
        key={idx}
      >
        <div style={{ width: "100px", margin: "auto" }}>
          {/* <FaLaptop style={{ width: "100%", height: "100%" }} /> */}
          {/* {<row.icon style={{ width: "100%", height: "100%" }}/>} */}
          <CIcon
            icon={row.icon.component}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{row.name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            {row.description}
          </p>
          <Link to={`/brand/${row._id}`} className="btn btn-primary">
            See More
          </Link>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <Banner className="mb-3" id="carouselHomeBanner" data={data.banner} />
      <div className="container-fluid bg-light mb-3">
        <div className="row g-3">
          <div className="col-md-12">
            <Support />
          </div>
          <div className="col-md-12 d-flex justify-content-between">
            <CardImage src="../../images/banner/Watches.webp" to="promo" />
            <CardImage
              src="https://laptop2.vnwordpress.net/wp-content/uploads/2020/02/banner-ben.jpg"
              to="promo"
            />
            <CardImage
              src="https://laptop2.vnwordpress.net/wp-content/uploads/2020/02/cai-dat-win.jpg"
              to="promo"
            />
          </div>
        </div>
      </div>
      <div className="container-fluid bg-light mb-3">
        <div className="row">
          <div className="col-md-12">
            <CardDealsOfTheDay title="OUTSTANDING BRAND">
              {carouselContent}
            </CardDealsOfTheDay>
          </div>
        </div>
      </div>

      <div className="bg-info bg-gradient p-3 text-center mb-3">
        <h4 className="m-0">Featured Products</h4>
      </div>
      <div className="container">
        <div className="row">
          {productFeatured?.slice(0, 12).map((item, index) => (
            <div className="col-md-3" key={index}>
              <CardProductGrid data={item} />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeView;
