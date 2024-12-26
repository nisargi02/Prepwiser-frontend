import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from './topNavigation.js';
import SideNavigation from './sideNavigation.js';
import Quiz from './quiz.js';
import QuestionBankGenerate from './questionBankGenerate.js';
import PatternAnalysis from './patternAnalysis.js';
import './flipCard.css';

const QuestionModule = () => {
  const [activeTab, setActiveTab] = useState('Pattern Analysis');
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="h-[90vh]">
      <TopNavigation />
      <div className="flex h-screen">
        <SideNavigation />
        <div className="flex-1 flex flex-col w-full h-full bg-background-gray p-5">
          {/* <div className="flex justify-between items-center">
            <div className="flex flex-row space-x-1">
              <button
                onClick={() => handleTabClick('Pattern Analysis')}
                className=
                // {`tab-button px-4 py-2 rounded-md text-white font-medium ${activeTab === 'Pattern Analysis' ? 'bg-purple-900' : 'bg-purple-500 hover:bg-purple-600'}`}
                {`font-bold px-4 py-2 m-2 rounded-full shadow w-124  ${
                  activeTab === 'Pattern Analysis' ? 'bg-button text-white' : 'bg-background-gray text-button border-2 border-button'
                }`}
              >
                Pattern Analysis
              </button>
              <button
                onClick={() => handleTabClick('Quiz')}
                className=
                // {`tab-button px-4 py-2 rounded-md text-white font-medium ${activeTab === 'Quiz' ? 'bg-purple-900' : 'bg-purple-500 hover:bg-purple-600'}`}
                {`font-bold px-4 py-2 m-2 rounded-full shadow w-124 ${
                  activeTab === 'Quiz' ? 'bg-button text-white' : 'bg-background-gray text-button border-2 border-button'
                }`}

              >
                Quiz
              </button>
              <button
                onClick={() => handleTabClick('Question Bank')}
                className=
                // {`tab-button px-4 py-2 rounded-md text-white font-medium ${activeTab === 'Question Bank' ? 'bg-purple-900' : 'bg-purple-500 hover:bg-purple-600'}`}
                {`font-bold px-4 py-2 m-2 rounded-full shadow w-124 ${
                  activeTab === 'Question Bank' ? 'bg-button text-white' : 'bg-background-gray text-button border-2 border-button'
                }`}
              >
                Question Bank
              </button>
            </div>
          </div> */}
          <div className="flex justify-between items-center">
            <div className="flex flex-row space-x-4"> {/* Adjusted space-x to ensure equal gap */}
              {['Pattern Analysis', 'Question Bank', 'Quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`font-bold px-4 py-2 m-2 rounded-full shadow flex-grow text-center w-124 ${
                    activeTab === tab ? 'bg-button text-white' : 'bg-background-gray text-button border-2 border-button'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="tab-content mt-4">
            {activeTab === 'Pattern Analysis' && <PatternAnalysis />}
            {activeTab === 'Quiz' && <Quiz />}
            {activeTab === 'Question Bank' && <QuestionBankGenerate />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionModule;
