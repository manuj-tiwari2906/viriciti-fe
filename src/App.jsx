import React, { useEffect, useState } from 'react';
import SpeedChart from './components/speed/SpeedChart';
import SocChart from './components/soc/SocChart';
import Map from './components/maps/Map';
import './App.scss';

const App = () => {
  const defaultPosition = { lat: 52.08940124511719, lng: 5.105764865875244 }; // Default position
  const [data, setData] = useState([]);
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData((prevData) => [...prevData, newData]);

      if (newData.gps && newData.gps.lat !== undefined && newData.gps.lng !== undefined) {
        setPosition({ lat: newData.gps.lat, lng: newData.gps.lng });
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  console.log(position, 'positionApp')
  return (
    <div className="app">
      <div className="map-container">
        <Map position={position} />
      </div>
      <div className="charts">
        <SpeedChart data={data} />
        <SocChart data={data} />
      </div>
    </div>
  );
};

export default App;
