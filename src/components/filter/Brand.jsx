import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instanceAxios } from "../../utils/https";
import "./style.css";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const FilterBrand = (props) => {
  const { onChangeFilter } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);

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
    <div className="card mb-3 accordion">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filter"
        aria-expanded="true"
        aria-controls="filter"
      >
        Brands
      </div>
      <ul className="list-group list-group-flush show" id="filter">
        {isLoading ? (
          <Skeleton height={40} count={9} />
        ) : (
          brands.map((brand) => (
            <li
              className="list-group-item btn"
              data-cate="dell"
              onClick={(e) => onChangeFilter({ brandId: brand?._id })}
            >
              {brand?.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FilterBrand;
