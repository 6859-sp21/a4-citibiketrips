import { React, Component } from "react";
import { FlyToInterpolator } from "react-map-gl";
import Map from "./Map";
import { station_info } from "../stations";
import { list_stations } from "../list_stations";
import { csv } from "d3";
import trip_data from "./all2020.csv";
import RangeInput from "./RangeInput";

const nyc = {
  longitude: -73.9544312807859,
  latitude: 40.737897096399855,
  zoom: 11,
};

const jc = {
  latitude: 40.72601247251457,
  longitude: -74.06792345744834,
  zoom: 12.57,
  bearing: 0.8015740858150702,
  pitch: 40.9,
};

class MapWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewState: jc,
      station_info: station_info,
      stations: list_stations,
      trips: [],
      loading: true,
      time_filter: [0,1440]
    };
  }

  setViewState = (viewState) => {
    this.setState({ viewState });
  };

  setFilter = (filter) => {
    this.setState({
      time_filter: filter
    })
  }

  formatLabel = (t) => {
    return `${Math.floor(t/60)}:${t%60}`
  }

  handleChangeViewState = ({ viewState }) => {
    this.setViewState(viewState);
  };

  handleFlyTo = (destination) => {
    this.setViewState({
      ...this.state.viewState,
      ...destination,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  componentDidMount() {
    csv(trip_data, function (d) {
      const t = new Date(d["starttime"]);
      return {
        duration: d["tripduration"],
        start_datetime: d["starttime"],
        start_time: t.toTimeString(),
        start_minutes: t.getHours() * 60 + t.getMinutes(),
        start_id: +d["start station id"],
        end_id: +d["end station id"],
        start_position: [
          +d["start station longitude"],
          +d["start station latitude"],
        ],
        end_position: [+d["end station longitude"], +d["end station latitude"]],
      };
    }).then((data) => {
      // console.log(data);
      const filter_data = data.filter(
        (d) =>
          d.start_position[0] != null &&
          d.start_position[1] != null &&
          d.end_position[0] != null &&
          d.end_position[1] != null &&
          d.start_id in this.state.station_info &&
          d.end_id in this.state.station_info
      );
      this.setState({
        trips: filter_data,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div>
        <Map
          width="100vw"
          height="100vh"
          viewState={this.state.viewState}
          onViewStateChange={this.handleChangeViewState}
          stations={this.state.stations}
          trips={this.state.trips}
          toggle={this.state.toggle}
          time_filter={this.state.time_filter}
        />
        <RangeInput
          min={0}
          max={1440}
          value={this.state.time_filter}
          animationSpeed={1}
          formatLabel={this.formatLabel}
          onChange={this.setFilter}
        />
      </div>
    );
  }
}

export default MapWrapper;
