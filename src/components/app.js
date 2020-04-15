import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Mapcraft from "mapcraft";

import "./app.css";
import Map from "./map";
import Search from "./search";
import Tour from "./tour";
import Page from "./page";
import {
  setType,
  setRoom,
  setArea,
  setRent,
  setDeposit,
} from "../actions/filters";
import { setPlaces } from "../actions/places";
import { toggleSlide } from "../actions/slide";
import { toggleTour, setTour } from "../actions/tour";
import { togglePage, setPage } from "../actions/page";

class App extends Component {
  componentDidMount() {
    this.InitializeMap();
  }

  render() {
    return (
      <div className="app">
        <Map />

        <Search
          isSlideActive={this.props.slide.isSlideActive}
          toggleSlide={this.props.toggleSlide}
          filters={this.props.filters}
          tourLength={this.props.places.features.length}
          onChangeType={this.handleChangeType}
          onChangeRoom={this.handleChangeRoom}
          onChangeArea={this.handleChangeArea}
          onChangeRent={this.handleChangeRent}
          onChangeDeposit={this.handleChangeDeposit}
          toggleTour={this.handletoggleTour}
        />

        <Tour
          isTourActive={this.props.tour.isTourActive}
          tourIndex={this.props.tour.tourIndex}
          lastTourIndex={this.props.places.features.length - 1}
          toggleTour={this.handletoggleTour}
        />

        <Page
          isPageActive={this.props.page.isPageActive}
          page={this.props.page.page}
          togglePage={this.props.togglePage}
        />
      </div>
    );
  }

  handleFilter = () => {
    let { kinds, rooms, areas, rents, deposits } = this.props.filters;

    let filters = [
      "all",
      [">=", "area", areas.from],
      ["<=", "area", areas.to],
      [">=", "rent", rents.from],
      ["<=", "rent", rents.to],
      [">=", "deposit", deposits.from],
      ["<=", "deposit", deposits.to],
    ];

    let kindsFilter = kinds
      .filter((item) => item.checked)
      .reduce(
        (total, current) => {
          total.push(["==", "type", current.slug]);

          return total;
        },
        ["any"]
      );

    filters.push(kindsFilter);

    let roomsFilter = rooms
      .filter((item) => item.checked)
      .reduce(
        (total, current) => {
          if (current.slug === "one") total.push(["==", "rooms", 1]);
          if (current.slug === "two") total.push(["==", "rooms", 2]);
          if (current.slug === "more") total.push([">", "rooms", 2]);
          if (current.slug === "any") total.push([">=", "rooms", 0]);

          return total;
        },
        ["any"]
      );

    filters.push(roomsFilter);

    this.mapcraft.map.setFilter("point-symbol-places", filters);
  };

  handleGeoJson = () => {
    let { kinds, rooms, areas, rents, deposits } = this.props.filters;

    let selectedKinds = kinds
      .filter((type) => type.checked)
      .map((type) => type.slug);

    let selectedRooms = rooms
      .filter((room) => room.checked)
      .map((room) => room.slug);

    let places = { ...this.mapcraft.geoJsons.places };

    let features = places.features.filter((feature) => {
      let { type, rooms, area, rent, deposit } = feature.properties;

      if (
        selectedKinds.includes(type) &&
        area >= areas.from &&
        area <= areas.to &&
        rent >= rents.from &&
        rent <= rents.to &&
        deposit >= deposits.from &&
        deposit <= deposits.to
      ) {
        if (
          (rooms === 1 && selectedRooms.includes("one")) ||
          (rooms === 2 && selectedRooms.includes("two")) ||
          (rooms > 2 && selectedRooms.includes("more")) ||
          selectedRooms.includes("any")
        ) {
          return true;
        }
      }

      return false;
    });

    places.features = features;

    this.props.setPlaces(places);

    if (places.features.length) {
      this.mapcraft.fitBounds({
        geoJson: places,
      });
    }
  };

  handleChangeType = (event) => {
    let slug = event.target.getAttribute("data-type");
    let checked = event.target.checked;

    this.props.setType(slug, checked);
    this.handletoggleTour("end-tour");
    this.handleFilter();
    this.handleGeoJson();
  };

  handleChangeRoom = (event) => {
    let slug = event.target.getAttribute("data-room");

    this.props.setRoom(slug);
    this.handletoggleTour("end-tour");
    this.handleFilter();
    this.handleGeoJson();
  };

  handleChangeArea = (value) => {
    let from = value.min;
    let to = value.max;

    this.props.setArea(from, to);
    this.handletoggleTour("end-tour");
    this.handleFilter();
    this.handleGeoJson();
  };

  handleChangeRent = (value) => {
    let from = value.min;
    let to = value.max;

    this.props.setRent(from, to);
    this.handletoggleTour("end-tour");
    this.handleFilter();
    this.handleGeoJson();
  };

