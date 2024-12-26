import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashBoard from '../src/pages/dashboard.js';
import SignUpPage from '../src/pages/signUpPage.js';
import LoginPage from '../src/pages/loginPage.js'
import ExamPrep from '../src/pages/examPrep.js';
import QuestionBankGenerate from '../src/pages/questionBankGenerate.js';
import SkillDevelopment from './pages/skillDevelopment.js';
import UploadPdf from './pages/uploadPdf.js';
import Discussions from './pages/discussions.js';
import PDFChatbot from './pages/pdfChatbot.js';
import Roadmap from './pages/roadmap.js';
import QuizGenerate from '../src/pages/quiz.js';
import ExtraResources from '../src/pages/extraResources.js';
import PatternAnalysis from './pages/patternAnalysis.js';
import VideoSummarizer from './pages/videoSummarizer.js';
import GoalTracker from './pages/goalTracker.js';
import { UserProvider } from './pages/userContext.js';
import QuestionModule from './pages/questionModule.js';
import UploadPdf2 from './pages/uploadPdf2.js';
// Make sure to create this component

// Other imports...

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
      const storedUserData = localStorage.getItem('user');
      if (storedUserData) {
          setUser(JSON.parse(storedUserData));
      }
  }, []);
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<LoginPage />} /> {/* Replace with your login component */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/examPrep" element={<ExamPrep />} />
        <Route path="/questionBankGenerate" element={<QuestionBankGenerate />} />
        <Route path="/skillDevelopment" element={<SkillDevelopment />} />
        <Route path="/uploadPdf" element={<UploadPdf />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/pdfChatbot" element={<PDFChatbot />} />
        <Route path="/roadMap" element={<Roadmap />} />
        <Route path="/quiz" element={<QuizGenerate />} />
        <Route path="/extraResources" element={<ExtraResources />} />
        <Route path="/patternAnalysis" element={<PatternAnalysis />} />
        <Route path="/videoSummarizer" element={<VideoSummarizer />} />
        <Route path="/goalTracker" element={<GoalTracker />} />
        <Route path="/questionModule" element={<QuestionModule />} />
        <Route path="/uploadPdfs" element={<UploadPdf2/>} />
        
        {/* Other routes */}
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
