import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.js';

const SubmittedReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchSubmittedReviews = async () => {
      try {
        const reviewerId = localStorage.getItem('userId');
        if (!reviewerId) {
          setError('User ID is missing. Please log in again.');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/reviews/submitted/${reviewerId}`);
        setReviews(response.data.reviews);
      } catch (err) {
        setError('Failed to fetch submitted reviews. Please try again.');
      }
    };

    fetchSubmittedReviews();
  }, [API_BASE_URL]);

  if (error) {
    return (
      <div>
        <Header />
        <div className="container mt-5 alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center">Submitted Reviews</h2>
        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Paper Title</th>
                <th>Paper Abstract</th>
                <th>Paper Link</th>
                <th>Feedback</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.Paper.title}</td>
                  <td>{review.Paper.abstract}</td>
                  <td>
                    <a
                      href={review.Paper.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Paper
                    </a>
                  </td>
                  <td>{review.feedback}</td>
                  <td>{review.rating}</td>
                  <td>{review.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmittedReviews;
