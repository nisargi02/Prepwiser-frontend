import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './tailwind.css';
import TopNavigation from './topNavigation';
import SideNavigation from './sideNavigation';

const TopAnimation = () => {
  return (
    <div className="flex justify-center mb-4">
      <img src={`${process.env.PUBLIC_URL}/questionbankgenerate.gif`} alt="Loading animation" className="w-64 h-64" />
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

const LoadingModal = ({ steps, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <TopAnimation />
        {steps.map((step, index) => (
          <Step key={index} text={step.text} isActive={step.isActive} />
        ))}
      </div>
    </div>
  );
};

const UploadPdf2 = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currentSteps, setCurrentSteps] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePdfFilesChange = (event) => {
    setPdfFiles(Array.from(event.target.files));
  };

  const handleSyllabusChange = (event) => {
    setSyllabusFile(event.target.files[0]);
  };

  const handleData = () => {
    setLoading(true);
    setIsModalOpen(true);
    const steps = [
      'OCR to extract text...',
      'Tokenizing Questions...',
      'Clustering Questions...',
      'Identifying key topics...',
      'Pattern Analysis...',
      'Generating Question Bank...',
      'Generating Quiz...',
      'Generating additional resources...',
    ];

    const performStep = (index) => {
      setCurrentSteps((prev) => [
        ...prev.map((step, idx) => ({ ...step, isActive: false })),
        { text: steps[index], isActive: true }
      ]);

      if (index < steps.length - 1) {
        setTimeout(() => {
          performStep(index + 1);
        }, 3000);
      }
    };

    performStep(0);
  };

  const handleSubmit = async () => {
    handleData();

    const formData = new FormData();
    pdfFiles.forEach((file) => {
      formData.append('pdf_files', file);
    });
    if (syllabusFile) {
      formData.append('syllabus_files', syllabusFile);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/questionBankGenerate2/`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();

        // Wait for the last step to complete
        setTimeout(() => {
          setIsModalOpen(false); // Close modal after the last step delay
          navigate('/questionModule', { state: { data: data } }); // Navigate with data
        },  30000); // Assuming each step takes 3 seconds
      } else {
        console.error('Error uploading files:', response.statusText);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setIsModalOpen(false);
    } finally {
      setLoading(false);
      setCurrentSteps([]);
    }
};


  return (
    <div className="h-screen">
      <TopNavigation />
      <div className="flex h-full">
        <SideNavigation />
        <div className="flex-1 flex flex-col w-full h-4/5 mt-10 overflow-hidden">
          <div className="flex justify-center items-center h-full bg-background-gray bg-opacity-100">
            <div className="max-w-4xl w-full h-full p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
              <h1 className="text-3xl font-bold text-dark-blue mb-4">Generate Question Bank</h1>
              <img src={`${process.env.PUBLIC_URL}/pdf.jpg`} alt="Upload Pdf" className="w-full object-cover rounded-lg mb-4" style={{ height: '60%' }} />
              <div className="w-full flex flex-col items-center flex-1">
                <div className="flex flex-row gap-4 w-full mb-4 py-2">
                  <div className="flex-1 flex flex-col">
                    <h1 className="text-left text-button-hover mb-2 pb-2 font-bold">Upload Question Papers</h1>
                    <label className="block">
                      <input
                        type="file"
                        multiple
                        onChange={handlePdfFilesChange}
                        className="block w-full text-sm text-gray-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-purple-50 file:text-dark-purple
                                  hover:file:bg-purple-100
                          "/>
                    </label>
                  </div>
                  <div className="flex-1 flex flex-col ">
                    <h1 className="text-left text-button-hover mb-2 pb-2 font-bold">Upload Syllabus</h1>
                    <label className="block">
                      <input
                        type="file"
                        onChange={handleSyllabusChange}
                        className="block w-full text-sm text-gray-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-purple-50 file:text-dark-purple
                                  hover:file:bg-purple-100
                          "/>
                    </label>
                  </div>
                </div>
                <button
                  className="bg-button hover:bg-button-hover text-white font-bold py-2 px-4 rounded w-1/5 mt-10 mb-4 transition-colors"
                  onClick={handleSubmit}
                >
                  Upload Files
                </button>
              </div>
              <LoadingModal steps={currentSteps} isOpen={isModalOpen} />
              {/* {responseData && (
                <>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mb-2 transition-colors"
                    onClick={() => navigate('/questionBankGenerate', { state: { data: responseData } })}
                  >
                    Generate Question Bank
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-colors"
                    onClick={() => navigate('/quiz', { state: { data: responseData } })}
                  >
                    Start Quiz
                  </button>
                </>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UploadPdf2;
