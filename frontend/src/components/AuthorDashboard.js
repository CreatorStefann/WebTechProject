import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.js';

const AuthorDashboard = () => {
  const [conferences, setConferences] = useState([]);
  const [uploadedPapers, setUploadedPapers] = useState([]);
  const [showPapers, setShowPapers] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/conferences');
        setConferences(response.data.conferences);
      } catch (err) {
        setError('Failed to fetch conferences. Please try again later.');
      }
    };

    fetchConferences();
  }, []);

  const handleUploadPaper = (conferenceId) => {
    window.location.href = `/upload-paper/${conferenceId}`;
  };

  const handleShowUploadedPapers = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:3000/api/papers/author/${userId}`);

      setUploadedPapers(response.data.papers);
      setShowPapers(true);
    } catch (err) {
      setError('Failed to fetch uploaded papers. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Hello (Author) - Dashboard</h2>
          <button
            className="btn btn-secondary"
            onClick={handleShowUploadedPapers}
          >
            View Uploaded Papers
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}

        {showPapers && (
          <div className="mt-4">
            <h4>Uploaded Papers</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Abstract</th>
                  <th>Conference</th>
                  <th>File</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {uploadedPapers.map((paper) => (
                  <tr key={paper.id}>
                    <td>{paper.title}</td>
                    <td>{paper.abstract}</td>
                    <td>{paper.conferenceTitle}</td>
                    <td>
                      <a
                        href={paper.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View File
                      </a>
                    </td>
                    <td>{paper.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Conference Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {conferences.map((conference) => (
              <tr key={conference.id}>
                <td>{conference.title}</td>
                <td>{conference.startDate}</td>
                <td>{conference.endDate}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUploadPaper(conference.id)}
                  >
                    Upload Paper
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

export default AuthorDashboard;
