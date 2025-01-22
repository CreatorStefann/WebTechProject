import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AuthorDashboard from './components/AuthorDashboard';
import UploadPaper from './components/UploadPaper';
import OrganizerDashboard from './components/OrganizerDashboard';
import PaperList from './components/PaperList';
import CreateConference from './components/CreateConference';
import ReviewerDashboard from './components/ReviewerDashboard';
import MainPage from './components/MainPage';
import PaperReviewDashboard from './components/PaperReviewDashboard';
import SubmittedReviews from './components/SubmittedReviews'
import axios from 'axios';

const App = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/author-dashboard" element={<AuthorDashboard />} />
        <Route path="/upload-paper/:conferenceId" element={<UploadPaper />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/organizer/conferences/:conferenceId/papers" element={<PaperList />} />
        <Route path="/organizer/create-conference" element={<CreateConference />} />
        <Route path="/reviewer-dashboard" element={<ReviewerDashboard/>}/>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/paper-review-dashboard/:paperId" element={<PaperReviewDashboard />} />
        <Route path="/reviewer/submitted-reviews" element={<SubmittedReviews />} />
      </Routes>
    </Router>
  );
};

export default App;