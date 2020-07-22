import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';
 
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
      />
    );
  }
}

export default Map;