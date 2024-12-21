import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CImage,
  CNav,
  CNavLink,
  CRow,
} from "@coreui/react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardProductGrid from "../components/card/CardProductGrid";
import { data } from "../data";
import { handleGetBrandBeginRedux } from "../redux/slice/brandSlice";
import { handleGetBestSellers } from "../redux/slice/productListSlice";
import { instanceAxios } from "../utils/https";
import ViewedProduct from "./home/components/ViewedProduct";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const [banner, setBanner] = useState(null);
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

  const fetchBanner = useCallback(async () => {
    const res = await instanceAxios.get("/banners/filter-banner");
    if (res.status === 200) {
      setBanner(res.data?.banner);
    }
  }, []);

  useEffect(() => {
    fetchBanner();
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
      <Banner className="mb-3" id="carouselHomeBanner" data={banner?.main} />
      <div className="bg-primary p-3 text-center mb-3">
        <h4 className="m-0 text-white">{t('home.title.bestSeller')}</h4>
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
              {banner?.subs?.map((sub) => (
                <CCol sm={4}>
                  <Link to={sub.directURL}>
                    <CImage
                      height={250}
                      className="w-100"
                      src={sub.thumbnailURL}
                      to="promo"
                    />
                  </Link>
                </CCol>
              ))}
            </CRow>
          </div>
          <ViewedProduct />
          <CCol md={12}>
            <CRow>
              {banner?.events?.map((sub) => (
                <CCol sm={3}>
                  <Link to={sub.directURL}>
                    <CImage
                      height={250}
                      className="w-100"
                      src={sub.thumbnailURL}
                      to="promo"
                    />
                  </Link>
                </CCol>
              ))}
            </CRow>
          </CCol>
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
