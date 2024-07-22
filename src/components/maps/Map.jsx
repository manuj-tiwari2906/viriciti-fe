import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = ({ markerPosition }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(markerPosition, map.getZoom(), {
      animate: true,
    });
  }, [markerPosition, map]);

  return null;
};

const Map = ({ position }) => {
  const defaultPosition = [52.08940124511719, 5.105764865875244]; // Default position if position is null or invalid
  const [markerPosition, setMarkerPosition] = useState(defaultPosition);

  useEffect(() => {
    if (position) {
      setMarkerPosition([position.lat, position.lng]);
    } else {
      setMarkerPosition(defaultPosition);
    }
  }, [position]);

  return (
    <MapContainer center={markerPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker 
        position={markerPosition} 
        icon={L.icon({
          iconUrl: 'https://cdn-icons-png.freepik.com/512/9835/9835833.png',
          shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
          iconSize: [60, 65], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        })}
      />
      <MapComponent markerPosition={markerPosition} />
    </MapContainer>
  );
};

export default Map;
