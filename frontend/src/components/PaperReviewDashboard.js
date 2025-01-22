import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header.js';

const PaperReviewDashboard = () => {
  const { paperId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [paperDetails, setPaperDetails] = useState({});
  const [error, setError] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/papers/${paperId}`);
        setPaperDetails(response.data.paper);

        const completedReviews = response.data.paper.Reviews.filter(
          (review) => review.status !== 'pending'||'conditionally accepted'
        );

        setReviews(completedReviews);
      } catch (err) {
        setError('Failed to fetch reviews. Please try again.');
      }
    };

    fetchReviews();
  }, [API_BASE_URL, paperId]);

  const handleUpdatePaper = () => {
    const allConditionallyAccepted = paperDetails.status === 'conditionally accepted';

    if (!allConditionallyAccepted) {
      alert('The paper cannot be updated unless all reviews are conditionally accepted.');
      return;
    }

    window.location.href = `/upload-paper/${paperDetails.conferenceId}`;
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2>Paper Review Dashboard</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <h4 className="mt-4">
          Paper Title: {paperDetails.title} - {paperDetails.status}
        </h4>
        <button className="btn btn-warning mb-3" onClick={handleUpdatePaper}>
          Update Paper
        </button>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={review.id} className="border p-3 mb-3 d-flex">
              <div className="w-50 pr-3">
                <h5>
                  {index + 1}: Reviewer ID: {review.reviewerId}
                </h5>
                <p>
                  <strong>Reviewer Username:</strong> {review.reviewer?.username || 'N/A'}
                </p>
                <p>
                  <strong>Rating:</strong> {review.rating || 'Not rated yet'}
                </p>
                <p>
                  <strong>Status:</strong> {review.status}
                </p>
              </div>
              <div className="w-50 pl-3 border-left">
                <p>
                  <strong>Feedback:</strong> {review.feedback || 'No feedback provided'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">
            Waiting for all reviews to be completed...
          </p>
        )}
      </div>
    </div>
  );
};

export default PaperReviewDashboard;
