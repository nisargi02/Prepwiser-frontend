import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './tailwind.css';
import SideNavigation from './sideNavigation.js';
import TopNavigation from './topNavigation.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { useUser } from './userContext.js';



const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/signUp/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Registration successful', data);
            setUser(data);  // If using Context API
            localStorage.setItem('user', JSON.stringify(data)); // If using localStorage
            localStorage.setItem('token', data.access); 
            navigate('/');  // Adjust as needed for your routing
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'Unknown error occurred.');
        }
    } catch (error) {
        console.error('Error:', error);
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
        <Link to="/login" className="text-white hover:text-button-hover px-3 py-2 rounded-md text-sm font-medium">
          Log in
        </Link>
        {/* <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium">
          Sign up
        </Link> */}
      </div>
    </header>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <div className="p-6 max-w-md w-full bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Prepare smarter</h2>
          <p className="text-sm text-center text-gray-500 mb-6">Quickly prepare for exams with our one stop solution</p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSignUp}>
            <div className="flex gap-4 mb-4">
              <input
                className="flex-1 appearance-none border border-gray-300 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="flex-1 appearance-none border border-gray-300 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              className="w-full mb-4 appearance-none border border-gray-300 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full mb-4 appearance-none border border-gray-300 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <div className="mb-4 text-xs text-gray-600">
            By signing up you agree to our <a href="#" className="text-blue-600 hover:text-blue-800">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>.
          </div>
            <button
              className="w-full bg-button text-white p-2 rounded hover:bg-button-hover focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-button font-bold hover:text-dark-blue">Log in</a>.
        </p>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
            <p className="text-xs text-center text-gray-500 uppercase">or register with</p>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <div className="flex items-center justify-center mt-4">
            <a href="#" className="text-gray-600 hover:text-dark-blue">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="#" className="text-gray-600 hover:text-dark-blue ml-6">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
         </div>
      </div>
    </div>
    
  );
};

export default SignUpPage;
