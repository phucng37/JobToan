import React from "react";
import { Link } from "react-router-dom";
const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb rounded-0">
        <li className="breadcrumb-item">
          <Link to="/" title="Home">
            Home
          </Link>
        </li>
        {/* <li className="breadcrumb-item">
          <Link to="/" title="Men">
            Products
          </Link>
        </li> */}
        <li className="breadcrumb-item active" aria-current="page">
          Products
        </li>
      </ol>
    </nav>
  );
};
export default Breadcrumb;
