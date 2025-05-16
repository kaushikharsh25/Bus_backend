import React from 'react';
import { useNavigate } from 'react-router-dom';
import kietLogo from '../assets/kiet-logo.png'; // Place KIET logo in assets folder
import userLogo from '../assets/user-logo.png'; // Replace with user's image/logo

const UserPage = () => {
  const navigate = useNavigate();

  const drivers = [
    { name: 'John Doe', bus: 'MH12XY1234', status: 'Available' },
    { name: 'Jane Smith', bus: 'UP16AB5678', status: 'Unavailable' },
  ];

  const previousTrips = [
    { date: '2024-05-10', from: 'Hostel', to: 'Campus', time: '08:00 AM' },
    { date: '2024-05-09', from: 'Campus', to: 'Hostel', time: '04:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <img src={kietLogo} alt="KIET Logo" className="h-16" />
        <img src={userLogo} alt="User" className="h-16 rounded-full border-2 border-white" />
      </div>

      <h1 className="text-3xl font-bold mb-4">Welcome, Student</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Available Drivers</h2>
          {drivers.map((d, i) => (
            <div key={i} className="mb-2 p-2 bg-gray-700 rounded">
              <p><strong>Name:</strong> {d.name}</p>
              <p><strong>Bus:</strong> {d.bus}</p>
              <p className={d.status === 'Available' ? 'text-green-400' : 'text-red-400'}>
                <strong>Status:</strong> {d.status}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Previous Trips</h2>
          {previousTrips.map((t, i) => (
            <div key={i} className="mb-2 p-2 bg-gray-700 rounded">
              <p><strong>Date:</strong> {t.date}</p>
              <p><strong>From:</strong> {t.from}</p>
              <p><strong>To:</strong> {t.to}</p>
              <p><strong>Time:</strong> {t.time}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/user-dashboard')}
          className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-500 transition"
        >
          Go to Map
        </button>
      </div>
    </div>
  );
};

export default UserPage;
