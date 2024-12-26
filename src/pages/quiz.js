import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavigation from './topNavigation.js';
import SideNavigation from './sideNavigation.js';
import './flipCard.css';

const FlipCard = ({ question, answer, onClick, className }) => {
  return (
    <div className={`flip-card mx-2 my-2 ${className}`} onClick={onClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <p className="text-center">{question}</p>
        </div>
        <div className="flip-card-back">
          <p className="text-center">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const Quiz = () => {
  const [data, setData] = useState({});
  const [structuredReplyText, setStructuredReplyText] = useState({});
  const [focusedCard, setFocusedCard] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.data) {
      setData(location.state.data);
      setStructuredReplyText(location.state.data.structured_reply_text);
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/modules`)
        .then(response => response.json())
        .then(data => {
          if (data.structured_reply_text) {
            setStructuredReplyText(data.structured_reply_text);
          } else {
            console.error('Structured reply text not found in response:', data);
          }
        })
        .catch(error => console.error('Error fetching modules:', error));
    }
  }, [location.state]);

  const goToQuestionBank = () => {
    navigate('/questionBankGenerate', { state: { data: data } });
  };

  const handleCardClick = (topicName, index) => {
    setFocusedCard(`${topicName}-${index}`);
  };

  const handleOverlayClick = () => {
    setFocusedCard(null);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      {focusedCard && <div className="overlay active" onClick={handleOverlayClick}></div>}
      <div className="flex h-full bg-gray-100">
        <div className="flex-1 flex flex-col w-full h-full">
          <div className="container mx-auto px-4 flex justify-between items-start ">
            {/* <h1 className="text-3xl font-bold my-4">Quiz</h1> */}
            {/* <button 
              onClick={goToQuestionBank}
              className="bg-purple-600 hover:bg-black text-white font-bold py-2 px-4 rounded"
              style={{ marginTop: '12px' }}  // Inline style for top margin
            >
              Question Bank
            </button> */}
          </div>
          <div className="px-4">
            {Object.entries(structuredReplyText).length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(structuredReplyText).map(([topicName, details]) => (
                  <div key={topicName} className="topic-container">
                    <h2 className="text-l font-semibold mb-2 bg-button/5 p-3 rounded shadow text-center topic-header">
                      {topicName}:  
                      <span className="mx-2">-</span> 
                      <a href={details.youtube_link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700 hover:underline">
                        {details.youtube_link}
                      </a>
                    </h2>
                    <div className="grid grid-cols-3 gap-6">
                      {details.questions.map((q, index) => (
                        <FlipCard
                          key={`${topicName}-${index}`}
                          question={q.question}
                          answer={q.answer}
                          onClick={() => handleCardClick(topicName, index)}
                          className={focusedCard === `${topicName}-${index}` ? 'focused' : ''}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
