import React, { useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import mapboxgl from "mapbox-gl";
import "../styles/map.css";
import geoJson from "./miky's-stores.json";
import Marker from "../../images/locationMarker.png";
import Tooltip from "./Tooltip";
import ReactDOM from "react-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWlreXNkZWxpIiwiYSI6ImNsN3pzeWlqYzAzdXozeHVpdGdrN2ZyMHcifQ.AxHbECPE8dfa1cpxVV-UuA";
// mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      attributionControl: false,
      center: [51.51253576855366, 25.31859760530991],
      zoom: 11,
    });

    map.on("load", function () {
      map.loadImage(
        Marker,
        // "../../images/locationMarker.png",
        // "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("image-name", image);

          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: geoJson.features,
            },
          });

          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "image-name",
              "icon-size": 0.3,
              "icon-allow-overlap": true,
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
              "text-size": 13,
              "text-allow-overlap": true,
            },
          });
        }
      );
    });

    map.on("mouseenter", (e) => {
      if (e.features.length) {
        map.getCanvas().style.cursor = "pointer";
      }
    });

    map.on("mouseleave", () => {
      map.getCanvas().style.cursor = "";
    });

    map.on("click", (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];

        const tooltipNode = document.createElement("div");
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map);
      }
    });

    // map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, []);

  return (
    <>
      <Helmet>
        <title>Miky's Deli - Find Us</title>
        <meta
          name="description"
          content="Dine-in at any of our 8 outlets across qatar."
        />
        <link rel="canonical" href="/map" />
      </Helmet>
      <section className="mapbox__map">
        <div className="map-container" ref={mapContainerRef} />
      </section>
    </>
  );
};

export default Map;
