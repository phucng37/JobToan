import React, { lazy, Component, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { data } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { handleGetBrandBeginRedux } from "../redux/slice/brandSlice";
import CardProductGrid from "../components/card/CardProductGrid";
import {
  handleGetBestSellers,
  handleGetProductListByParamsBeginRedux,
} from "../redux/slice/productListSlice";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CImage,
} from "@coreui/react";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

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

  const bestsellers = useSelector(
    (state) => state.productListReducer.bestsellers
  );
  console.log(bestsellers);

  useEffect(() => {
    dispatch(handleGetBestSellers());
  }, []);

  const carouselContent = dataBrand?.map((category, idx) => {
    return (
      <CCol sm={2}>
        <CCard>
          <CCardImage orientation="top" src={category.icon} />
          <CCardBody>
            <CCardTitle>{category.name}</CCardTitle>
            <CCardText>{category.description} </CCardText>
            <Link
              to={`/categories/${category._id}`}
            >
              <CButton color="primary">See more</CButton>
            </Link>
          </CCardBody>
        </CCard>
      </CCol>
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
            <CardDealsOfTheDay title="OUTSTANDING CATEGORIES">
              {carouselContent}
            </CardDealsOfTheDay>
          </div>
        </div>
      </div>

      <div className="bg-info bg-gradient p-3 text-center mb-3">
        <h4 className="m-0">Best Sellers</h4>
      </div>
      <div className="container">
        <div className="row">
          <Suspense fallback={<Skeleton count={5} />}>
            {bestsellers?.map((item, index) => (
              <div className="col-md-3" key={item._id}>
                <CardProductGrid data={item.product} />
              </div>
            ))}
          </Suspense>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeView;
