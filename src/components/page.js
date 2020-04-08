import React from "react";
import * as classNames from "classnames";
import "./page.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Page = (props) => {
  let { isPageActive, page, togglePage } = props;

  const pageClasses = classNames("app-page-overlay", {
    "is-visible": isPageActive,
  });

  return (
    <div
      className={pageClasses}
      onClick={() => {
        togglePage(false);
      }}
    >
      <div
        className="app-page"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <header className="app-page-header">
          <h5>
            {page.title}

            <i
              className="sc-icon-cross sc-lg app-page-close"
              onClick={() => {
                togglePage(false);
              }}
            ></i>
          </h5>
        </header>

        <div className="app-page-body">
          <div>
            <ImageGallery items={page.images} thumbnailPosition="left" />
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
      </div>
    </div>
  );
};

export default Page;
