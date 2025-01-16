import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://final-project-webtech.azurewebsites.net:8080/api/authRoutes/login', {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);
      const { id, role } = decodedToken;

      localStorage.setItem('userId', id);
      localStorage.setItem('role', role);

      if (role === 'author') {
        navigate('/author-dashboard');
      } else if (role === 'organizer') {
        navigate('/organizer-dashboard');
      } else if (role === 'reviewer') {
        navigate('/reviewer-dashboard');
      } else {
        setError('Invalid role. Please contact the administrator.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Log in Form</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn btn-primary w-100">Log in</button>
      </form>
    </div>
  );
};

export default Login;
