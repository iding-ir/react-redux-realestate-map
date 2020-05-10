import Mapcraft from "mapcraft";

export default () => {
  return new Mapcraft({
    env: {
      mapbox: {
        token:
          "pk.eyJ1IjoiYXlkaW5naGFuZSIsImEiOiJjazJpcXB1Zm8xamNvM21sNjlsMG95ejY3In0.jMuteEFuzviEuitJZ-DY2w",
      },
    },
    styles: {
      light: "mapbox://styles/mapbox/streets-v11",
      // light: "/mapcraft/jsons/styles/light/style.json",
    },
    defaultStyle: "light",
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
};
