import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './tailwind.css';

const TopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    // Clear user data from storage
    localStorage.removeItem('userToken');
    // Redirect to login or any other appropriate page
    navigate('/login');
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate('/', { state: { scrollTo: sectionId } });
  };

    return (
      <div className="sticky top-0 z-10">
      
      <header className="flex justify-between items-center px-3 bg-dark-blue h-16">
        <div className="text-2xl font-bold text-white"> <img src={`${process.env.PUBLIC_URL}/new_logo.png`} alt="PrepWiser Logo" className="w-12 h-10" /></div>
        <div className="flex items-center space-x-4">
          {/* Other header items */}
          {/* ... */}
          <Link to="/" className="rounded-lg hover:bg-gray-blue border-white/75 text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
            Home
          </Link>
          <Link to="/examPrep" className="rounded-lg hover:bg-gray-blue border-white/75 text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
            Exam Prep
          </Link>
          <Link to="/skillDevelopment" className="rounded-lg hover:bg-gray-blue border-white/75 text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
            Skill Development
          </Link>
          <Link to="/discussions" className="rounded-lg hover:bg-gray-blue border-white/75 text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
            Discussions
          </Link>
          <button onClick={() => scrollToSection('aboutUs')} className="rounded-lg hover:bg-gray-blue border-white/75 text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
            About
          </button>
          <button onClick={() => scrollToSection('footer')} className="rounded-lg hover:bg-gray-blue border-white/75 text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
            Contact Us
          </button>
          {/* <Link to="/login" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
            Log in
          </Link> */}
          <button
        onClick={handleSignOut}
        className="rounded-full hover:bg-gray-blue border-white/75 border-2 text-white px-3 py-2 text-sm font-medium"
      >
        Sign Out
      </button>
        </div>
      </header>
    </div>
                
  );
};

export default TopNavigation;
