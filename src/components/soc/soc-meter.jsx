import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './soc-meter.scss'; // Create this file for SOC styles

const SocMeter = ({ charge, maxCharge }) => {
  const progress = (charge / maxCharge) * 100;

  return (
    <Box className="socmeter-wrapper">
      <Typography variant="body2" style={{ width: '150px' }}>
        {`Current Charge`}
      </Typography>
      <Box className="socmeter-progress">
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box className="socmeter-label">
        <Typography variant="body2" color="textSecondary">{`${charge} / ${maxCharge} kWh`}</Typography>
      </Box>
    </Box>
  );
};

export default SocMeter;
