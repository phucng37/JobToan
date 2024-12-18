import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Banner = (props) => {
  return (
    <CCarousel controls indicators>
      {props?.data?.map((item, index) => (
        <CCarouselItem key={index}>
          <Link to={item.directURL}>
          <CImage
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "500px",
            }}
            className="d-block w-100"
            src={item?.thumbnailURL}
            alt="slide 1"
          />
          </Link>
        </CCarouselItem>
      ))}
    </CCarousel>
  );
};

export default Banner;
