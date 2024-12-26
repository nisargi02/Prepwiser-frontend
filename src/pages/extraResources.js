import React from 'react';
import { Link } from 'react-router-dom';
import './tailwind.css';
import SideNavigation from './sideNavigation.js';
import TopNavigation from './topNavigation.js'

const VideoCard = ({ topicName, videoTitle, youtubeUrl, thumbnailUrl }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex">
        {/* Make thumbnail clickable with play button overlay */}
        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="relative mr-4 w-40 h-40">
          <img src={thumbnailUrl} alt="Video Thumbnail" className="w-full h-full object-cover" />
          {/* Play button overlay */}
          <svg className="absolute inset-0 m-auto text-white" style={{ top: '40%', left: '40%', transform: 'translate(-50%, -50%)' }} width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </a>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{topicName}</h3>
          <p className="text-gray-600">{videoTitle}</p>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Watch Video</a>
          <div className="flex mt-4">
            <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2">
              View More
            </button>
          </div>
        </div>
      </div>
    );
};

  

const ExtraResources = () => {
    return (
      <div className="bg-green-200 h-screen">
        <TopNavigation />
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <SideNavigation />
  
          {/* Main content */}
          <div className="flex-1 flex flex-col">
            {/* Welcome banner */}
            {/* <div className="bg-green-100 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-700">Welcome back, Joan!</h2>
            </div> */}
  
            {/* Job cards */}
            <div className="p-6 flex-1">
              <div className="grid grid-cols-1 gap-4">
                <VideoCard 
                  topicName="Operating System" 
                  videoTitle="What is an Operating System?" 
                  youtubeUrl="https://www.youtube.com/watch?v=RhHMgkUdhdk" 
                  thumbnailUrl="https://i3.ytimg.com/vi/RhHMgkUdhdk/maxresdefault.jpg"
                />
                <VideoCard 
                  topicName="Computer System Architecture" 
                  videoTitle="Assembly Language Programming with ARM – Full Tutorial for Beginners" 
                  youtubeUrl="https://www.youtube.com/watch?v=gfmRrPjnEw4" 
                  thumbnailUrl="https://i3.ytimg.com/vi/gfmRrPjnEw4/maxresdefault.jpg"
                />
                <VideoCard 
                  topicName="Compiler Design" 
                  videoTitle="LL(1) Parsing Table" 
                  youtubeUrl="https://www.youtube.com/watch?v=DT-cbznw9aY" 
                  thumbnailUrl="https://i3.ytimg.com/vi/DT-cbznw9aY/maxresdefault.jpg"
                />
                {/* ...other QuestionCards */}
              </div>
              <div className="flex justify-end">
                <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2 mt-10">
                    Export as PDF
                </button>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  };
  
  export default ExtraResources;
  