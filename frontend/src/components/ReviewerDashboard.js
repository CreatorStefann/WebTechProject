import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewerDashboard = () => {
  const [assignedPapers, setAssignedPapers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  
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
          `http://localhost:3000/api/reviews/assigned-papers/${reviewerId}`
        );
        setAssignedPapers(response.data.papers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch assigned papers. Please try again.');
        setLoading(false);
      }
    };

    fetchAssignedPapers();
  }, []);

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
      
      await axios.patch(`http://localhost:3000/api/reviews/${reviewerId}`, payload);
  
      setSuccess(`Review for paper ${paperId} submitted successfully!`);
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
    <div className="container mt-5">
      <h2 className="text-center">Hello (Reviewer) - Dashboard</h2>
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
  );
};

export default ReviewerDashboard;
