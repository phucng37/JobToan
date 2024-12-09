import React from "react";
import { CAccordionBody, CAccordionHeader, CAccordionItem, CImage } from "@coreui/react";

const FilterPrice = (props) => {
  const { onChangeFilter } = props;

  const onChangePrice = (e) => {
    const priceMin = e.target.nextElementSibling.dataset.pricemin;
    const priceMax = e.target.nextElementSibling.dataset.pricemax;
    onChangeFilter({ priceMin, priceMax });
  };
  return (
    <CAccordionItem itemKey={3}>
    <CAccordionHeader>Price</CAccordionHeader>
    <CAccordionBody>
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
        </CAccordionBody>
        </CAccordionItem>
  );
};

export default FilterPrice;
