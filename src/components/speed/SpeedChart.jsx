import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';
import Speedometer from '../speedometer/speedometer';

// Function to convert timestamp into decimal format
export const formatTimeToDecimal = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // Convert hours and minutes to a decimal number
  return hours + (minutes / 60);
};

// Function to format x-axis ticks to show only two decimal places
const formatDecimalTicks = (value) => Number(value).toFixed(2);

const SpeedChart = ({ data, currentSpeed, maxSpeed }) => {
  // Format the data with time as decimal with two digits
  const formattedData = data.map((item) => ({
    time: formatTimeToDecimal(item?.time).toFixed(2),
    speed: Number(item.speed).toFixed(2),
    secondaryMetric: item.secondaryMetric || 0
  }));

  return (
    <div className="chart-wrapper">
      <Box p={2}>
        <Speedometer speed={currentSpeed} maxSpeed={maxSpeed} />
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={formatDecimalTicks} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="speed" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="time" stroke="#8884d8" />
            {/* Add more <Line> components here if you have additional data series */}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </div>
  );
};

export default SpeedChart;
