import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrganizerDashboard = () => {
  const [conferences, setConferences] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/conferences');
        setConferences(response.data.conferences);
      } catch (err) {
        setError('Failed to fetch conferences. Please try again.');
      }
    };

    fetchConferences();
  }, []);

  const handleGetPapers = (conferenceId, conferenceTitle) => {
    navigate(`/organizer/conferences/${conferenceId}/papers`, { state: { conferenceTitle } });
  };

  const handleCreateConference = () => {
    navigate('/organizer/create-conference');
  };

  return (
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
  );
};

export default OrganizerDashboard;
