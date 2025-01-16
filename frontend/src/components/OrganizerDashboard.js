import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header.js';

const OrganizerDashboard = () => {
  const [conferences, setConferences] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User is not authenticated. Please log in.');
          return;
        }
   
        const response = await axios.get('http://localhost:3000/api/conferences', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConferences(response.data.conferences);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized. Please log in again.');
          navigate('/login');
        } else {
          setError('Failed to fetch conferences. Please try again.');
        }
      }
   };

    fetchConferences();
  }, [navigate]);

  const handleGetPapers = (conferenceId, conferenceTitle) => {
    navigate(`/organizer/conferences/${conferenceId}/papers`, { state: { conferenceTitle } });
  };

  const handleCreateConference = () => {
    navigate('/organizer/create-conference');
  };

  return (
    <div>
      <Header/>
      <div className="container mt-5">
        <h2 className="text-center">Hello (Organizer) - Dashboard</h2>
        <button
          className="btn btn-success mb-3"
          onClick={handleCreateConference}
        >
          Create Conference
        </button>
        
        {error && <div className="alert alert-danger">{error}</div>}
        <table className="table table-bordered">
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
                    onClick={() => handleGetPapers(conference.id, conference.title)}
                  >
                    Get List of Papers
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

export default OrganizerDashboard;
