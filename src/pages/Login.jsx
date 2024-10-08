// src/pages/Login.js
import React from 'react';
import { useForm } from 'react-hook-form';  
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Replace with your login API
      const response = await axios.post('http://localhost:5000/api/login', data); 
      
      const { role, token } = response.data; // Assuming the API returns role and token
      localStorage.setItem('userRole', role);  // Store the user role in localStorage
      localStorage.setItem('token', token);    // Store the token in localStorage
      
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admindashboard');
      } else if (role === 'employee') {
        navigate('/employeedashboard');
      }

    } catch (error) {
      console.error('Login failed:', error.response?.data);
      alert(error.response?.data.message || 'Login failed. Please try again.');
    }
  };

  return (
    <>
    <NavBar/>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" 
            {...register('password', { required: 'Password is required' })} 
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
