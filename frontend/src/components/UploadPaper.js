import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/uploadPaper.css";
import Header from './Header.js';

const UploadPaper = () => {
  const { conferenceId } = useParams();
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (!title || !fileUrl) {
      setError('Title and file link are required.');
      return;
    }
  
    try {
      const authorId = localStorage.getItem('userId');
      if (!authorId) {
        setError('User is not logged in. Please log in again.');
        return;
      }
  
      const payload = {
        title,
        abstract,
        fileUrl,
        conferenceId,
        authorId,
      };
  
      await axios.post(`${API_BASE_URL}/api/papers`, payload);
  
      setSuccess('Paper uploaded successfully!');
      setTimeout(() => navigate('/author-dashboard'), 2000);
    } catch (err) {
      setError('Failed to upload paper. Please try again.');
    }
  };

  return (
    <div>
      <Header/>
      <div className="upload-container">
        <h2 className="text-center">Upload Paper</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && <div className="alert alert-success text-center">{success}</div>}
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
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
            <label htmlFor="abstract" className="form-label">Abstract</label>
            <textarea
              id="abstract"
              className="form-control"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fileUrl" className="form-label">File Link</label>
            <input
              type="url"
              id="fileUrl"
              className="form-control"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadPaper;