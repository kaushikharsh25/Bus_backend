import React, { useState } from 'react';
import axios from 'axios';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    phone: '',
    address: '',
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
      const res = await axios.post('http://localhost:4000/users/register', {
        email: formData.email,
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
      });

      alert('User registered successfully!');
      console.log(res.data);
    } catch (err) {
      alert('Error registering user');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">User Registration</h2>

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
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
        />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
          className="w-full p-2 mb-6 rounded bg-gray-800 border border-gray-700 text-white"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded text-white font-semibold transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
