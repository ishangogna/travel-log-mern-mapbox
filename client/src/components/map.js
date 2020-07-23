import React, {Component} from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import LogEntry from './logEntryForm';
 
class Map extends Component {
 
  state = {
    viewport: {
      width: '100vw',
      height: '100vh',
      latitude: 21.1458,
      longitude: 79.0882,
      zoom: 4
    },
    logs : [],
    showPopup : {},
    newPopup : {
        longitude : 0,
        latitude : 0,    }
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

  getLogs = (bool) => {
    if (bool === true){
        const url = 'http://localhost:2000/api';
        fetch(url)
        .then(response => response.json())
        .then(logs => {
            this.setState({
                logs : logs,
                newPopup : {
                    longitude : 0
                }
            })

        });
    }
    
    
}

  addNewLog = (e) => {
      const [ longitude, latitude ] = e.lngLat;
      this.setState({newPopup : {longitude, latitude}});
  }

  render() {
    return (
      <ReactMapGL
        onDblClick = {this.addNewLog}
        mapboxApiAccessToken = "pk.eyJ1IjoiaXNoYW5nb2duYSIsImEiOiJjano4NHc2Z3cwMGZqM2Ruazlmdm14Mm9rIn0.W1PryFGxgSy4ftdgYTQ6iw"
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      >        
        {this.state.logs.map(log=>(
            <div key = {log._id} onClick = {()=>{this.setState({showPopup : {[log._id] : true}})}}>
                <Marker latitude={log.latitude} longitude={log.longitude} offsetLeft={-20} offsetTop={-10}>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="red" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="feather feather-map-pin"
                        >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                </Marker>
                { this.state.showPopup[log._id] ? (
                    <Popup
                    latitude={log.latitude} 
                    longitude={log.longitude}
                    closeButton={true}
                    closeOnClick={true}
                    onClose={() => this.setState({showPopup: false})}
                    anchor="top" >
                    <div>
                        <h3>{log.title}</h3>
                        <p>{log.comments}</p>
                    </div>
                </Popup>
                ) : null}
                
            </div>
        ))}
        {
            this.state.newPopup.longitude > 0 ? (
                <div>
                    <Marker latitude={this.state.newPopup.latitude} longitude={this.state.newPopup.longitude} offsetLeft={-20} offsetTop={-10}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="red" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="feather feather-map-pin"
                            >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </Marker>  
                    <Popup
                    latitude={this.state.newPopup.latitude} 
                    longitude={this.state.newPopup.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => this.setState({newPopup: {longitude : 0, latitude : 0, name : '', comments : ''}})}
                    anchor="top" >
                    <div>
                        <h3 style = {{textAlign : 'center'}}>Add a new Log!</h3>
                        <LogEntry 
                            longitude= {this.state.newPopup.longitude}
                            latitude = {this.state.newPopup.latitude}
                            getLogs = {this.getLogs}
                            />
                    </div>
                </Popup>

                </div>
            ) : null
        }
      </ReactMapGL>
    );
  }
}

export default Map;