import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { createFilterContext } from "../../context/ContextFilter";

const CardProductList = (props) => {
  const product = props.data;
  const [count, setCount] = useState(1);
  const { handleClickAddToCart } = useContext(createFilterContext);
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={product.img} className="img-fluid" alt="..." />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link to={product.link} className="text-decoration-none">
                {product.name}
              </Link>
            </h6>
            {product.isNew && (
              <span className="badge bg-success me-2">New</span>
            )}
            {product.isHot && <span className="badge bg-danger me-2">Hot</span>}

            <div>
              {product.star > 0 &&
                Array.from({ length: 5 }, (_, key) => {
                  if (key <= product.star)
                    return (
                      <i
                        className="bi bi-star-fill text-warning me-1"
                        key={key}
                      />
                    );
                  else
                    return (
                      <i
                        className="bi bi-star-fill text-secondary me-1"
                        key={key}
                      />
                    );
                })}
            </div>
            {product.description &&
              product.description.includes("|") === false && (
                <p className="small mt-2">{product.description}</p>
              )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              <span className="fw-bold h5">${product.price}</span>
              {product.originPrice > 0 && (
                <del className="small text-muted ms-2">
                  ${product.originPrice}
                </del>
              )}
              {(product.discountPercentage > 0 ||
                product.discountPrice > 0) && (
                <span className={`rounded p-1 bg-warning ms-2 small`}>
                  -
                  {product.discountPercentage > 0
                    ? product.discountPercentage + "%"
                    : "$" + product.discountPrice}
                </span>
              )}
            </div>
            {product.isFreeShipping && (
              <p className="text-success small mb-2">
                <i className="bi bi-truck" /> Free shipping
              </p>
            )}

            <div className="btn-group d-flex flex-column" role="group">
              <input
                type="number"
                min={1}
                max={99}
                value={count}
                step={1}
                onChange={(e) => setCount(e.target.value)}
                style={{
                  borderRadius: "4px",
                  outline: "none",
                  border: "1px solid blue",
                  marginBottom: "2px",
                  textAlign: "center",
                }}
              />
              <button
                type="button"
                className="btn btn-sm btn-primary"
                title="Add to cart"
                onClick={() => handleClickAddToCart(product.id, count)}
              >
                <i className="bi bi-cart-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;
