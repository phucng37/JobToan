import React, { lazy, useState, useEffect, useContext } from "react";
import { handleGetProductListByParamsBeginRedux } from "../../../redux/slice/productListSlice";
import { data } from "../../../data";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { createFilterContext } from "../../../context/ContextFilter";
import { useParams } from "react-router-dom";

const Breadcrumb = lazy(() => import("../../../components/Breadcrumb"));
const FilterCategory = lazy(
  () => import("../../../components/filter/Category")
);
const FilterPrice = lazy(() => import("../../../components/filter/Price"));
const FilterStar = lazy(() => import("../../../components/filter/Star"));
const FilterClear = lazy(() => import("../../../components/filter/Clear"));
const CardServices = lazy(
  () => import("../../../components/card/CardServices")
);
const CardProductGrid = lazy(
  () => import("../../../components/card/CardProductGrid")
);
const CardProductList = lazy(
  () => import("../../../components/card/CardProductList")
);

// const items = [...data.products, ...data.products, ...data.products];

const ChildrenListBrand = ({ itemsPerPage }) => {
  const productByBrand = useSelector(
    (state) => state.productListReducer.products
  );

  const { id } = useParams();
  console.log("id: ", id);
  const dispatch = useDispatch();

  const [view, setView] = useState("list");
  const [totalItems, setTotalItems] = useState("list");
  const [items, setItems] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  useEffect(() => {
    setItems(productByBrand);
    setTotalItems(productByBrand.length);
  }, [productByBrand]);

  useEffect(() => {
    dispatch(handleGetProductListByParamsBeginRedux({ categoryId: id }));
  }, [id]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const onChangeView = (viewChange) => {
    setView(viewChange);
  };

  return (
    <React.Fragment>
      {/* <div
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
      </div> */}
      <div className="container-fluid mb-3">
        <div className="row">
          <div className="col-md-10 offset-1">
            <div className="row">
              <div
                className="col-6 mt-3"
                style={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                Total results: ({totalItems})
              </div>
              <div className="col-6 d-flex justify-content-end mt-3">
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
                    <div key={idx} className="col-md-2">
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
            <div className="float-end">
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
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChildrenListBrand;
