import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import TopNavigation from './topNavigation.js'; // Ensure you have these components
import SideNavigation from './sideNavigation.js'; // Ensure you have these components
import { useUser } from './userContext.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        setUser(data);  // If using Context API
        localStorage.setItem('user', JSON.stringify(data)); // If using localStorage
        localStorage.setItem('token', data.access); // Assuming your response contains an 'access' token key
        localStorage.setItem('refreshToken', data.refresh); // Optionally store the refresh token
        console.log(data.access)
        navigate('/');
      } else {
        setError('Invalid credentials or server error');
      }
    } catch (error) {
      setError('Network error');
    }
  };
  return (
    <div className="bg-black h-screen">
      <header className="flex justify-between items-center p-6 border-b-2 bg-black">
      {/* <div className="text-2xl font-bold text-white">Prepwiser</div> */}
      <div className="text-2xl font-bold text-white"> <img src={`${process.env.PUBLIC_URL}/new_logo.png`} alt="PrepWiser Logo" className='w-12 h-10' /></div>
      <div className="flex items-center space-x-4">
        {/* Other header items */}
        {/* ... */}
        <Link to="/signUp" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
          Sign Up
        </Link>
        {/* <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium">
          Sign up
        </Link> */}
      </div>
    </header>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <div className="p-6 max-w-md w-full bg-white rounded shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">Let's start prep</h2>
          <p className="text-sm text-center text-gray-500 mb-6">
          Get last minute exam help
        </p>
          <form onSubmit={handleLogin}>
            <input
              className="w-full mb-4 appearance-none border border-gray-300 p-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 rounded"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full mb-4 appearance-none border border-gray-300 p-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
             <div className="mb-6 text-right">
            <a href="#" className="text-sm text-button hover:text-dark-blue">
              Forgot your password?
            </a>
          </div>
            <button
              className="w-full bg-button hover:bg-button-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log in
            </button>
          </form>
          {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
          <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-button hover:text-dark-blue">Register</Link>.
        </p>
        <div className="flex items-center justify-between my-4">
          <span className="w-1/4 border-b dark:border-gray-600 md:w-1/4"></span>
          <p className="text-xs text-center text-gray-500 uppercase md:px-2">or log in with</p>
          <span className="w-1/4 border-b dark:border-gray-400 md:w-1/4"></span>
        </div>
        <div className="flex justify-center">
          <a href="#" className="border rounded-full border-gray-400 p-3 mx-1 hover:bg-gray-100">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a href="#" className="border rounded-full border-gray-400 p-3 mx-1 hover:bg-gray-100">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </div>
    </div>
</div>
  
  );
};

export default LoginPage;
