import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <header className="mb-5">
        <h1 className="display-4 fw-bold">Welcome to the Conference Managing App</h1>
        <p className="lead text-muted">
          Your one-stop solution for managing conferences, reviewing papers, and seamless collaboration.
        </p>
      </header>

      <section className="row mb-5">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h3 className="card-title text-primary">How does this app work?</h3>
              <p className="card-text">
                This app allows organizers to create conferences, assign papers for review, and manage the entire conference process. Reviewers can review papers assigned to them, and authors can submit their research papers for evaluation.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h3 className="card-title text-success">Why should I use this app?</h3>
              <p className="card-text">
                This app streamlines the conference management process by providing a user-friendly interface to organize, review, and submit papers. It ensures transparency and efficient communication between authors, reviewers, and organizers.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="mt-5">
        <h4 className="mb-3 text-secondary">Ready to start?</h4>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary me-3 px-4"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button
            className="btn btn-success px-4"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
