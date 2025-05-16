import React, { useState } from 'react';
import axios from 'axios';

const CaptainRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    color: '',
    plate: '',
    capacity: '',
    vehicleType: 'bus',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/captains/register', {
        email: formData.email,
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        password: formData.password,
        vehicle: {
          color: formData.color,
          plate: formData.plate,
          capacity: parseInt(formData.capacity),
          vehicleType: formData.vehicleType,
        },
      });

      alert('Registered successfully!');
      console.log(res.data);
    } catch (err) {
      alert('Error registering captain');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Captain Registration</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
        />

        <input
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
        />

        <input
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
        />

        <input
          name="color"
          placeholder="Vehicle Color"
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
        />

        <input
          name="plate"
          placeholder="Plate Number"
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
        />

        <select
          name="vehicleType"
          onChange={handleChange}
          className="w-full p-2 mb-6 rounded bg-gray-800 border border-gray-700 text-white"
        >
          <option value="bus">Bus</option>
          <option value="car">Car</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-semibold transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default CaptainRegister;
