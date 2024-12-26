import React, { useState } from 'react';
import './tailwind.css';
import SideNavigation from './sideNavigation.js';
import TopNavigation from './topNavigation.js';

const VideoCard = ({ topicName, videoTitle, youtubeUrl, thumbnailUrl }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex">
      <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="relative mr-4 w-40 h-40">
        <img src={thumbnailUrl} alt="Video Thumbnail" className="w-full h-full object-cover" />
        <svg className="absolute inset-0 m-auto text-white" style={{ top: '40%', left: '40%', transform: 'translate(-50%, -50%)' }} width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"></path>
        </svg>
      </a>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{topicName}</h3>
        <p className="text-gray-600 font-bold">{videoTitle}</p>
        
        <div className="flex mt-4">
        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="bg-button text-white px-3 py-1 rounded hover:bg-button-hover mr-2">Watch Video</a>
          {/* <button className="bg-purple-400 text-white px-3 py-1 rounded hover:bg-green-600 mr-2">
            View More
          </button> */}
        </div>
      </div>
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
      <div className="fixed inset-0 bg-gray-800 bg-opacity-25 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
              {steps.map((step, index) => (
                  <Step key={index} text={step.text} isActive={step.isActive} />
              ))}
          </div>
      </div>
  );
};

const VideoSummarizer = () => {
    const [videoLink, setVideoLink] = useState('');
    const [videoData, setVideoData] = useState({
        summary: '',
        video_title: '',
        thumbnail_url: '',
        link: '',
    });
    const [loading, setLoading] = useState(false);
    const [currentSteps, setCurrentSteps] = useState([]);
    const [hasStartedLoading, setHasStartedLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);  

    const handleData = () => {
        setLoading(true);
        setHasStartedLoading(true);
        setIsModalOpen(true);
        const steps = [
            'Fetching video transcripts...',
            'Extracting keywords...',
            'Identifying key topics...',
            'Generating summary...'
        ];
        fetch(`${process.env.REACT_APP_API_URL}/video_summarizer/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ video_link: videoLink })
        })
        .then(response => response.json())
        .then(data => {
            setVideoData({
                summary: data.summary,
                video_title: data.video_title,
                thumbnail_url: data.thumbnail_url,
                link: data.video_link,
            });
            setLoading(false);
            setIsModalOpen(false); 
            setCurrentSteps(prev => prev.map((step, idx) => ({ ...step, isActive: idx === steps.length })));
        })
        .catch(error => {
          console.error('Error:', error);
      })
      .finally(() => {
          // Clear modal after operation
          setIsModalOpen(false);
          setLoading(false);
          setCurrentSteps([]); // Reset steps for a fresh state on next activation
      });

        const performStep = (index) => {
            setCurrentSteps(prev => [...prev, { text: steps[index], isActive: true }]);

            if (index < steps.length - 1) {
                setTimeout(() => {
                    setCurrentSteps(prev => prev.map((step, idx) => ({ ...step, isActive: idx === index + 1 })));
                    performStep(index + 1);
                }, 2000);
            }
        };

        performStep(0);
    };

    return (
        <div className=" h-screen">
            <TopNavigation />
            <div className="flex h-full">
                <SideNavigation />
                <div className="flex-1 flex flex-col">
                    {/* <div className="bg-purple-100 w-full p-6 shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-700">Welcome back, Joan!</h2>
                    </div> */}
                    <div className="flex flex-grow">
                        <div className="flex flex-col w-1/2 p-6">
                            {/* <input
                                type="text"
                                className="border border-gray-300 p-2 rounded mb-4"
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={videoLink}
                                onChange={(e) => setVideoLink(e.target.value)}
                            />
                            <button 
                                className="btn bg-button hover:bg-button-hover text-white font-bold "
                                onClick={handleData}
                            >
                                Summarize
                            </button> */}
                                {/* <div className="flex flex-col w-full items-center"> */}
                                  <div className="mb-6 flex w-full items-center justify-start gap-4">
                                    <input
                                      type="text"
                                      className="border border-gray-300 p-2 rounded flex-grow"
                                      placeholder="https://www.youtube.com/watch?v=..."
                                      value={videoLink}
                                      onChange={(e) => setVideoLink(e.target.value)}
                                    />
                                    <button 
                                      className="btn bg-button hover:bg-button-hover text-white font-bold"
                                      onClick={handleData}
                                    >
                                      Summarize
                                    </button>
                                  </div>
                                {/* </div> */}
                            {videoData.video_title && (
                              <VideoCard 
                                  videoTitle={videoData.video_title}
                                  youtubeUrl={videoData.link}
                                  thumbnailUrl={videoData.thumbnail_url}
                              />
                          )}
                            <LoadingModal steps={currentSteps} isOpen={isModalOpen} />
                        </div>
                        <div className="flex flex-col w-1/2 p-6 border-l">
                        
                        {/* {loading && currentSteps.map((step, index) => (
                                <Step key={index} text={step.text} isActive={step.isActive} />
                            ))} */}
                        {!loading && hasStartedLoading && (
                          <>
                            <h3 className="text-dark-blue text-xl font-semibold mb-2">Video Summary</h3>
                            <p className="text-dark-blue mb-4">{videoData.summary}</p>
                          </>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoSummarizer;


