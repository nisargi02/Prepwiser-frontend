import React from 'react';

const RoadmapStep = ({ step, index, isLast, onCheck, allChecked }) => {
  return (
    <div className="relative flex flex-col items-center text-lg mb-16">
      <div className={`bg-white p-6 py-8 transition-all duration-300 transform hover:scale-105 rounded-lg shadow-lg w-[40rem] text-center ${allChecked ? 'bg-gradient-to-r from-button-hover to-button text-white' : 'bg-white text-dark-blue '}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold absolute -top-6 left-1/2 transform -translate-x-1/2 ${allChecked ? 'bg-button' : 'bg-button'}`}>
          {index + 1}
        </div>
        <h3 className={`font-bold ${allChecked ? 'text-white' : 'text-dark-blue'} pb-4`}>{step.step_content}</h3>
        <ul className="space-y-2">
          {step.resources.map((resource, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-button"
                checked={resource.checked}
                onChange={() => onCheck(index, idx)}
              />
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${allChecked ? 'text-white' : 'text-button'}  hover:text-blue-600`}>
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {!isLast && (
        <svg className="absolute top-full left-1/2 transform -translate-x-1/2" width="4" height="150">
          <line x1="0" y1="0" x2="0" y2="150" stroke="#7360DF" strokeWidth="10" />
        </svg>
      )}
    </div>
  );
};

export default RoadmapStep;
