import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bar, Doughnut, PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale, defaults } from 'chart.js';
import './tailwind.css';
import SideNavigation from './sideNavigation.js';
import TopNavigation from './topNavigation.js';
import QuestionCard from './questionBankGenerate.js';  // Assume you have exported it from the file

// Registering components necessary for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

// Customize defaults
defaults.font.family = 'Arial, sans-serif';
defaults.font.size = 12;

const PatternAnalysis = () => {
  const [topics, setTopics] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.data) {
      setTopics(location.state.data.stats.topics);
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/modules`)
        .then(response => response.json())
        .then(data => {
          if (data.structured_reply_text) {
            setTopics(data.stats.topics);
          } else {
            console.error('Structured reply text not found in response:', data);
          }
        })
        .catch(error => console.error('Error fetching modules:', error));
    }
  }, [location.state]);

  const getBarData = () => {
    const labels = topics.map(topic => topic.Topic_Name);
    const data = topics.map(topic => topic.Number_of_Questions);

    return {
      labels,
      datasets: [
        {
          label: 'Number of Questions',
          hoverBackgroundColor: 'rgba(51, 24, 107, 1)' , //'rgba(186, 85, 211, 0.8)', // Light purple shade (Amethyst)
          borderColor: 'rgba(0, 0, 0, 0)', // Deep pink shade (Hot Pink)
          backgroundColor : 'rgba(96, 96, 200, 0.9)',
          borderWidth: 1,
          data
        }
      ]
    };
  };

  const getPolarData = () => {
    const labels = topics.map(topic => topic.Topic_Name);
    const data = topics.map(topic => topic.Number_of_Questions);

    return {
      labels,
      datasets: [
        {
          label: 'Importance',
          data,
          backgroundColor: [
            'rgba(82, 211, 216, 0.7)',
            'rgba(56, 135, 190, 0.7)',
            'rgba(56, 65, 157, 0.7)',
            'rgba(32, 14, 58, 0.7)',
            'rgba(197, 255, 248, 0.7)',
            'rgba(150, 239, 255, 0.7)',
            'rgba(95, 189, 255, 0.7)',
            'rgba(123, 102, 255, 0.7)',
          ],
          borderColor: [

            'rgba(56, 135, 190, 1)', 
            'rgba(56, 65, 157, 1)', 
            'rgba(32, 14, 58, 1)', 
            'rgba(197, 255, 248, 1)', 
            'rgba(150, 239, 255, 1)',

            'rgba(123, 102, 255, 1)',
          ],
          borderWidth: 2 // Increased border width for more prominent rings
        }
      ]
    };
  };

  const donutData = (keywords) => {
    const labels = Object.keys(keywords);
    const data = Object.values(keywords);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Keyword Frequency',
          backgroundColor: ['#52D3D8', '#3887BE', '#38419D', '#200E3A', '#C5FFF8', '#96EFFF', '#5FBDFF', '#7B66FF'], // Various colors
          hoverBackgroundColor: ['#155e61', '#0b4c7a', '#1b2166', '#5f26ad', '#32ad9f', '#0d8fa6', '#2b85c4', '251a70'], // Darker shades for hover effect
          data: data,
          borderWidth: 1 // Reduced border width for rings
        }
      ]
    };
  };

  const barOptions = {
    plugins: {
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.save();
        // Set shadow for 3D effect
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
  
        // Create a 3D effect for each bar
        chart.data.datasets.forEach((dataset, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);
          meta.data.forEach((bar, index) => {
            const model = bar._model;
            const left = model.x - model.width / 2;
            const right = model.x + model.width / 2;
            const top = model.y;
            const bottom = chart.scales['y'].bottom;
  
            // Draw rounded bars
          const radius = 40; // Adjust the radius as needed
          ctx.fillStyle = dataset.backgroundColor;
          ctx.beginPath();
          ctx.moveTo(left + radius, top);
          ctx.lineTo(right - radius, top);
          ctx.quadraticCurveTo(right, top, right, top + radius);
          ctx.lineTo(right, bottom - radius);
          ctx.quadraticCurveTo(right, bottom, right - radius, bottom);
          ctx.lineTo(left + radius, bottom);
          ctx.quadraticCurveTo(left, bottom, left, bottom - radius);
          ctx.lineTo(left, top + radius);
          ctx.quadraticCurveTo(left, top, left + radius, top);
          ctx.closePath();
          ctx.fill();

          // Draw 3D sides
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.fillRect(left, top, 10, bottom - top);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.fillRect(left + model.width, top, 10, bottom - top);

          });
        });
  
        ctx.restore();
      },
      title: {
        display: true,
        text: 'Frequency of Topics',
        font: {
          size: 20,
          family: 'Arial, sans-serif',
          weight: 'bold'
        }
      },
      legend: {
        display: false // Remove the legend
      }
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Topic Name',
          font: {
            size: 14,
            family: 'Arial, sans-serif',
            weight: 'bold' // Make x-axis title bold
          }
        },
        ticks: {
          font: {
            size: 12,
            family: 'Arial, sans-serif',
            weight: 'bold' // Make x-axis ticks bold
          }
        }
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Number of Questions',
          font: {
            size: 14,
            family: 'Arial, sans-serif',
            weight: 'bold' // Make y-axis title bold
          }
        },
        ticks: {
          font: {
            size: 12,
            family: 'Arial, sans-serif',
            weight: 'bold' // Make y-axis ticks bold
          },
          beginAtZero: true
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };
  

  const polarOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          font: {
            size: 12,
            family: 'Arial, sans-serif'
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="bg-green-200 h-screen overflow-hidden">
      {/* <TopNavigation /> */}
      <div className="flex h-full bg-gray-100">
        {/* <SideNavigation /> */}
        <div className="flex-1 flex flex-col">
          <div className="p-2 flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 overflow-auto"> {/* Reduced gap between columns */}
            <div className="flex flex-col gap-2"> {/* Reduced gap between charts */}
              <div className="h-1/2 relative">
                <Bar data={getBarData()} options={barOptions} />
              </div>
              <div className="h-1/2">
                <PolarArea data={getPolarData()} options={polarOptions} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1"> {/* Reduced gap between rows */}
              {topics.map((topic, index) => (
                <div key={index} className="relative h-1/2 flex items-center"> {/* Increased height */}
                  <div className="w-full h-full flex justify-center items-center">
                    <Doughnut data={donutData(topic.Keyword_Frequency)} options={{
                      plugins: {
                        legend: {
                          position: 'right',
                          labels: {
                            boxWidth: 10,
                            padding: 5, // Reduced gap between the chart and the legend
                            font: {
                              size: 14,
                              family: 'Arial, sans-serif'
                            }
                          }
                        }
                      },
                      responsive: true,
                      maintainAspectRatio: false
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-10">
            {/* Export Button */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternAnalysis;
