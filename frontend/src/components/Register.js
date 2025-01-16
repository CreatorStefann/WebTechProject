import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('author');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post(`https://final-project-webtech.azurewebsites.net/api/authRoutes/register`, {
        username,
        password,
        role,
      });
      

      setSuccess(response.data.message);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setRole('author');

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Register Form</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">UserName</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="roleAuthor"
                    className="form-check-input"
                    name="role"
                    value="author"
                    checked={role === 'author'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="roleAuthor" className="form-check-label">Author</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="roleReviewer"
                    className="form-check-input"
                    name="role"
                    value="reviewer"
                    checked={role === 'reviewer'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="roleReviewer" className="form-check-label">Reviewer</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="roleOrganizer"
                    className="form-check-input"
                    name="role"
                    value="organizer"
                    checked={role === 'organizer'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="roleOrganizer" className="form-check-label">Organizer</label>
                </div>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
