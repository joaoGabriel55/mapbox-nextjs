import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef } from "react";
import styles from "../../styles/MapView.module.css";
import { MAPBOX_TOKEN } from "../constants";
import { Marker } from "../shared/types";

mapboxgl.accessToken = MAPBOX_TOKEN;

interface IMapView {
  markers: Marker[];
}

const getDrawControls = () => {
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
  });

  return draw;
};

const addMakerPopup = (marker: Marker, map: any) => {
  const [lat, lon] = marker.coordinates;
  const popup = new mapboxgl.Popup({ offset: 25 }).setText(marker.description);

  const el = document.createElement("div");
  el.className = styles.marker;
  el.style.backgroundImage = `url('${marker.imageUrl}')`;

  new mapboxgl.Marker(el).setLngLat([lon, lat]).setPopup(popup).addTo(map);
};

const loadGeojson = (map: any) => {
  map.addSource("brazil", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-100-mun.json",
  });

  map.addLayer({
    id: "brazil",
    type: "fill",
    source: "brazil",
    layout: {},
    paint: {
      "fill-color": "#1ebd68",
      "fill-opacity": 0.5,
    },
  });

  map.addLayer({
    id: "outline",
    type: "line",
    source: "brazil",
    layout: {},
    paint: {
      "line-color": "#105c33",
      "line-width": 1,
    },
  });

  map.on("click", "brazil", (e: any) => {
    const description = e.features[0].properties.description;

    new mapboxgl.Popup({ offset: 25 })
      .setLngLat(e.lngLat)
      .setHTML(description)
      .addTo(map);
  });

  map.on("mouseenter", "brazil", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "brazil", () => {
    map.getCanvas().style.cursor = "";
  });
};

const MapView = ({ markers }: IMapView) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 2,
    });

    const drawControls = getDrawControls();

    map.current.addControl(drawControls);
    map.current.on("load", () => {
      loadGeojson(map.current);
    });
  });

  useEffect(() => {
    if (!map.current) return;

    markers.forEach((marker) => {
      addMakerPopup(marker, map.current);
    });
  }, [markers]);

  return <div ref={mapContainer} className={styles["map-container"]} />;
};

export default MapView;
