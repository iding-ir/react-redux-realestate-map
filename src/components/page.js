import React from "react";
import * as classNames from "classnames";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./page.css";

const Page = (props) => {
  let { isPageActive, page, togglePage } = props;

  const modalClasses = classNames("sc-modal sc-lg", {
    "sc-is-active": isPageActive,
  });

  const overlayClasses = classNames("sc-overlay", {
    "sc-is-active": isPageActive,
  });

  return (
    <>
      <div className={modalClasses}>
        <div className="sc-card sc-shadowed">
          <header className="sc-card-header">
            <h5>{page.title}</h5>
          </header>

          <div className="sc-card-body">
            <div>
              <ImageGallery
                items={page.images}
                thumbnailPosition="left"
                showFullscreenButton={false}
                showPlayButton={false}
              />
            </div>

            <div>
              <table className="sc-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Rooms</th>
                    <th>Area</th>
                    <th>Rent</th>
                    <th>Deposit</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{page.typeName}</td>
                    <td>{page.rooms}</td>
                    <td>{page.area}</td>
                    <td>{page.rent}</td>
                    <td>{page.deposit}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>{page.description}</p>
          </div>

          <footer className="sc-card-footer">
            <div className="sc-form-button sc-md sc-flex-rr">
              <button
                type="button"
                onClick={() => {
                  togglePage(false);
                }}
              >
                <span>Close</span>
              </button>
            </div>
          </footer>
        </div>
      </div>

      <div
        className={overlayClasses}
        onClick={() => {
          togglePage(false);
        }}
      ></div>
    </>
  );
};

export default Page;
