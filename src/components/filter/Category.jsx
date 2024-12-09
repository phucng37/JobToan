import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instanceAxios } from "../../utils/https";
import { CAccordionBody, CAccordionHeader, CAccordionItem, CImage } from "@coreui/react";
import "./style.css";
const FilterCategory = (props) => {
  const { onChangeFilter } = props;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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
    <CAccordionItem itemKey={1} className="mb-2">
      <CAccordionHeader>Categories</CAccordionHeader>
      <CAccordionBody id="filterCategory">
        {categories.map((category) => (
      <div className="item py-2">
      <input
        className="form-check-input me-3"
        type="radio"
        id="flexCheckDefault1"
        name="categoryFilter"
        onChange={() => {
          setSelectedCategory(category?._id);
          onChangeFilter({ categoryId: category?._id });
        }}
      />
      <label
        className="form-check-label"
        htmlFor="flexCheckDefault1"
        data-pricemin="10000000"
        data-pricemax="15000000"
      >
        {category.name}
      </label>
    </div>
        ))}
     </CAccordionBody>
     </CAccordionItem>
  );
};

export default FilterCategory;
