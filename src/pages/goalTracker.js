import React, { useState, useEffect } from 'react';
import SideNavigation from './sideNavigation.js';
import TopNavigation from './topNavigation.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoadmapStep from './RoadmapStep';

const GoalTracker = () => {
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);
  const [currentRoadmapId, setCurrentRoadmapId] = useState(null);
  const [steps, setSteps] = useState([]);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);

  useEffect(() => {
    fetchSavedRoadmaps();
  }, []);

  const fetchSavedRoadmaps = () => {
    fetch(`${process.env.REACT_APP_API_URL}/roadmap/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include token for authentication
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("data fetched", data.roadmaps)
        setSavedRoadmaps(data.roadmaps);
      })
      .catch(error => console.error('Error fetching saved roadmaps:', error));
  };

  const handleCheck = (stepIndex, resourceIndex) => {
    setSteps(prevSteps =>
      prevSteps.map((step, idx) =>
        idx === stepIndex
          ? {
              ...step,
              resources: step.resources.map((resource, rIdx) =>
                rIdx === resourceIndex ? { ...resource, checked: !resource.checked } : resource
              ),
            }
          : step
      )
    );
  };

  const handleSaveRoadmap = () => {
    const roadmapProgress = steps.map((step, index) => ({
      step_number: index + 1,
      resource_status: step.resources.map(resource => ({ title: resource.title, checked: resource.checked }))
    }));
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/roadmap/save/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Include token for authentication
      },
      body: JSON.stringify({ roadmap_id: currentRoadmapId, steps: roadmapProgress })
    })
      .then(response => response.json())
      .then(data => {
        toast.success('Roadmap progress saved successfully.', {
          autoClose: 2000,
          progressClassName: 'toast-progress-bar',
        });
      })
      .catch(error => console.error('Error saving roadmap progress:', error));
  };

  return (
    <div className=" h-[90vh]">
      <TopNavigation />
      <div className="flex h-screen">
        <SideNavigation />
        <div className="flex-1 flex flex-col w-full h-full">
          <div className="bg-background-gray h-full p-2 overflow-scroll">
            <div className="mt-10">
            {!hasStartedLoading && (
                <div className="text-dark-blue my-4 px-3 font-bold">Select a roadmap to view and update progress.</div>
              )}
              <div className="flex flex-wrap pb-10">
                {savedRoadmaps.map(roadmap => (
                  <button
                    key={roadmap.id}
                    className={`font-bold px-4 py-2 m-2 rounded-full shadow w-24 ${
                      currentRoadmapId === roadmap.id ? 'bg-button text-white' : 'bg-background-gray text-button border-2 border-button'
                    }`}
                    onClick={() => {
                      console.log('Selected Roadmap:', roadmap);
                      setSteps(roadmap.roadmap_data.steps);
                      setCurrentRoadmapId(roadmap.id);  // Set the current roadmap ID
                      setHasStartedLoading(true);
                    }}
                  >
                    {roadmap.skill}
                  </button>
                ))}
              </div>
              
              <div className="flex flex-col items-center">
              {hasStartedLoading && steps.map((step, index) => {
                  const allChecked = step.resources.every(resource => resource.checked);
                  return (
                    <RoadmapStep
                      key={index}
                      step={step}
                      index={index}
                      isLast={index === steps.length - 1}
                      onCheck={handleCheck}
                      allChecked={allChecked}
                    />
                  );
                })} 
                {hasStartedLoading && steps.length > 0 && (
                  <button 
                    onClick={handleSaveRoadmap} 
                    className="mt-2 bg-button font-bold text-white px-4 py-2 rounded shadow">
                    Save Roadmap Progress
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GoalTracker;
