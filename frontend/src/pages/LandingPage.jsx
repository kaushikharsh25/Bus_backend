import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === 'user') {
      navigate('/user-login');
    } else if (role === 'captain') {
      navigate('/captain-register');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Smart Bus App</h1>
        <p className="mb-4 text-gray-300">Please choose your role to continue:</p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => handleSelect('user')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
          >
            I'm a User
          </button>
          <button
            onClick={() => handleSelect('captain')}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded"
          >
            I'm a Captain
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
