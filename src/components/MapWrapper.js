import { React, Component } from "react";
import { FlyToInterpolator } from "react-map-gl";
import Map from "./Map";
import { station_info } from "../stations";
import { list_stations } from "../list_stations";
import { csv } from "d3";
import trip_data from "./all2020.csv";
import RangeInput from "./RangeInput";
import WelcomeModal from "./WelcomeModal";

const nyc = {
  longitude: -73.9544312807859,
  latitude: 40.737897096399855,
  zoom: 11,
};

const jc = {
  latitude: 40.725779443680345,
  longitude: -74.05589375312678,
  zoom: 13,
  bearing: 0.8015740858150702,
  pitch: 40.9,
};

class MapWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewState: nyc,
      station_info: station_info,
      stations: list_stations,
      trips: [],
      loading: true,
      time_filter: [600, 780],
      playing: false,
      highlightStation: undefined,
      highlightCount: 0,
    };
  }

  setViewState = (viewState) => {
    this.setState({ viewState });
  };

  setFilter = (filter) => {
    this.setState({
      time_filter: filter,
    });
  };

  resetFilter = () => {
    this.setState({
      time_filter: [600, 780],
    });
  };

  setHighlight = (name, count) => {
    this.setState({
      highlightStation: name,
      highlightCount: count,
    });
  };

  formatLabel = (t) => {
    const hour = ("00" + Math.floor(t / 60)).slice(-2);
    const minutes = ("00" + (t % 60)).slice(-2);
    return `${hour}:${minutes}`;
  };

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

  togglePlaying = () => {
    this.setState({
      playing: !this.state.playing,
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
    })
      .then((data) => {
        const start_cut = new Date("01-01-2020");
        const stop_cut = new Date("05-01-2020");
        const filter_data = data.filter(
          (d) =>
            d.start_position[0] != null &&
            d.start_position[1] != null &&
            d.end_position[0] != null &&
            d.end_position[1] != null &&
            d.start_id in this.state.station_info &&
            d.end_id in this.state.station_info &&
            new Date(d.start_datetime) > start_cut &&
            new Date(d.start_datetime) < stop_cut
        );
        this.setState({
          trips: filter_data,
          loading: false,
        });
      })
      .then(() => {
        this.handleFlyTo(jc);
      });
  }

  render() {
    return (
      <div>
        <WelcomeModal loading={this.state.loading} />
        <Map
          width="100vw"
          height="100vh"
          viewState={this.state.viewState}
          onViewStateChange={this.handleChangeViewState}
          stations={this.state.stations}
          trips={this.state.trips}
          toggle={this.state.toggle}
          time_filter={this.state.time_filter}
          loading={this.state.loading}
          isPlaying={this.state.playing}
          resetFilter={this.resetFilter}
        ></Map>
        <RangeInput
          min={0}
          max={1439}
          value={this.state.time_filter}
          animationSpeed={20}
          formatLabel={this.formatLabel}
          onChange={this.setFilter}
          togglePlaying={this.togglePlaying}
        />
      </div>
    );
  }
}

export default MapWrapper;
