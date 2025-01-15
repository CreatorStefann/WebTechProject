import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateConference = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateConference = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !startDate || !endDate) {
      setError('All fields are required.');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError('Start date must be earlier than the end date.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/conferences', {
        title,
        startDate,
        endDate,
      });

      setSuccess('Conference created successfully!');
      setTimeout(() => navigate('/organizer-dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create conference.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Conference Creation Form</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleCreateConference}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Conference Name</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Create Conference</button>
      </form>
    </div>
  );
};

export default CreateConference;
