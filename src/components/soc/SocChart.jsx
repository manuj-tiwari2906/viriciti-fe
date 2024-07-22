import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Box, Typography } from '@mui/material';
import './soc.scss';
import SocMeter from './soc-meter';
import { formatTimeToDecimal } from '../speed/SpeedChart';

const SocChart = ({ data }) => {

  const latestData = data[data.length - 1]; // Get the latest SOC data
  const charge = latestData ? latestData.soc : 0; // Example field
  const maxCharge = 100; // Example max value

  const formattedData = data.map((item) => ({
    time: formatTimeToDecimal(item.time).toFixed(2),
    soc: item.speed,
  }));

  console.log(formattedData, 'formattedData');


  return (
      <Box p={2}>
        <div className="chart-wrapper">
        <SocMeter charge={charge} maxCharge={maxCharge} />
          <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="soc"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="soc" stroke="#82ca9d" /> */}
            <Line type="monotone" dataKey="time" stroke="#8884d8" />
          </LineChart>
          </ResponsiveContainer>
        </div>
      </Box>
  );
};

export default SocChart;
