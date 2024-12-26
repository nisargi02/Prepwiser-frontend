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
    <div
      className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md min-h-full cursor-pointer transition-all duration-300 transform hover:scale-105 h-96"
      onClick={handleCardClick}
    >
      <div className="p-4 rounded-full bg-purple-100 mt-4 mb-4">
        {Icon && <Icon className="h-8 w-8 text-button" />}
      </div>
      <h3 className="text-xl font-semibold text-dark-blue mt-6 mb-3 text-center items-center">{title}</h3>
      <p className="text-base text-dark-blue text-center">{description}</p>
    </div>
  );
};

const ExamPrep = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation />
      <div className="flex h-full">
        <SideNavigation />
        <div className="flex-grow bg-background-gray flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:px-8 w-full h-full">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-dark-blue">Exam Preparation</h2>
              <p className="text-gray-blue mt-12 ml-56 mr-56">
                Master your exams with AI-driven insights—target key topics and practice with tailored question banks.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-24 gap-24">
              <FeatureCard
                title="Generate Question Bank"
                description="Generate a comprehensive question bank that targets the identified important topics."
                navigateTo="/uploadPDF" // Specify the path to navigate
              />
              <FeatureCard
                title="Video Analyzer"
                description="Distill long lectures into key takeaways."
                navigateTo="/videoSummarizer" // Specify the path to navigate
              />
              <FeatureCard
                title="PDF Chatbot"
                description="Upload books and interactively ask and receive answers to questions related to the uploaded material."
                navigateTo="/pdfChatbot" // Specify the path to navigate
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPrep;
