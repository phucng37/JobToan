const FilterStar = (props) => {
  const { onChangeFilter } = props;
  const onChangeStar = (e) => {
    const rating_filter = e.target.nextElementSibling.dataset.star;
    onChangeFilter({ rating_filter });
  };
  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterStar"
        aria-expanded="true"
        aria-controls="filterStar"
      >
        Customer Review
      </div>
      <div className="card-body show text-center" id="filterStar">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault5"
            onChange={onChangeStar}
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault5"
            aria-label="Star"
            data-star="5"
          >
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault4"
            onChange={onChangeStar}
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault4"
            aria-label="Star"
            data-star="4"
          >
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-secondary me-1 mb-2" />
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault3"
            onChange={onChangeStar}
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault3"
            aria-label="Star"
            data-star="3"
          >
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-secondary me-1 mb-2" />
            <i className="bi bi-star-fill text-secondary me-1 mb-2" />
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            onChange={onChangeStar}
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault2"
            aria-label="Star"
            data-star="2"
          >
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-secondary me-1 mb-2" />
            <i className="bi bi-star-fill text-secondary me-1 mb-2" />
            <i className="bi bi-star-fill text-secondary me-1 mb-2" />
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onChange={onChangeStar}
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault1"
            aria-label="Star"
            data-star="1"
          >
            <i className="bi bi-star-fill text-warning me-1 mb-2" />
            <i className="bi bi-star-fill text-secondary me-1 mb-2" />
            <i className="bi bi-star-fill text-secondary me-1 mb-2" />
            <i className="bi bi-star-fill text-secondary me-1 mb-2" />
            <i className="bi bi-star-fill text-secondary me-1 mb-2" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterStar;