  handleChangeDeposit = (value) => {
    let from = value.min;
    let to = value.max;

    this.props.setDeposit(from, to);
    this.handletoggleTour("end-tour");
    this.handleFilter();
    this.handleGeoJson();
  };

  handletoggleTour = (action) => {
    let features = this.props.places.features;
    let lastIndex = features.length - 1;
    let isTourActive = this.props.tour.isTourActive;
    let tourIndex = this.props.tour.tourIndex;

    this.props.toggleSlide(false);

    if (action === "start-tour") {
      isTourActive = true;

      tourIndex = 0;
    }

    if (action === "end-tour") {
      isTourActive = false;

      tourIndex = 0;

      this.mapcraft.closePopup();

      this.props.toggleSlide(true);
    }

    if (action === "restart") {
      tourIndex = 0;
    }

    if (action === "next" && tourIndex < lastIndex) {
      tourIndex += 1;
    }

    if (action === "prev" && tourIndex > 0) {
      tourIndex -= 1;
    }

    if (isTourActive) {
      let feature = features[tourIndex];

      let lnglat = {
        lng: feature.geometry.coordinates[0],
        lat: feature.geometry.coordinates[1],
      };

      this.mapcraft.flyTo({
        lnglat: lnglat,
        zoom: 15,
      });

      this.openPopup(feature.properties, lnglat);
    }

    this.props.setTour(tourIndex);
    this.props.toggleTour(isTourActive);
  };

  InitializeMap = () => {
    this.mapcraft = new Mapcraft({
      env: {
        mapbox: {
          token:
            "pk.eyJ1IjoiYXlkaW5naGFuZSIsImEiOiJjazJpcXB1Zm8xamNvM21sNjlsMG95ejY3In0.jMuteEFuzviEuitJZ-DY2w",
        },
      },
      styles: {
        // light: "mapbox://styles/mapbox/streets-v11",
        light: "/mapcraft/jsons/styles/light/style.json",
      },
      map: {
        container: "app-map",
        center: [5, 60],
        zoom: 5,
        pitch: 50,
        bearing: 0,
        hash: false,
      },
      controls: {
        fullscreen: false,
        geolocation: false,
        navigation: true,
      },
      icons: {
        house: "./assets/images/icon-house.png",
        apartment: "./assets/images/icon-apartment.png",
        shared: "./assets/images/icon-shared.png",
        dorm: "./assets/images/icon-dorm.png",
      },
      geoJsons: {
        places: "./data/places.json",
      },
    });

    this.mapcraft.load().then(() => {
      this.handleFilter();

      setTimeout(() => {
        this.handleGeoJson();
      }, 2000);

      setTimeout(() => {
        this.props.toggleSlide(true);
      }, 5000);

      this.mapcraft.map.on("click", "point-symbol-places", (event) => {
        let properties = event.features[0].properties;
        let coordinates = event.features[0].geometry.coordinates.slice();

        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        this.openPopup(properties, coordinates);
      });
    });
  };

  openPopup = (properties, lnglat) => {
    if (typeof properties.images !== "object") {
      properties.images = JSON.parse(properties.images);
    }

    properties.typeName = this.props.filters.kinds.filter(
      (t) => t.slug === properties.type
    )[0].name;

    let {
      title,
      images,
      excert,
      typeName,
      rooms,
      area,
      rent,
      deposit,
    } = properties;

    let html = `<div class="sc-card sc-borderless">
      <div class="sc-card-header">
        <h5 class="app-page-trigger">${title}</h5>
      </div>

      <div class="sc-card-body">
        <div>
          <img src="${images[0].thumbnail}" class="app-page-trigger" />
        </div>

        <div>
          <table class="sc-table">
            <tbody>
              <tr>
                <td>Type</td>
                <td>${typeName}</td>
              </tr>

              <tr>
                <td>Rooms</td>
                <td>${rooms}</td>
              </tr>

              <tr>
                <td>Area</td>
                <td>${area}</td>
              </tr>

              <tr>
                <td>Rent</td>
                <td>${rent}</td>
              </tr>

              <tr>
                <td>Deposit</td>
                <td>${deposit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="sc-card-footer">${excert}</div>
    </div>`;

    this.mapcraft.openPopup({
      lnglat,
      html,
    });

    document.querySelectorAll(".app-page-trigger").forEach((element) => {
      element.addEventListener("click", () => {
        this.props.togglePage(true);
        this.props.setPage(properties);
      });
    });
  };
}

const mapStateToProps = (state) => ({
  filters: state.filters,
  places: state.places,
  slide: state.slide,
  tour: state.tour,
  page: state.page,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setType,
      setRoom,
      setArea,
      setRent,
      setDeposit,
      setPlaces,
      toggleSlide,
      toggleTour,
      setTour,
      togglePage,
      setPage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
