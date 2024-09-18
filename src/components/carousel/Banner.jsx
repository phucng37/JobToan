import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleGetCateBeginRedux } from "../../redux/slice/cateSlice";

const Item = ({ item, index }) => {
  return (
    <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
      <div>
        <img
          src={item.img}
          className="img-fluid"
          alt={item.title}
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "500px",
          }}
        />
        {(item.title || item.description) && (
          <div className="carousel-caption d-none d-md-block">
            {item.title && <h5>{item.title}</h5>}
            {item.description && <p>{item.description}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

const Indicator = ({ item, index }) => (
  <li
    data-bs-target={`#${item}`}
    data-bs-slide-to={index}
    className={`${index === 0 ? "active" : ""}`}
  />
);

const Banner = (props) => {
  return (
    <div
      id={props.id}
      className={`carousel slide ${props.className}`}
      data-bs-ride="carousel"
      style={{ minHeight: 100 }}
    >
      <ol className="carousel-indicators">
        {props.data.map((item, index) => (
          <Indicator item={props.id} index={index} key={index} />
        ))}
      </ol>
      <div className="carousel-inner">
        {props.data.map((item, index) => (
          <Item item={item} index={index} key={index} />
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href={`#${props.id}`}
        role="button"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </a>
      <a
        className="carousel-control-next"
        href={`#${props.id}`}
        role="button"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </a>
    </div>
  );
};

export default Banner;
