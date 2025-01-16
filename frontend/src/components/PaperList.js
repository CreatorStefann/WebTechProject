import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.js';

const PaperList = () => {
  const { conferenceId } = useParams(); 
  const { state } = useLocation(); 
  const [papers, setPapers] = useState([]); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(`https://final-project-webtech.azurewebsites.net/api/papers?conferenceId=${conferenceId}`);
        const fetchedPapers = response.data.papers || [];

        const papersWithReviewers = await Promise.all(
          fetchedPapers.map(async (paper) => {
            try {
              const reviewersResponse = await axios.get(
                `https://final-project-webtech.azurewebsites.net/api/papers/${paper.id}/reviewers`
              );
              return {
                ...paper,
                reviewers: reviewersResponse.data.reviewers || [],
              };
            } catch (err) {
              console.error(`Error fetching reviewers for paper ${paper.id}:`, err);
              return {
                ...paper,
                reviewers: [],
              };
            }
          })
        );

        setPapers(papersWithReviewers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch papers or reviewers. Please try again.');
        setLoading(false);
      }
    };

    fetchPapers();
  }, [conferenceId]);

  if (loading) {
    return <div className="container mt-5">Loading papers...</div>;
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  if (papers.length === 0) {
    return <div className="container mt-5">No papers found for this conference.</div>;
  }

  return (
    <div>
      <Header/>
      <div className="container mt-5">
        <h2>Paper List from Conference: {state?.conferenceTitle || 'Unknown Conference'}</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Paper Title</th>
              <th>Abstract</th>
              <th>Paper Link</th>
              <th>Status</th>
              <th>Assigned Reviewers</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              <tr key={paper.id}>
                <td>{paper.title}</td>
                <td>{paper.abstract}</td>
                <td>
                  <a href={paper.fileUrl} target="_blank" rel="noopener noreferrer">
                    View Paper
                  </a>
                </td>
                <td>{paper.status}</td>
                <td>
                  {Array.isArray(paper.reviewers) && paper.reviewers.length > 0 ? (
                    paper.reviewers.map((reviewer, index) => (
                      <div key={index}>
                        {reviewer.name || 'Unassigned'} - {reviewer.status}
                      </div>
                    ))
                  ) : (
                    'No reviewers assigned'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaperList;
