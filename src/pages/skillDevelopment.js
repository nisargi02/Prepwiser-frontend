import React from 'react';
import { useNavigate } from 'react-router-dom';
import './tailwind.css';
import TopNavigation from './topNavigation.js';
import SideNavigation from './sideNavigation.js';


const FeatureCard = ({ Icon, title, description, navigateTo }) => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle click on card
  const handleCardClick = () => {
      navigate(navigateTo);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md min-h-full cursor-pointer transition-all duration-300 transform hover:scale-105 h-80" onClick={handleCardClick}>
      <div className="p-4 rounded-full items-center bg-purple-100 mt-4 mb-4">
        {Icon && <Icon className="h-8 w-8 text-button" />}
      </div>
      <h3 className="text-xl font-semibold text-dark-blue mt-6 mb-3 text-center items-center">{title}</h3>
      <p className="text-base text-dark-blue text-center">{description}</p>
    </div>
  );
};

const SkillDevelopment = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation />
      <div className="flex h-full">
        <SideNavigation />
      <div className="flex-grow bg-background-gray flex items-center justify-center"> {/* Added flex, items-center, justify-center for centering */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:px-8 w-full h-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-blue">Skill Development</h2>
            <p className="text-gray-blue mt-12 ml-56 mr-56">
            Craft your future with personalized career roadmaps and skill-building guides.<br/> Set goals, manage tasks, and track your progress—all in one place!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-24 ">
            
            <FeatureCard
            title="Skill Acquisition Roadmap"
            description="Personalized career roadmaps for skill acquisition based on your needs."
            navigateTo="/roadmap"
          />
          <FeatureCard
            title="Goal and Progress Tracker"
            description="Goal setting and division into manageable tasks. Incorporated a planner to track progress and plan adjustments."
            navigateTo="/goalTracker"
          />
          </div>
          </div>
          </div>
          </div>
          </div>
          );
          };


export default SkillDevelopment;
