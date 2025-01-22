import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';

const ReviewerDashboard = () => {
  const [assignedPapers, setAssignedPapers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignedPapers = async () => {
      try {
        const reviewerId = localStorage.getItem('userId');
        if (!reviewerId) {
          setError('User ID is missing. Please log in again.');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://final-project-webtech.azurewebsites.net/api/reviews/assigned-papers/${reviewerId}`
        );

        const pendingPapers = response.data.papers.filter(
          (paper) =>
            paper.feedback === null &&
            paper.rating === null &&
            paper.status === 'under review'
        );

        

        setAssignedPapers(pendingPapers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch assigned papers. Please try again.');
        setLoading(false);
      }
    };

    fetchAssignedPapers();
  }, []);

  
  const handleViewSubmittedReviews = () => {
    navigate('/reviewer/submitted-reviews');
  };

  const handleSubmitReview = async (paperId, reviewData) => {
    setError('');
    setSuccess('');

    const reviewerId = localStorage.getItem('userId');

    try {
      const payload = {
        paperId,
        reviewerId,
        ...reviewData,
      };

      console.log('Submitting review payload:', payload);

      await axios.patch(`https://final-project-webtech.azurewebsites.net/api/reviews/${reviewerId}`, payload);

      setSuccess(`Review for paper ${paperId} submitted successfully!`);

      setAssignedPapers((prevPapers) =>
        prevPapers.filter((paper) => paper.paperId !== paperId)
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit review. Please try again.');
      console.error('Error submitting review:', err);
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading assigned papers...</div>;
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  
  
    

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center">Hello (Reviewer) - Dashboard</h2>
        <div className="d-flex justify-content-between mb-4">
          <h4>Assigned Papers</h4>
          <button
            className="btn btn-secondary"
            onClick={handleViewSubmittedReviews}
          >
            View Submitted Reviews
          </button>
        </div>
        {success && <div className="alert alert-success">{success}</div>}
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Paper Title</th>
                <th>Paper Link</th>
                <th>Paper Abstract</th>
                <th>Feedback</th>
                <th>Review Status</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignedPapers.map((paper) => (
                <tr key={paper.reviewId}>
                  <td>{paper.title}</td>
                  <td>
                    <a href={paper.fileUrl} target="_blank" rel="noopener noreferrer">
                      View Paper
                    </a>
                  </td>
                  <td>{paper.abstract}</td>
                  <td>
                    <textarea
                      className="form-control"
                      rows="3"
                      onChange={(e) =>
                        setAssignedPapers((prevPapers) =>
                          prevPapers.map((p) =>
                            p.reviewId === paper.reviewId
                              ? { ...p, feedback: e.target.value }
                              : p
                          )
                        )
                      }
                    ></textarea>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        setAssignedPapers((prevPapers) =>
                          prevPapers.map((p) =>
                            p.reviewId === paper.reviewId
                              ? { ...p, status: e.target.value }
                              : p
                          )
                        )
                      }
                    >
                      <option value="">Select</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="conditionally accepted">Conditionally Accepted</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        setAssignedPapers((prevPapers) =>
                          prevPapers.map((p) =>
                            p.reviewId === paper.reviewId
                              ? { ...p, rating: e.target.value }
                              : p
                          )
                        )
                      }
                    >
                      <option value="">Rate</option>
                      {[1, 2, 3, 4, 5].map((rate) => (
                        <option key={rate} value={rate}>
                          {rate}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleSubmitReview(paper.paperId, {
                          feedback: paper.feedback,
                          status: paper.status,
                          rating: paper.rating,
                        })
                      }
                    >
                      Submit Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewerDashboard;
