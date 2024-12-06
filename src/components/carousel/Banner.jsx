import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import React, { useEffect } from "react";

const Banner = (props) => {
  return (
    <CCarousel controls indicators>
      {props.data.map((item, index) => (
        <CCarouselItem key={index}>
          <CImage
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "500px",
            }}
            className="d-block w-100"
            src={item?.img}
            alt="slide 1"
          />
        </CCarouselItem>
      ))}
    </CCarousel>
  );
};

export default Banner;
