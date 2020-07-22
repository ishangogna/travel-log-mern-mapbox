import React, {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
 
class Map extends Component {
 
  state = {
    viewport: {
      width: '100vw',
      height: '100vh',
      latitude: 21.1458,
      longitude: 79.0882,
      zoom: 4
    },
    logs : []
  };

  componentDidMount = () => {
      const url = 'http://localhost:2000/api';
      fetch(url)
        .then(response => response.json())
        .then(logs => {
            this.setState({
                logs : logs
            })
            console.log(this.state.logs);
        });
  }
 
  render() {
    return (
      <ReactMapGL
        mapboxApiAccessToken = "pk.eyJ1IjoiaXNoYW5nb2duYSIsImEiOiJjano4NHc2Z3cwMGZqM2Ruazlmdm14Mm9rIn0.W1PryFGxgSy4ftdgYTQ6iw"
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      >
        {this.state.logs.map(log=>(
            <Marker key = {log._id} latitude={log.latitude} longitude={log.longitude} offsetLeft={-20} offsetTop={-10}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="red" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="feather feather-map-pin">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
            </svg>
            </Marker>
        ))}
      </ReactMapGL>
    );
  }
}

export default Map;