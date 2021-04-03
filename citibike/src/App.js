import React from 'react';
import { FlyToInterpolator } from 'react-map-gl';
import './App.css';
import Map from './components/Map';
import * as Locations from './location';
import {csv} from 'd3'


const App = () => {
  const [viewState, setViewState] = React.useState(Locations.nyc)

  const handleChangeViewState = ({viewState}) => setViewState(viewState);

  const handleFlyTo = destination => {
    setViewState({
      ...viewState, 
      ...destination,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  }

  const [libraries, setLibraries] = React.useState([]);
  
  //  like componentDidMount I think
  React.useEfect(() => {
    csv('./')
  }, [])

  return (
    <div>
      <Map width = '100vw' height = '100vh' viewState={viewState} onViewStateChange={handleChangeViewState}/>
    </div>
  )
}

export default App;
