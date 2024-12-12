import React, { lazy, Component, useEffect, Suspense } from "react";
import { CNav, CNavLink, CRow } from "@coreui/react";
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
import ViewedProduct from "./home/components/ViewedProduct";

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
  const categories = useSelector((state) => state.brandReducer.dataBrand);
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

  const carouselContent = categories?.map((category, idx) => {
    return (
      <CCol sm={2}>
        <CCard>
          <CCardImage
            className="w-100"
            height={140}
            orientation="top"
            src={category.icon}
          />
          <CCardBody>
            <CCardTitle>{category.name}</CCardTitle>
            <CCardText>{category.description} </CCardText>
            <Link to={`/categories/${category._id}`}>
              <CButton color="primary">See more</CButton>
            </Link>
          </CCardBody>
        </CCard>
      </CCol>
    );
  });
  const FEATURE_PRODUCTS = [
    {
      imageURL:
        "https://cdn2.fptshop.com.vn/unsafe/480x0/filters:quality(100)/H3_405x175_a8481bdbe1.png",
      productId: "",
    },
    {
      imageURL:
        "https://cdn2.fptshop.com.vn/unsafe/480x0/filters:quality(100)/H3_405x175_da06d798e7.png",
      productId: "",
    },
    {
      imageURL:
        "https://cdn2.fptshop.com.vn/unsafe/480x0/filters:quality(100)/H3_405x175_20fbf1ad13.png",
      productId: "",
    },
  ];
  return (
    <>
      <CNav as="nav" className="bg-primary">
        {categories?.map((category, idx) => (
          <CNavLink key={idx}>
            <Link
              to={`/categories/${category._id}`}
              className="text-decoration-none text-white"
            >
              <div>
                <CImage width={25} height={25} src={category.icon} />{" "}
                {category.name}{" "}
              </div>
            </Link>
          </CNavLink>
        ))}
      </CNav>

      <Banner className="mb-3" id="carouselHomeBanner" data={data.banner} />
      <div className="bg-primary p-3 text-center mb-3">
        <h4 className="m-0 text-white">Best Sellers</h4>
      </div>
      <div className="container">
        <div className="row p-4">
          <Suspense fallback={<Skeleton count={5} />}>
            {bestsellers?.map((item, index) => (
              <div className="col-md-3" key={item._id}>
                <CardProductGrid data={item.product} />
              </div>
            ))}
          </Suspense>
        </div>
      </div>
      <div className="container-fluid bg-light mb-3">
        <div className="row g-3">
          <div className="col-md-12">
            <CRow>
              {FEATURE_PRODUCTS.map((product) => (
                <CCol sm={4}>
                  <Link to={`/products/detail/${product.productId}`}>
                    <CImage
                      height={250}
                      className="w-100"
                      src={product.imageURL}
                      to="promo"
                    />
                  </Link>
                </CCol>
              ))}
            </CRow>
          </div>
          <ViewedProduct />
          <div className="col-md-12">
            <Support />
          </div>
        </div>
      </div>
      {/* <div className="container-fluid bg-light mb-3">
        <div className="row">
          <div className="col-md-12">
            <CardDealsOfTheDay title="OUTSTANDING CATEGORIES">
              {carouselContent}
            </CardDealsOfTheDay>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default HomeView;
