import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createFilterContext } from "../../context/ContextFilter";
import { formatToVND } from "../../utils/CurrencyUtils";

const CardProductGrid = (props) => {
  const product = props.data;
  const [count, setCount] = useState(1);
  const { handleClickAddToCart } = useContext(createFilterContext);
  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt="" />
      {product.isNew && (
        <span className="badge bg-success position-absolute mt-2 ms-2">
          New
        </span>
      )}
      {product.isHot && (
        <span className="badge bg-danger position-absolute r-0 mt-2 me-2">
          Hot
        </span>
      )}
      {(product.discountPercentage > 0 || product.discountPrice > 0) && (
        <span
          className={`rounded position-absolute p-2 bg-warning  ms-2 small ${
            product.isNew ? "mt-5" : "mt-2"
          }`}
        >
          -
          {product.discountPercentage > 0
            ? product.discountPercentage + "%"
            : "$" + product.discountPrice}
        </span>
      )}
      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link
            to={`http://localhost:3000/product/detail/${product._id}`}
            className="text-decoration-none"
          >
            {product.name}
          </Link>
        </h6>
        <div className="my-2">
          <span className="fw-bold h5">{formatToVND(product.price)}</span>
          {product.originPrice > 0 && (
            <del className="small text-muted ms-2">${product.originPrice}</del>
          )}
          {/* <span className="ms-2">
            {Array.from({ length: product.review }, (_, key) => (
              <i className="bi bi-star-fill text-warning me-1" key={key} />
            ))}
          </span> */}
        </div>
        <div className="btn-group  d-flex between" role="group">
          <input
            type="number"
            onChange={(e) => {
              setCount(e.target.value);
            }}
            min={1}
            max={product.quantity}
            value={count}
            style={{
              borderRadius: "4px",
              outline: "none",
              border: "1px solid blue",
              marginRight: "2px",
              textAlign: "center",
              width: "70%",
            }}
          />
          <button
            type="button"
            className="btn btn-sm btn-primary"
            title="Add to cart"
            onClick={() => handleClickAddToCart({ product, quantity: count })}
          >
            <i className="bi bi-cart-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
