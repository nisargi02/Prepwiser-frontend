import React, { useState, useEffect } from 'react';
import './tailwind.css';
import { Link } from 'react-router-dom';
import TopNavigation from './topNavigation.js';
import { useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import DashboardTitle2 from '../animations/DashboardTitle2.json';
import DashboardExamPrep from '../animations/dashboard_exam_prep.json';
import DashboardSkillDevelopment from '../animations/dashboard_skill_development.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase, faVideo, faFilePdf, faMap, faTools } from '@fortawesome/free-solid-svg-icons';

const TitleAnimation = () => {
  return (
    <div className="flex justify-center mb-4">
      <Lottie animationData={DashboardTitle2} className="w-128 h-128" />
    </div>
  );
};

const Title = ({ navigate }) => {
  return (
    <div className="bg-custom-gradient flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="flex flex-col justify-start">
          <div class="flex flex-row gap-1 mb-1">
            <span className="text-8xl font-bold bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">Prep</span>
            <span className="text-8xl font-bold bg-gradient-to-r from-[#61D8FB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">Wiser</span>
          </div>
          <p className="text-xl text-gray-200 mb-10 font-bold italic">
            Prep smarter not harder!
          </p>
          <div className="flex flex-wrap gap-4 justify-start">
            <button className="bg-button hover:bg-button-hover text-white py-2 px-6 rounded shadow-lg" onClick={() => navigate('/examPrep')}>
              Exam Preparation
            </button>
            <button className="bg-button hover:bg-button-hover text-white py-2 px-6 rounded shadow-lg" onClick={() => navigate('/skillDevelopment')}>
              Skill Development
            </button>
          </div>
          <div className="w-48 h-48 mt-8">
            <img src={`${process.env.PUBLIC_URL}/linktree-qr.jpeg`} />
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <TitleAnimation />
      </div>
    </div>
  );
};

const features = [
  {
    title: "Interactive Learning",
    description: "Engage with interactive simulations and adaptive learning technology to boost your understanding of complex concepts.",
    videoUrl: DashboardExamPrep,
    link: "/examPrep",
    buttonText: "Learn More",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning progress with our advanced analytics tools to enhance your study efficiency.",
    videoUrl: DashboardSkillDevelopment,
    link: "/roadmap",
    buttonText: "Track Your Progress",
  },
];

const subscriptionOptions = [
  {
    title: "Basic Plan",
    price: "$0",
    features: [
      "5 AI-Generated Customized Content, including:",
      ["Quizzes", "Exam Pattern Analysis", "Suggested study resources"],
      "10 PDF Chatbot credits",
      "Unlimited Community Discussions"
    ],
    buttonText: "Get Started",
    isPopular: false,
  },
  {
    title: "Standard Plan",
    price: "$20",
    features: [
      "30 AI-Generated Customized Content, including:",
      ["Quizzes", "Exam Pattern Analysis", "Suggested study resources"],
      "40 PDF Chatbot credits",
      "15 YouTube Video Summarizations",
      "5 Personalized Roadmaps",
      "5 Goal Trackers"
    ],
    buttonText: "Start Free Trial",
    isPopular: true,
  },
  {
    title: "Premium Plan",
    price: "$30",
    features: [
      "Unlimited AI-Generated Customized Content, including:",
      ["Quizzes", "Exam Pattern Analysis", "Suggested study resources"],
      "100 PDF Chatbot credits per month",
      "Unlimited Video & Lecture Summarizations",
      "Unlimited Personalized Roadmaps per month",
      "Unlimited Goal Trackers"
    ],
    buttonText: "Subscribe Now",
    isPopular: false,
  },
];

const teamMembers = [
  {
    name: "Kriti Taparia",
    role: "Co-Founder",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: `${process.env.PUBLIC_URL}/KritiDashboard.jpg`,
    socialMedia: { linkedin: "www.linkedin.com", facebook: "#", instagram: "#" }
  },
  {
    name: "Bhavini Piyush Mamtora",
    role: "Co-Founder",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: `${process.env.PUBLIC_URL}/BhaviniDashboard.jpg`,
    socialMedia: { linkedin: "#", facebook: "#", instagram: "#" }
  },
  {
    name: "Nisargi Vipulbhai Shah",
    role: "Co-Founder",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: `${process.env.PUBLIC_URL}/NisargiDashboard.jpg`,
    socialMedia: { linkedin: "#", facebook: "#" }
  },
  
];

const steps = [
  {
    title: "Question Bank Generation",
    description: "Generate tailored question banks based on specific syllabus requirements and past question papers",
    icon: faBriefcase, // Replace with actual path to icon
    link: "/uploadPdf"
  },
  {
    title: "Video Summarizer",
    description: "Quickly condense lengthy educational videos into concise summaries highlighting key points and concepts",
    icon: faVideo, // Replace with actual path to icon
    link: "/videoSummarizer"
  },
  {
    title: "PDF Chatbot",
    description: "Interact with our chatbot that extracts and provides information directly from PDF documents on demand",
    icon: faFilePdf, // Replace with actual path to icon
    link: "/pdfChatbot"
  },
  {
    title: "Skill Roadmap",
    description: "Create personalized learning paths that outline step-by-step skill development based on career goals and competencies",
    icon: faMap, // Replace with actual path to icon
    link: "/roadMap"
  },
  {
    title: "Goal Tracking",
    description: "Monitor and track educational and developmental goals using real-time analytics and progress reports",
    icon: faTools, // Replace with actual path to icon
    link: "/goalTracker"
  }
];

const FeatureCardsAndAboutUs = ({ navigate }) => {
  return (
      <div id="aboutUs" className="flex-grow">
        <div className="p-6 w-full">
          <h1 className="text-3xl text-white font-bold text-center mb-5">The smarter way to Prep</h1>
          {features.map((feature, index) => (
            <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
              <div className="w-1/2 p-4">
                <div className="flex flex-col justify-center items-center py-12 shadow-lg bg-white/10 px-6 rounded-2xl w-2/3 mx-auto border-neutral-400 border-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <h2 className="text-xl font-bold text-white mb-2">{feature.title}</h2>
                  <p className="text-white mb-4">{feature.description}</p>
                  <button className="bg-button hover:bg-button-hover text-white py-2 px-4 rounded transition duration-300" onClick={() => navigate(feature.link)}>
                    {feature.buttonText}
                  </button>
                </div>
              </div>
              <div className="w-1/2 flex justify-center">
                <Lottie animationData={feature.videoUrl} className="w-90 h-90" />
              </div>
            </div>
          ))}
          
          <div className="flex flex-col min-h-screen w-full mt-14">
            <div className="w-full p-6">
              <h2 className="text-3xl font-bold text-center mb-6">Our Features</h2>
              <div className="flex flex-wrap justify-around items-center">
                {steps.map((step, index) => (
                  <div key={index} className="bg-black/70 p-6 rounded-lg shadow-md m-4 hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer" style={{ minWidth: '20%', maxWidth: '25%' }}
                  onClick={() => navigate(step.link)}>
                    <FontAwesomeIcon icon={step.icon} className="h-8 w-8 mx-auto mb-4 text-button" size="3x"/>
                    <h3 className="text-xl text-center mb-4">{step.title}</h3>
                    <p className="text-sm text-center">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subscription code */}
           <div className="px-6 w-full bg-neutral-2000 py-10">
        <h2 className="text-3xl font-bold text-white text-center mb-10">Get Unlimited Access</h2>
        <div className="flex justify-center items-stretch gap-6">
          {subscriptionOptions.map((option, index) => (
            <div key={index} className={`bg-gray-900 rounded-lg border-2 border-gray-700 p-6 flex flex-col items-center w-1/3 relative`}>
              <div className="flex justify-between items-center w-full">
              <h3 className="text-xl font-bold text-white">{option.title}</h3>
              {option.isPopular && (
                <span className="bg-dark-blue text-white px-3 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              )}
            </div>
              <div className="flex items-center w-full mb-4">
                <h4 className="text-2xl font-bold text-white">{option.price}
                <span className="ml-1 text-sm font-normal">/month</span>
                </h4>
              </div>
              <button className={`w-full py-2 px-4 rounded transition duration-300 text-white bg-button hover:bg-button-hover'}`}>
                {option.buttonText}
              </button>
              <div>
                <hr className="border-t border-white border-opacity-25 w-full my-2"/>
              </div>
              <ul className="w-full text-sm text-white pl-0 mb-4" style={{ listStylePosition: 'oustside' }}>
                {option.features.map((feature, idx) => {
                if (Array.isArray(feature)) {
                  // Handle sub-items
                  return feature.map(subFeature => (
                    <ul className="mb-4 list-disc pl-4">
                    <li key={subFeature} className="pl-6 mb-2 flex items-start gap-2">
                      {subFeature}
                    </li>
                    </ul>
                  ));
                } else {
                  return <li key={idx} className="mb-2 flex items-start gap-2">
                  <svg className="w-6 h-6 text-button" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>;
                }
              })}
              </ul>
              
            </div>
          ))}
        </div>
      </div>
    
    <CrewMembers />
    </div>
    {/* Crew members */}

   </div>
  );
};

const CrewMembers = () => {
  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Our Dedicated Crew</h2>
      <p className="text-center text-white mb-10">Meet the people who bought the PrepWiser vision to life!</p>
      <div className="flex justify-center items-center flex-wrap gap-8 ">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-button rounded-lg shadow p-4 w-64 border-white">
            <img src={member.imageUrl} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-white"/>
            <h3 className="text-lg font-bold text-center text-white">{member.name}</h3>
            <p className="text-sm text-center text-white mb-5">{member.role}</p>
            <div className="flex justify-center">
              {member.socialMedia.linkedin && (
                <a href={member.socialMedia.linkedin} className="text-white hover:text-gray-500">
                  <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                </a>
              )}
              {member.socialMedia.facebook && (
                <a href={member.socialMedia.facebook} className="text-white hover:text-gray-500 mx-2">
                  <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
                </a>
              )}
             
            </div>
          </div>
        ))}
  </div>
  </div>
  );
};

const Footer = () => {
  return (
    <footer id="footer" className="bg-black text-gray-300 py-12">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h6 className="text-white font-bold mb-2">Company</h6>
          <ul>
            <li><a href="#aboutUs" to="/about">About Us</a></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/newsroom">Newsroom</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="text-white font-bold mb-2">Contact Us</h6>
          <ul>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="mr-4" />
              <Link to="/education">contact@prepwiser.com</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} className="mr-4" />
              <Link to="/financial-services">(949) 213-9335</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-4" />
              <Link to="/healthcare">Irvine, CA</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-1">
          <h6 className="text-white font-bold mb-2">Newsletter</h6>
          <p>Sign up with your email to join our mailing list.</p>
          <form>
            <input type="email" placeholder="Email Address" className="w-full p-2 mt-2 mb-2 text-black" />
            <button className="w-full bg-button hover:bg-button-hover text-white py-2 px-4 rounded">Submit</button>
          </form>
        </div>
        <div className="col-span-2 md:col-span-3 flex flex-col items-center mt-4 md:mt-0">
          <h6 className="text-white font-bold mb-2">Follow Us</h6>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-gray-300 hover:text-gray-400">
              <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" className="text-gray-300 hover:text-gray-400">
              <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" className="text-gray-300 hover:text-gray-400">
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            </a>
            <a href="https://youtube.com" className="text-gray-300 hover:text-gray-400">
              <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8 text-sm">
        © 2024 PrepWiser. All rights reserved.
      </div>
    </footer>
  );
};

const DashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.state]);

  return (
    <div className="h-screen bg-gradient-to-r from-[#110f1f] to-dark-blue text-white">
      <TopNavigation />
      <Title navigate={navigate} />
      <div className="bg-gradient-to-r from-[#110f1f] to-dark-blue p-6 text-white text-center w-full">
        <FeatureCardsAndAboutUs navigate={navigate} features={features} />
      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;
