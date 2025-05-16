import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Bypass the backend verification, just simulate a login
        // In reality, you'd check the credentials on the backend
        // But for now, we'll just fake the response
        const fakeToken = 'fake-jwt-token';  // You can generate or use any fake token
  
        // Simulate storing the token (in localStorage or sessionStorage)
        localStorage.setItem('userToken', fakeToken);
  
        // Navigate to the user dashboard
        navigate('/user');
      } catch (err) {
        alert('Login failed');
      }
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
          required
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
