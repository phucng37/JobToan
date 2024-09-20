import React, { useContext } from "react";
import { createFilterContext } from "../../context/ContextFilter";

const FilterClear = (props) => {
  const { onChangeFilter } = useContext(createFilterContext);
  const handleClearFilter = () => {
    onChangeFilter({
      sort_by: "",
      categoryName: "",
      review: "",
      priceMin: "",
      priceMax: "",
      productName: "",
    });
  };
  return (
    <div className="card mb-3">
      <div className="card-body fw-bold text-uppercase">
        Filter by{" "}
        <button
          type="reset"
          className="btn btn-sm btn-light"
          onClick={handleClearFilter}
        >
          <span aria-hidden="true">&times;</span> Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterClear;
