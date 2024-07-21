import React from 'react';
import './vehicle.scss';

const VehicleData = ({ data }) => {
  if (data.length === 0) return null;

  const latestData = data[data.length - 1];

  return (
    <div className="vehicle-data">
      <h2>Vehicle Data</h2>
      <div className="data-item">
        <span>Current Speed:</span>
        <span>{latestData.speed} km/h</span>
      </div>
      <div className="data-item">
        <span>State of Charge:</span>
        <span>{latestData.soc} %</span>
      </div>
      <div className="data-item">
        <span>Energy:</span>
        <span>{latestData.energy} kWh</span>
      </div>
      <div className="data-item">
        <span>Odometer:</span>
        <span>{latestData.odo} km</span>
      </div>
      <div className="data-item">
        <span>GPS Location:</span>
        <span>{latestData.gps[0]}, {latestData.gps[1]}</span>
      </div>
    </div>
  );
};

export default VehicleData;
