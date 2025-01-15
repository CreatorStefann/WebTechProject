import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.js';

const AuthorDashboard = () => {
  const [conferences, setConferences] = useState([]);
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

  return (
    <div>
      <Header/>
      <div className="container mt-5">
        <h2 className="text-center">Hello (Author) - Dashboard</h2>
        {error && <div className="alert alert-danger">{error}</div>}
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
