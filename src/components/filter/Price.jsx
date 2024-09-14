import React from "react";

const FilterPrice = (props) => {
  const { onChangeFilter } = props;

  const onChangePrice = (e) => {
    const price_min = e.target.nextElementSibling.dataset.pricemin;
    const price_max = e.target.nextElementSibling.dataset.pricemax;
    onChangeFilter({ price_min, price_max });
  };
  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterPrice"
        aria-expanded="true"
        aria-controls="filterPrice"
      >
        Price
      </div>
      <ul className="list-group list-group-flush show" id="filterPrice">
        <li className="list-group-item btn">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexCheckDefault1"
              name="radioPrice"
              onChange={onChangePrice}
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckDefault1"
              data-pricemin="10.000.000"
              data-pricemax="15.000.000"
            >
              10 - 15 triệu đồng
            </label>
          </div>
        </li>
        <li className="list-group-item btn">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexCheckDefault2"
              name="radioPrice"
              onChange={onChangePrice}
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckDefault2"
              data-pricemin="20.000.000"
              data-pricemax="30.000.000"
            >
              20 - 30 triệu đồng
            </label>
          </div>
        </li>
        <li className="list-group-item btn">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexCheckDefault3"
              name="radioPrice"
              onChange={onChangePrice}
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckDefault3"
              data-pricemin="30.000.000"
              data-pricemax="50.000.000"
            >
              30 - 50 triệu đồng
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FilterPrice;
