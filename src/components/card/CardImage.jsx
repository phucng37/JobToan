import React from "react";
import { Link } from "react-router-dom";

const CardImage = (props) => {
  return (
    <div className="col-md-4 row g-3">
      <img
        src={props.src}
        alt="..."
        style={{
          backgroundSize: "cover",
          height: "250px",
          width: "100%",
        }}
      />
    </div>
  );
};

export default CardImage;
