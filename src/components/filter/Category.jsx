import React from "react";
import { Link } from "react-router-dom";

const FilterCategory = (props) => {
  const { onChangeFilter } = props;
  return (
    <div className="card mb-3 accordion">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCategory"
        aria-expanded="true"
        aria-controls="filterCategory"
      >
        Categories
      </div>
      <ul
        className="list-group list-group-flush show"
        id="filterCategory"
        onClick={(e) => onChangeFilter({ categoryName: e.target.dataset.cate })}
      >
        <li className="list-group-item btn" data-cate="dell">
          DELL
        </li>
        <li className="list-group-item btn" data-cate="acer">
          ACER
        </li>
        <li className="list-group-item btn" data-cate="asus">
          ASUS
        </li>
        <li className="list-group-item btn" data-cate="gaming">
          GAMING
        </li>
        <li className="list-group-item btn" data-cate="macbook">
          MACBOOK
        </li>
        <li className="list-group-item btn" data-cate="hp">
          HP
        </li>
      </ul>
    </div>
  );
};

export default FilterCategory;
