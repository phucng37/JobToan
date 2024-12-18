import { useContext, useState } from "react";
import { createFilterContext } from "../context/ContextFilter";
import { useNavigate } from "react-router-dom";

const regex = /^\s*$/;

const Search = () => {
  const { onChangeFilter } = useContext(createFilterContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="input-group" style={{flex: 1}}>
      <input
        id="search"
        name="search"
        type="text"
        className="form-control"
        placeholder="Search"
        required
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <label className="visually-hidden" htmlFor="search"></label>
      <button
        className="btn btn-primary text-white"
        type="button"
        aria-label="Search"
        onClick={() => {
          if(regex.test(search)) {
            return;
          }
          onChangeFilter({ productName: search.trim() })
          navigate('/product');
        }}
      >
        <i className="bi bi-search"></i>
      </button>
    </div>
  );
};
export default Search;
