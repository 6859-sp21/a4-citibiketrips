import React from "react";
import ReactMapGL from "react-map-gl";
// please be nice and don't misuse this token. Thanks
const MAPBOX_TOKEN =
  "pk.eyJ1IjoianpoYW5nNTYiLCJhIjoiY2tuMXhmNG44MTI1MzJ2bW9rbWhjNTM4YSJ9.Oukq6B1n9DOXpjfRZfUOJQ";

export default function Map({ width, height, viewState, onViewStateChange }) {
  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        width={width}
        height={height}
        viewState={viewState}
        onViewStateChange={onViewStateChange}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      />
    </div>
  );
}
