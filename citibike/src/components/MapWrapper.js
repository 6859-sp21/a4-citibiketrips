import { React, Component } from "react";
import { FlyToInterpolator } from "react-map-gl";
import Map from "./Map";
import station_info from '../stations'
import { csv } from "d3";

const nyc = {
    longitude: -73.9544312807859,
    latitude: 40.737897096399855,
    zoom: 11,
  };
  

class MapWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewState: nyc,
      stations: [],
    };
  }

  setViewState = (viewState) => {
    this.setState({ viewState });
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

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Map
          width="100vw"
          height="100vh"
          viewState={this.state.viewState}
          onViewStateChange={this.handleChangeViewState}
        />
      </div>
    );
  }
}

export default MapWrapper;
