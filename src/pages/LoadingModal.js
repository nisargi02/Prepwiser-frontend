import React from 'react';
import Lottie from 'lottie-react';
import roadmapAnimation from '../animations/roadmapanimation.json';

const TopAnimation = () => {
  return (
    <div className="flex justify-center mb-4">
      <Lottie animationData={roadmapAnimation} className="w-64 h-64" />
    </div>
  );
};

const LoadingAnimation = () => {
  return (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4.709z"></path>
    </svg>
  );
};

const Step = ({ text, isActive }) => {
  return (
    <div className={`flex items-center justify-center ${isActive ? 'shadow-top-lg font-bold' : ''} mb-2`}>
      {isActive && <LoadingAnimation />}
      <p className={`text-button ${isActive ? 'text-lg' : 'text-sm'}`}>{text}</p>
    </div>
  );
};

const LoadingModal = ({ loadingSteps, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-25 flex items-center justify-center p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
        <TopAnimation />
        {loadingSteps.map((step, index) => (
          <Step key={index} text={step.text} isActive={step.isActive} />
        ))}
      </div>
    </div>
  );
};

export default LoadingModal;
