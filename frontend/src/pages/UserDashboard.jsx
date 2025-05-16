import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Icons for available and unavailable buses
const availableBusIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61231.png', // Green Icon for available buses
  iconSize: [32, 32],
});

const unavailableBusIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61231.png', // Red Icon for unavailable buses
  iconSize: [32, 32],
});

const UserDashboard = () => {
  const [buses, setBuses] = useState([
    {
      location: { ltd: 28.7543, lng: 77.49 }, // KIET Group Location
      vehicle: {
        plate: 'MH12XY1234',
        vehicleType: 'Bus',
        capacity: 30,
      },
      captain: {
        fullname: { firstname: 'Harsh', lastname: 'Doe' },
      },
      status: 'active',
    },
    {
      location: { ltd: 28.7534, lng: 77.4934 }, // KIET Group Location
      vehicle: {
        plate: 'UP16AB5678',
        vehicleType: 'Bus',
        capacity: 40,
      },
      captain: {
        fullname: { firstname: 'Salman', lastname: 'Smith' },
      },
      status: 'inactive',
    },
    {
      location: { ltd: 22.32441, lng: 76.494323 }, // KIET Group Location
      vehicle: {
        plate: 'MH12XY9999',
        vehicleType: 'Bus',
        capacity: 35,
      },
      captain: {
        fullname: { firstname: 'Robert', lastname: 'Johnson' },
      },
      status: 'active',
    },
  ]);

  const [userLocation, setUserLocation] = useState([28.7541, 77.4944]); // Set to KIET Group location

  useEffect(() => {
    // Optional: Set user location dynamically (for now, default is set above)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  return (
    <div className="h-screen w-screen">
      <MapContainer center={userLocation} zoom={15} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {buses.map((bus, index) => {
          const busIcon = bus.status === 'active' ? availableBusIcon : unavailableBusIcon;

          return (
            <Marker
              key={index}
              position={[bus.location.ltd, bus.location.lng]}
              icon={busIcon}
            >
              <Popup>
                <strong>Bus Plate:</strong> {bus.vehicle.plate} <br />
                <strong>Type:</strong> {bus.vehicle.vehicleType} <br />
                <strong>Capacity:</strong> {bus.vehicle.capacity} <br />
                <strong>Captain:</strong> {bus.captain.fullname.firstname} {bus.captain.fullname.lastname} <br />
                <strong>Status:</strong> {bus.status === 'active' ? 'Available' : 'Not Available'} <br />
                <strong>Location:</strong> {bus.location.ltd}, {bus.location.lng}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default UserDashboard;
