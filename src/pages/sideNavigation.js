import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faUser, faChevronLeft, faChevronRight, faHome, faBriefcase, faVideo, faFilePdf, faMap, faTools, faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './tailwind.css';

import { useUser } from './userContext.js'; 

const SidebarLink = ({ to, icon, children, isCollapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center ml-4 mr-4 mb-4 px-3 py-1 rounded-lg hover:bg-light-gray-blue ${
          isActive ? 'bg-white text-dark-blue' : 'text-white'
        }`
      }
    >
      <FontAwesomeIcon icon={icon} />
      {!isCollapsed && <span className="ml-4">{children}</span>}
    </NavLink>
  );
};

const SideNavigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { user } = useUser();  
  return (
    <div className={`relative bg-gray-blue ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300 h-full`}>
      <div className="flex items-center justify-between text-white text-lg font-semibold mb-6 pl-6 pt-4">
        {!isCollapsed && <span className="text-2xl">PrepWiser</span>}
      </div>
      <div className="mb-4 pl-6 pt-2">
        <div className={`flex items-center mb-3 ${isCollapsed ? 'h-10 w-10' : 'h-16 w-16'} bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300`}>
          <FontAwesomeIcon icon={faUser} className={`text-white ${isCollapsed ? 'text-lg' : 'text-2xl'}`} />
        </div>
        {!isCollapsed && (
          <p className="text-white text-lg">
            Welcome back, <span className="font-semibold">{user ? user.first_name : 'Guest'}!</span>
          </p>
        )}
      </div>
      <nav className="mt-10">
        <SidebarLink to="/" icon={faHome} isCollapsed={isCollapsed}>
          Home
        </SidebarLink>
        <SidebarLink to="/uploadPDF" icon={faBriefcase} isCollapsed={isCollapsed}>
          Question Bank
        </SidebarLink>
        <SidebarLink to="/videoSummarizer" icon={faVideo} isCollapsed={isCollapsed}>
          Video Summarizer
        </SidebarLink>
        <SidebarLink to="/pdfChatbot" icon={faFilePdf} isCollapsed={isCollapsed}>
          PDF Chatbot
        </SidebarLink>
        <SidebarLink to="/roadmap" icon={faMap} isCollapsed={isCollapsed}>
          Roadmap Generation
        </SidebarLink>
        <SidebarLink to="/goalTracker" icon={faTools} isCollapsed={isCollapsed}>
          Goal Tracking
        </SidebarLink>
        <SidebarLink to="/discussions" icon={faComments} isCollapsed={isCollapsed}>
          Discussions
        </SidebarLink>
        {/* ...other SidebarLinks */}
      </nav>
      <button
        onClick={toggleCollapse}
        className="absolute top-5 right-0 transform translate-x-1/2 bg-gray-700 text-white rounded-full focus:outline-none p-2"
      >
        <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
      </button>
    </div>
  );
};

export default SideNavigation;
