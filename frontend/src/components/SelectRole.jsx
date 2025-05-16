import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectRole = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    if (role === 'user') {
      navigate('/register/user');
    } else if (role === 'captain') {
      navigate('/register/captain');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gray-900 p-10 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Who are you?</h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleSelection('user')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition font-semibold"
          >
            I'm a User
          </button>

          <button
            onClick={() => handleSelection('captain')}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded transition font-semibold"
          >
            I'm a Captain
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
