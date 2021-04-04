import React from "react";
import ReactMapGL from "react-map-gl";
import { ArcLayer, ColumnLayer, DeckGL, ScatterplotLayer } from "deck.gl";
import { DataFilterExtension } from "@deck.gl/extensions";
import { easeCubicInOut } from "d3";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

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
  loading,
  isPlaying,
}) {
  const initCounters = () => {
    const zeros = {};
    stations.map((s) => {
      zeros[s.id] = 0;
    });
    return zeros;
  };

  const filterChange = () => {
    const update = initCounters();
    // const update = initCounters();
    trips.forEach((element) => {
      if (
        element.start_minutes >= time_filter[0] &&
        element.start_minutes <= time_filter[1]
      ) {
        if (selectedStation === undefined) {
          // get net flow if nothing is selected
          update[element.end_id] += 1;
          update[element.start_id] -= 1;
        } else {
          //  get net flow with respect to selected station
          if (
            element.start_id === selectedStation ||
            element.end_id === selectedStation
          ) {
            update[element.start_id] -= 1;
            update[element.end_id] += 1;
          }
        }
      }
    });
    // console.log(update);
    // if (init) setChange(change + 1);
    return update;
  };

  const red = [255, 0, 0];
  const green = [0, 255, 0];
  const neutral = [255, 140, 0];

  const [arcToggle, setArcToggle] = React.useState(true);
  const [selectedStation, setSelectedStation] = React.useState(undefined);
  const [counters, setCounters] = React.useState(initCounters());

  React.useEffect(() => {
    setCounters(filterChange());
  }, [selectedStation, loading, time_filter]);

  function getTooltip({ object }) {
    return (
      object &&
      `\
      Station Name: ${object.name}
      Net gain in bikes: ${counters[object.id]}`
    );
  }

  const layers = [
    new ColumnLayer({
      id: "column-stations",
      data: stations,
      pickable: true,
      extrude: true,
      opacity: 0.8,
      radiusMaxPixels: 15,
      radius: 50,
      getPosition: (d) => [d.longitude, d.latitude],
      getFillColor: (d) => {
        if (counters[d.id] === 0) return neutral;
        return counters[d.id] > 0 ? green : red;
      },
      elevationScale: 2,
      getElevation: (d) => {
        // console.log(d);
        return Math.abs(counters[d.id]);
      },
      onHover: ({ object }) => {
        if (object) {
          setSelectedStation(object.id);
        } else {
          setSelectedStation(undefined);
          setCounters(filterChange());
        }
      },
      onClick: ({ object }) => {
        // console.log(object);
      },
      autoHighlight: false,
      updateTriggers: {
        getFillColor: [counters],
        getElevation: [counters],
      },
      transitions: {
        getFillColor: {
          duration: isPlaying ? 0 : 500,
          easing: easeCubicInOut,
        },
        getElevation: {
          duration: isPlaying ? 0 : 500,
          easing: easeCubicInOut,
        },
      },
    }),
    new ArcLayer({
      id: "arc-layer",
      data: trips,
      getSourcePosition: (d) => d.start_position,
      getTargetPosition: (d) => d.end_position,
      getSourceColor: (d) => {
        return counters[d.start_id] > 0 ? green : red;
      },
      getTargetColor: (d) => {
        return counters[d.end_id] > 0 ? green : red;
      },
      visible: selectedStation,
      getFilterValue: (d) => [d.start_minutes, d.start_id],
      filterRange: [
        [time_filter[0], time_filter[1]],
        [selectedStation, selectedStation],
      ],
      onFilteredItemsChange: (x) => {
        setCounters(filterChange());
      },
      updateTriggers: {
        getSourceColor: [time_filter, selectedStation, counters],
        getTargetColor: [time_filter, selectedStation, counters],
      },
      extensions: [
        new DataFilterExtension({ filterSize: 2, countItems: true }),
      ],
    }),
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
        <DeckGL viewState={viewState} layers={layers} getTooltip={getTooltip} />
      </ReactMapGL>
    </div>
  );
}
