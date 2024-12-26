import React, { useState } from 'react';
import Lottie from 'lottie-react';
import roadmapAnimation from '../animations/roadmapanimation.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNavigation from './topNavigation.js';
import SideNavigation from './sideNavigation.js';
import LoadingModal from './LoadingModal';
import RoadmapStep from './RoadmapStep';

const Roadmap = () => {
  const [skill, setSkill] = useState('');
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState([]);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoadmapId, setCurrentRoadmapId] = useState(null);

  const loadingStepsContent = [
    'Generating Beginner Roadmap...',
    'Generating Intermediate Roadmap...',
    'Generating Advanced Roadmap...',
    'Fetching resources...'
  ];

  const handleFetchRoadmap = () => {
    if (!skill.trim()) {
      toast.error('Please enter a skill to generate the roadmap.', {
        autoClose: 2000,
        progressClassName: 'toast-progress-bar',
      });
      return;
    }

    setLoading(true);
    setHasStartedLoading(true);
    setIsModalOpen(true);

    fetch(`${process.env.REACT_APP_API_URL}/roadmap/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include token for authentication
      },
      body: JSON.stringify({ skill: skill })
    })
      .then(response => response.json())
      .then(data => {
        setSteps(data.roadmap.roadmap_data.steps.map(step => ({
          ...step,
          resources: step.resources.map(resource => ({ ...resource, checked: false }))
        })));
        setCurrentRoadmapId(data.roadmap.id);  // Set the current roadmap ID
        setLoading(false);
        setIsModalOpen(false);
        setLoadingSteps(loadingStepsContent.map((step, idx) => ({ text: step, isActive: idx === loadingStepsContent.length - 1 })));
      })
      .catch(error => console.error('Error fetching roadmap:', error))
      .finally(() => {
        setIsModalOpen(false);
        setLoading(false);
        setLoadingSteps([]);
      });

    const performStep = (index) => {
      setLoadingSteps(prev => [...prev, { text: loadingStepsContent[index], isActive: true }]);

      if (index < loadingStepsContent.length - 1) {
        setTimeout(() => {
          setLoadingSteps(prev => prev.map((step, idx) => ({ ...step, isActive: idx === index + 1 })));
          performStep(index + 1);
        }, 2000);
      }
    };

    performStep(0);
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
    <div className="h-[90vh]">
      <TopNavigation />
      <div className="flex h-screen">
        <SideNavigation />
        <div className="flex-1 flex flex-col w-full h-full">
          <div className="bg-background-gray h-full p-5 overflow-scroll">
            <div className="flex flex-col items-center">
              {/* <input
                type="text"
                className="mb-4 p-2 border rounded"
                placeholder="Enter the skill you want to learn"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
              <button onClick={handleFetchRoadmap} className="mb-10 bg-button hover:bg-button-hover font-bold text-white px-4 py-2 rounded shadow">
                Get Roadmap
              </button> */}

              <div className="flex items-center mb-10">
                <input
                  type="text"
                  className="p-2 border rounded mr-4 flex-grow w-64"
                  placeholder="Enter the skill you want to learn"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                />
                <button onClick={handleFetchRoadmap} className="btn bg-button hover:bg-button-hover font-bold text-white px-4 py-2 rounded shadow">
                  Get Roadmap
                </button>
              </div>              
              <LoadingModal loadingSteps={loadingSteps} isOpen={isModalOpen} />
              {/* {!loading && hasStartedLoading && steps.map((step, index) => (
                <RoadmapStep key={index} step={step} index={index} isLast={index === steps.length - 1} onCheck={handleCheck}  />
              ))} */}
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
              {!loading && hasStartedLoading && (
                <button onClick={handleSaveRoadmap} className="mt-4 bg-button text-white px-4 py-2 rounded shadow">
                  Save Roadmap Progress
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Roadmap;
