import React from "react";
import ReactMapGL from "react-map-gl";
import { ArcLayer, ColumnLayer, DeckGL, ScatterplotLayer } from "deck.gl";
import { DataFilterExtension } from "@deck.gl/extensions";

// please be nice and don't misuse this token. Thanks
const MAPBOX_TOKEN =
  "pk.eyJ1IjoianpoYW5nNTYiLCJhIjoiY2tuMXhmNG44MTI1MzJ2bW9rbWhjNTM4YSJ9.Oukq6B1n9DOXpjfRZfUOJQ";

export default function Map({
  width,
  height,
  viewState,
  onViewStateChange,
  stations,
  trips,
  time_filter,
}) {
  // console.log(stations)
  // const [hoverInfo, setHoverInfo] = React.useState;
  const initCounters = () => {
    const zeros = {};
    stations.map((s) => {
      zeros[s.id] = 0;
    });
    // console.log(zeros);
    return zeros;
  };

  const [arcToggle, setArcToggle] = React.useState(true);
  const [selectedStation, setSelectedStation] = React.useState(undefined);
  const [counters, setCounters] = React.useState(initCounters());

  const layers = [
    new ScatterplotLayer({
      id: "stations",
      data: stations,
      pickable: true,
      opacity: 0.8,
      radiusMaxPixels: 15,
      getPosition: (d) => [d.longitude, d.latitude],
      getRadius: 50,
      getFillColor: (d) => [255, 140, 0],
      onHover: ({ object }) => {
        if (object) {
          setSelectedStation(object.id);
        } else {
          setSelectedStation(undefined);
        }
      },
      onClick: ({ object }) => {
        console.log(object);
      },
      autoHighlight: true,
      transitions: {
        getRadius: 250,
      },
    }),
    //  do more layers, a source and a target, so that total counts are determined
    new ArcLayer({
      id: "arc-layer",
      data: trips,
      getSourcePosition: (d) => d.start_position,
      getTargetPosition: (d) => d.end_position,
      getSourceColor: [0, 255, 0],
      getTargetColor: [255, 0, 0],
      visible: selectedStation,
      getFilterValue: (d) => [d.start_minutes, d.start_id],
      filterRange: [
        [time_filter[0], time_filter[1]],
        [selectedStation, selectedStation],
      ],
      onFilteredItemsChange: (x) => console.log(x),
      extensions: [
        new DataFilterExtension({ filterSize: 2, countItems: true }),
      ],
    }),
    // new ColumnLayer({
    //   id: "stations",
    //   data: stations,
    //   pickable: true,
    //   opacity: 0.8,
    //   radiusMinPixels: 10,
    //   radiusMaxPixels: 15,
    //   getPosition: (d) => [d.longitude, d.latitude],
    //   radius: 50,
    //   getFillColor: (d) => [255, 140, 0],
    //   onHover: ({ object }) => {
    //     if (object) {
    //       setSelectedStation(object.id);
    //     } else {
    //       setSelectedStation(undefined);
    //     }
    //   },
    //   onClick: ({ object }) => {
    //     console.log(object);
    //   },
    //   autoHighlight: true,
    // }),
  ];

  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        width={width}
        height={height}
        viewState={viewState}
        onViewStateChange={onViewStateChange}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        <DeckGL viewState={viewState} layers={layers} />
      </ReactMapGL>
    </div>
  );
}
