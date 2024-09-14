import React, { lazy, useState, useEffect, useContext } from "react";
import {
  handleGetProductListBeginRedux,
  handleGetProductListByParamsBeginRedux,
  handleGetProductListByParamsDoneRedux,
  handleGetProductListDoneRedux,
  handleResetByParamsRedux,
} from "../../../redux/slice/productListSlice";
import { data } from "../../../data";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { createFilterContext } from "../../../context/ContextFilter";

const Breadcrumb = lazy(() => import("../../../components/Breadcrumb"));
const FilterCategory = lazy(() =>
  import("../../../components/filter/Category")
);
const FilterPrice = lazy(() => import("../../../components/filter/Price"));
const FilterStar = lazy(() => import("../../../components/filter/Star"));
const FilterClear = lazy(() => import("../../../components/filter/Clear"));
const CardServices = lazy(() =>
  import("../../../components/card/CardServices")
);
const CardProductGrid = lazy(() =>
  import("../../../components/card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../../../components/card/CardProductList")
);

// const items = [...data.products, ...data.products, ...data.products];

const ChildrenList = ({ itemsPerPage }) => {
  const isGetDataProductList = useSelector(
    (state) => state.productListReducer.isGetDataProductList
  );
  const dataProductListRedux = useSelector(
    (state) => state.productListReducer.products
  );
  const paramsProductRedux = useSelector(
    (state) => state.productListReducer.queryParams
  );
  const isGetDataProductListByParams = useSelector(
    (state) => state.productListReducer.isGetDataProductListByParams
  );
  const dispatch = useDispatch();

  const [view, setView] = useState("list");
  const [totalItems, setTotalItems] = useState("list");
  const [items, setItems] = useState(dataProductListRedux);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  const { onChangeFilter } = useContext(createFilterContext);

  useEffect(() => {
    if (isGetDataProductListByParams) {
      handlePageClick({ selected: 0 });
    }
  }, [isGetDataProductListByParams]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  useEffect(() => {
    if (!isGetDataProductList) {
      dispatch(handleGetProductListBeginRedux());
    } else {
      setItems(dataProductListRedux);
      setTotalItems(dataProductListRedux.length);
    }
  }, [isGetDataProductList, dataProductListRedux]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const onChangeView = (viewChange) => {
    setView(viewChange);
  };

  // const onChangeFilter = (optionParam) => {
  //   console.log(optionParam);

  //   // dispatch(
  //   //   handleGetProductListByParamsBeginRedux({
  //   //     ...optionParam,
  //   //     ...paramsProductRedux,
  //   //   })
  //   // );
  //   // dispatch(
  //   //   handleGetProductListByParamsDoneRedux({
  //   //     products: [
  //   //       {
  //   //         id: 1,
  //   //         sku: "FAS-01",
  //   //         link: "/product/detail",
  //   //         name: "Great product name goes here",
  //   //         img: "../../images/products/tshirt_red_480x400.webp",
  //   //         price: 180,
  //   //         originPrice: 200,
  //   //         discountPrice: 20,
  //   //         discountPercentage: 10,
  //   //         isNew: true,
  //   //         isHot: false,
  //   //         star: 4,
  //   //         isFreeShipping: true,
  //   //         description:
  //   //           "Nulla sodales sit amet orci eu vehicula. Curabitur metus velit, fermentum a velit ac, sodales egestas lacus. Etiam congue velit vel luctus dictum. Pellentesque at pellentesque sapien.",
  //   //       },
  //   //       {
  //   //         id: 3,
  //   //         sku: "FAS-03",
  //   //         link: "/product/detail",
  //   //         name: "Great product name goes here",
  //   //         img: "../../images/products/tshirt_black_480x400.webp",
  //   //         price: 1900,
  //   //         originPrice: 2000,
  //   //         discountPrice: 100,
  //   //         discountPercentage: 0,
  //   //         isNew: true,
  //   //         isHot: true,
  //   //         star: 2,
  //   //         isFreeShipping: true,
  //   //         description:
  //   //           "Vivamus sapien eros, molestie sed lacus vitae, lacinia volutpat ipsum. Nam sollicitudin lorem eget ornare vulputate.",
  //   //       },
  //   //     ],
  //   //   })
  //   // );
  //   // handlePageClick({ selected: 0 });
  // };

  return (
    <React.Fragment>
      <div
        className="p-5 bg-primary bs-cover"
        style={{
          backgroundImage: "url(../../images/banner/banner_cate.jpg)",
        }}
      >
        <div className="container text-center">
          <span className="display-5 px-3 bg-white rounded shadow">
            T-Shirts
          </span>
        </div>
      </div>
      <Breadcrumb />
      <div className="container-fluid mb-3">
        <div className="row">
          <div className="col-md-3">
            <FilterCategory onChangeFilter={onChangeFilter} />
            <FilterPrice onChangeFilter={onChangeFilter} />
            <FilterStar onChangeFilter={onChangeFilter} />
            <FilterClear />
            <CardServices />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-7">
                <span className="align-middle fw-bold">
                  {totalItems} results for{" "}
                  <span className="text-warning">"t-shirts"</span>
                </span>
              </div>
              <div className="col-5 d-flex justify-content-end">
                <select
                  className="form-select mw-180 float-start"
                  aria-label="Default select"
                  onChange={(e) => onChangeFilter({ sort_by: e.target.value })}
                >
                  <option value={"most_popular"}>Most Popular</option>
                  <option value={"latest_items"}>Latest items</option>
                  <option value={"trending"}>Trending</option>
                  <option value={"price_low_to_high"}>Price low to high</option>
                  <option value={"price_hight_to_low"}>
                    Price high to low
                  </option>
                </select>
                <div className="btn-group ms-3" role="group">
                  <button
                    aria-label="Grid"
                    type="button"
                    onClick={() => onChangeView("grid")}
                    className={`btn ${
                      view === "grid" ? "btn-primary" : "btn-outline-primary"
                    }`}
                  >
                    <i className="bi bi-grid" />
                  </button>
                  <button
                    aria-label="List"
                    type="button"
                    onClick={() => onChangeView("list")}
                    className={`btn ${
                      view === "list" ? "btn-primary" : "btn-outline-primary"
                    }`}
                  >
                    <i className="bi bi-list" />
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="row g-3">
              {view === "grid" &&
                currentItems.map((product, idx) => {
                  return (
                    <div key={idx} className="col-md-4">
                      <CardProductGrid data={product} index={idx} />
                    </div>
                  );
                })}
              {view === "list" &&
                currentItems.map((product, idx) => {
                  return (
                    <div key={idx} className="col-md-12">
                      <CardProductList data={product} />
                    </div>
                  );
                })}
            </div>
            <hr />
            <ReactPaginate
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< Previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={
                isGetDataProductListByParams && itemOffset === 0
                  ? itemOffset
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChildrenList;
