import React from "react";
import * as classNames from "classnames";

import "./Tour.scss";

const Tour = (props) => {
  let { isTourActive, tourIndex, lastTourIndex, toggleTour } = props;

  const tourClasses = classNames("app-tour-controls sc-grid-4", {
    "is-visible": isTourActive,
  });

  return (
    <div className={tourClasses}>
      <div className="sc-form-button sc-stretched sc-lg">
        <button
          disabled={tourIndex <= 0}
          onClick={() => {
            toggleTour("prev");
          }}
        >
          Prev
        </button>
      </div>

      <div className="sc-form-button sc-stretched sc-lg">
        <button
          disabled={tourIndex <= 0}
          onClick={() => {
            toggleTour("restart");
          }}
        >
          Restart
        </button>
      </div>

      <div className="sc-form-button sc-stretched sc-lg">
        <button
          onClick={() => {
            toggleTour("end-tour");
          }}
        >
          End
        </button>
      </div>

      <div className="sc-form-button sc-stretched sc-lg">
        <button
          disabled={tourIndex >= lastTourIndex}
          onClick={() => {
            toggleTour("next");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tour;
