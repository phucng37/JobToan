import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instanceAxios } from "../../utils/https";
import "./style.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CImage,
} from "@coreui/react";

const FilterBrand = (props) => {
  const { onChangeFilter } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);

  const [selectedBrand, setSelectedBrand] = useState("");
  const fetchBrands = useCallback(async () => {
    setIsLoading(true);
    const res = await instanceAxios.get("brand/show");
    if (res.status === 200) {
      setBrands(res.data?.brands);
      setLoadMore(false);
    }
    setIsLoading(false);
  }, [brands]);

  useEffect(() => {
    fetchBrands();
  }, [loadMore]);

  // useEffect(() => {
  //   const brandList = document.getElementById("filter");
  //   const handleScrollToBottom = (event) => {
  //     const el = event.target;
  //     console.log(
  //       el.clientHeight,
  //       el.scrollTop,
  //       el.scrollTop + el.clientHeight,
  //       el.scrollHeight
  //     );
  //     if (el.scrollTop + el.clientHeight + 1 > el.scrollHeight) {
  //       setPage((prevPage) => prevPage + 1);
  //       setLoadMore(true);
  //     }
  //   };
  //   brandList.addEventListener("scroll", handleScrollToBottom);
  //   return () => {
  //     brandList.removeEventListener("scroll", handleScrollToBottom);
  //   };
  // }, []);

  return (
    <CAccordionItem itemKey={2} className="mb-2 p-0">
      <CAccordionHeader className="p-0">Brands</CAccordionHeader>
      <CAccordionBody id="filter">
        <div className="d-flex flex-column">
          {isLoading ? (
            <Skeleton height={40} count={9} />
          ) : (
            brands.map((brand) => (
              <div className="item py-2">
                <input
                  className="form-check-input me-3"
                  type="radio"
                  id="flexCheckDefault1"
                  name="brandFilter"
                  onChange={() => {
                    setSelectedBrand(brand?._id);
                    onChangeFilter({ brandId: brand?._id });
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckDefault1"
                  data-pricemin="10000000"
                  data-pricemax="15000000"
                >
                  <CImage
                    src={brand.image}
                    style={{
                      height: "30px",
                      width: "30px",
                    }}
                  />
                </label>
              </div>
            ))
          )}
        </div>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default FilterBrand;
