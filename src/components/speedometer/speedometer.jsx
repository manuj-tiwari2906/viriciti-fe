import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './speedometer.scss';

const Speedometer = ({ speed, maxSpeed }) => {
  const progress = (speed / maxSpeed) * 100;

  return (
    <Box className="speedometer-wrapper">
      <Typography variant="body2" style={{ width: '100px', marginBottom: '10px' }}>
        {`Current Speed`}
      </Typography>
      <Box className="speedometer-progress">
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box className="speedometer-label">
        <Typography variant="body2" color="textSecondary">{`${speed} km/h`}</Typography>
      </Box>
    </Box>
  );
};

export default Speedometer;
