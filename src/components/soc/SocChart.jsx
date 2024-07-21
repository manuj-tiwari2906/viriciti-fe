import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './soc.scss';

const SocChart = ({ data }) => {
  return (
    <div className="chart-wrapper">
      <h2 style={{ color: '#000' }}>State of Charge Profile</h2>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="soc" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default SocChart;
