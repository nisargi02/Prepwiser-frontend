import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuestionCard = ({ questionObj }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl bg-white p-6 border rounded-lg shadow mb-4 relative w-full max-w-4xl mx-auto">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left flex justify-between items-center">
        <p className="text-lg font-semibold">{questionObj.question}</p>
        <span className="font-bold text-xl transition-transform duration-500 ease-in-out transform">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="mt-4 text-dark-blue text-sm transition-height duration-500 ease-in-out">
          {questionObj.answer}
        </div>
      )}
    </div>
  );
};

const QuestionBankGenerate = () => {
  const [modules, setModules] = useState({});
  const [selectedModuleQuestions, setSelectedModuleQuestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentModuleName, setCurrentModuleName] = useState("Module 1");

 


  useEffect(() => {
    if (location.state && location.state.data) {
      setModules(location.state.data);  
      const initialModule = "Module 1";
      const questions =Object.values(location.state.data.module_questions[initialModule] || {});
      setSelectedModuleQuestions(questions);
      // setCurrentModuleName(initialModule);
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/modules`)
        .then(response => response.json())
        .then(data => setModules(data))
        .catch(error => console.error('Error fetching modules:', error));
    }
  }, [location.state]);

  const handleModuleSelect = (moduleName) => {
    const questions = Object.values(modules.module_questions[moduleName] || {});
    setSelectedModuleQuestions(questions);
    setCurrentModuleName(moduleName)
  };
  return (
    <div className="min-h-screen">
      {/* <TopNavigation /> */}
      <div className="flex h-full">
      {/* <div className="fixed top-0 bottom-0 left-0 w-64 bg-gray-800 text-white overflow-auto"> {/* Fixed sidebar */}
                {/* <SideNavigation /> */}
            {/* </div> */} 
      <div className="flex-1 flex flex-col w-full h-full">
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-semibold my-4 text-center">Select a Module:</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {modules.module_questions && Object.keys(modules.module_questions).map(moduleName => (
            <button
              key={moduleName}
              onClick={() => handleModuleSelect(moduleName)}
              className={`font-bold px-4 py-2 m-2 rounded-full shadow w-30 ${
                currentModuleName === moduleName ? 'bg-button text-white' : 'bg-pink text-button border-2 border-button'
              }`}
            >
              {moduleName}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center">
          {selectedModuleQuestions.map((questionObj, index) => (
            <QuestionCard key={index} questionObj={questionObj} />
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default QuestionBankGenerate;
