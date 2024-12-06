import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instanceAxios } from "../../utils/https";
import "./style.css";

const FilterCategory = (props) => {
  const { onChangeFilter } = props;
  const [categories, setCategories] = useState([]);
  const fetchCategories = useCallback(async () => {
    const res = await instanceAxios.get("category/show");
    if (res.status === 200) {
      setCategories(res?.data.categories);
    }
  }, [categories]);
  useEffect(() => {
    fetchCategories();
  }, []);

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
      <ul className="list-group list-group-flush show" id="filterCategory">
        {categories.map((category) => (
          <li
            className="list-group-item btn"
            data-cate="dell"
            onClick={(e) => onChangeFilter({ categoryId: category?._id })}
          >
            {category?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCategory;
