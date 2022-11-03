import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const LocationMadal = ({ setDropoffLat, setDropoffLng }) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWlreXNkZWxpIiwiYSI6ImNsN3pzeWlqYzAzdXozeHVpdGdrN2ZyMHcifQ.AxHbECPE8dfa1cpxVV-UuA";

  const [lng, setLng] = useState(51.51253576855366);
  const [lat, setLat] = useState(25.31859760530991);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      attributionControl: false,
      center: [lng, lat],
      zoom: zoom,
      // maxBounds:bounds
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        countries: "qa",
        mapboxgl: mapboxgl,
      })
    );

    let geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    });

    map.addControl(geolocate);
    geolocate.on("geolocate", locateUser);
    function locateUser(e) {
      setDropoffLng(e.coords.longitude.toFixed(4));
      setDropoffLat(e.coords.latitude.toFixed(4));
      marker.on("dragend", onDragEnd);
    }

    const marker = new mapboxgl.Marker({ color: "green", draggable: true })
      .setLngLat([lng, lat])
      .addTo(map);

    function onDragEnd() {
      const lngLat = marker.getLngLat();

      setLng(lngLat.lng.toFixed(4));
      setLat(lngLat.lat.toFixed(4));
      setDropoffLng(lngLat.lng.toFixed(4));
      setDropoffLat(lngLat.lat.toFixed(4));
    }

    marker.on("dragend", onDragEnd);
  }, []);

  return (
    <>
      <div
        id="map"
        className="mb-2"
        style={{ width: "25rem", height: "25rem" }}
      ></div>
    </>
  );
};

export default LocationMadal;
