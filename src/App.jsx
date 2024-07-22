import React, { useEffect, useState } from "react";
import SpeedChart from "./components/speed/SpeedChart";
import SocChart from "./components/soc/SocChart";
import Map from "./components/maps/Map";
import { Container, Grid, Paper, Box, Typography } from "@mui/material";
import "./App.scss";

const App = () => {
  const defaultPosition = { lat: 52.08940124511719, lng: 5.105764865875244 };
  const [data, setData] = useState([]);
  const [position, setPosition] = useState(defaultPosition);
  const [incidents, setIncidents] = useState([]);
  const [currentSpeed, setCurrentSpeed] = useState(30);
  const maxSpeed = 100;

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData((prevData) => [...prevData, newData]);

      if (newData.gps) {
        const [lat, lng] = newData.gps.split('|').map(Number);
        setPosition({ lat, lng });
      }

      if (newData.speed) {
        setCurrentSpeed(newData.speed);
      }

      if (newData.incident) {
        setIncidents((prevIncidents) => [...prevIncidents, newData.incident]);
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
  // console.log(newData)

  return (
    <Container style={{ margin: 0, width: '100% !important', maxWidth: '100%', paddingBottom: '30px' }}>
      <Box my={4}>
        <Typography
          sx={{ color: "#000", fontWeight: 600 }}
          variant="h4"
          component="h1"
          gutterBottom
        >
          Vehicle Dashboard
        </Typography>
      </Box>
      <Grid style={{ display: 'flex', height: '100%', gap: '20px' }} md={12} spacing={3}>
        <Grid style={{ width: '58%', display: 'flex', flexDirection: 'column', rowGap: '30px' }} item xs={12} md={8}>
          <Grid item xs={12} md={12}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  Speed Chart
                </Typography>
                <SpeedChart currentSpeed={currentSpeed} maxSpeed={maxSpeed} data={data} />
              </Box>
            </Paper>
          </Grid>
          <Grid xs={12} md={12}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  SOC Chart
                </Typography>
                <SocChart data={data} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid style={{ width: '40%' }} item md={4}>
          <Paper style={{ height: '100%' }} elevation={3}>
            <Box style={{ height: '100%' }} p={2}>
              <Typography variant="h6" gutterBottom>
                Map
              </Typography>
              <Map position={position} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
