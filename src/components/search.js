import React from "react";
import InputRange from "react-input-range";
import * as classNames from "classnames";

const Searc = (props) => {
  let {
    isSlideActive,
    toggleSlide,
    tourLength,
    onChangeType,
    onChangeRoom,
    onChangeArea,
    onChangeRent,
    onChangeDeposit,
    toggleTour,
  } = props;

  let { kinds, rooms, areas, rents, deposits } = props.filters;

  const slideClasses = classNames("sc-slide", {
    "sc-is-open": isSlideActive,
  });

  return (
    <div className={slideClasses}>
      <header className="sc-slide-header">
        <h5>Filters</h5>

        <i
          className="sc-icon-menu sc-slide-toggle"
          onClick={() => {
            toggleSlide(!isSlideActive);
          }}
        ></i>
      </header>

      <div className="sc-slide-body">
        <form className="sc-form">
          <h6>Type</h6>

          <div className="sc-form-group sc-grid-2">
            {kinds.map((type, index) => {
              return (
                <div className="sc-form-checkbox" key={index}>
                  <input
                    type="checkbox"
                    name="kinds"
                    id={type.slug}
                    data-type={type.slug}
                    checked={type.checked}
                    onChange={(event) => {
                      onChangeType(event);
                    }}
                  />

                  <label htmlFor={type.slug}>
                    <i className="sc-icon-checkbox"></i>

                    <span>{type.name}</span>
                  </label>
                </div>
              );
            })}
          </div>

          <h6>Rooms</h6>

          <div className="sc-form-group sc-grid-2">
            {rooms.map((room, index) => {
              return (
                <div className="sc-form-radio" key={index}>
                  <input
                    type="radio"
                    name="rooms"
                    id={room.slug}
                    data-room={room.slug}
                    checked={room.checked}
                    onChange={(event) => {
                      onChangeRoom(event);
                    }}
                  />

                  <label htmlFor={room.slug}>
                    <i className="sc-icon-radio"></i>

                    <span>{room.name}</span>
                  </label>
                </div>
              );
            })}
          </div>

          <h6>Area</h6>

          <div className="sc-form-group sc-grid-1">
            <InputRange
              maxValue={200}
              minValue={20}
              step={5}
              value={{ min: areas.from, max: areas.to }}
              onChange={(value) => {
                onChangeArea(value);
              }}
            />
          </div>

          <h6>Rent</h6>

          <div className="sc-form-group sc-grid-1">
            <InputRange
              maxValue={50000}
              minValue={3000}
              step={1000}
              value={{ min: rents.from, max: rents.to }}
              onChange={(value) => {
                onChangeRent(value);
              }}
            />
          </div>

          <h6>Deposit</h6>

          <div className="sc-form-group sc-grid-1">
            <InputRange
              maxValue={200000}
              minValue={10000}
              step={1000}
              value={{ min: deposits.from, max: deposits.to }}
              onChange={(value) => {
                onChangeDeposit(value);
              }}
            />
          </div>
        </form>
      </div>

      <footer className="sc-slide-footer">
        <h6>{props.tourLength || "No"} results found.</h6>

        <div className="sc-form-group sc-grid-1">
          <div className="sc-form-button sc-stretched">
            <button
              disabled={tourLength === 0}
              onClick={() => {
                toggleTour("start-tour");
              }}
            >
              <i className="sc-icon-route"></i>

              <span>Tour through the results</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Searc;
