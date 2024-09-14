import { useContext, useState } from "react";
import { createFilterContext } from "../context/ContextFilter";

const Search = () => {
  const { onChangeFilter } = useContext(createFilterContext);
  const [search, setSearch] = useState("");

  return (
    <div className="input-group">
      <input
        id="search"
        name="search"
        type="text"
        className="form-control"
        placeholder="Search"
        required
        value={search}
        onChange={(e) => setSearch(e.target.value.trim())}
      />
      <label className="visually-hidden" htmlFor="search"></label>
      <button
        className="btn btn-primary text-white"
        type="button"
        aria-label="Search"
        onClick={() => onChangeFilter({ name: search })}
      >
        <i className="bi bi-search"></i>
      </button>
    </div>
  );
};
export default Search;
