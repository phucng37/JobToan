import React from "react";

const FilterPrice = (props) => {
  const { onChangeFilter } = props;

  const onChangePrice = (e) => {
    const priceMin = e.target.nextElementSibling.dataset.pricemin;
    const priceMax = e.target.nextElementSibling.dataset.pricemax;
    onChangeFilter({ priceMin, priceMax });
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
              data-pricemin="10000000"
              data-pricemax="15000000"
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
              data-pricemin="20000000"
              data-pricemax="30000000"
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
              data-pricemin="30000000"
              data-pricemax="50000000"
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
