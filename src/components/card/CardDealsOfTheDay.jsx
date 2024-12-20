import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { CRow } from "@coreui/react";

// Random component
const Completionist = () => <span>Deals End!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span className="text-muted small">
        {hours}:{minutes}:{seconds} Left
      </span>
    );
  }
};

const CardDealsOfTheDay = (props) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title pb-3 border-bottom">{props.title}</h5>
      </div>
      <div className="card-body col-md-12">
        {/* <div className="row gx-3 d-flex flex-wrap">
          {props.children}
        </div> */}
        <CRow sm={{
          gutterY: 12
        }}>
          {props.children}
        </CRow>
      </div>
    </div>
  );
};

export default CardDealsOfTheDay;
