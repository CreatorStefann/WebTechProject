# WebTechProject
1. Project Plan

Objective:
Develop a conference management web application that allows organizers, reviewers, and authors to manage conferences, paper submissions, reviews, and feedback.

USER ROLES:

Organizer:
    - Create conferences.
    - Assign reviewers to conferences.
    - Monitor paper statuses (submitted, under review, accepted, rejected).
Reviewer:
    - Review assigned papers.
    - Provide feedback or approve/reject papers.
Author:
    - Submit papers for conferences.
    - Upload updated papers based on feedback from reviewers.
Core Features:
    - Conference Creation: Organizers can create conferences with titles, start/end dates, and descriptions.
    - Paper Submission: Authors can submit papers with a title, abstract, and PDF file for a conference.
    - Reviewer Assignment: Upon paper submission, two reviewers are automatically assigned to each paper.
    - Review Management: Reviewers can provide feedback or approve/reject papers.
    - Feedback Loop: Authors can revise and re-upload papers based on reviewer feedback.
    - Status Monitoring: Organizers can view the status of submitted papers (pending, under review, feedback given, accepted, rejected).

2. Detailed Specifications

API Endpoints:

POST /api/conferences:  Create a new conference (accessible by organizers).
GET /api/conferences:   List all conferences (accessible by organizers).
POST /api/users:    Register a new user (author/reviewer/organizer).
POST /api/papers:   Submit a paper for a specific conference (accessible by authors).
GET /api/papers:    List all papers submitted to a conference (accessible by organizers).
GET /api/papers/{id}:   Get details of a specific paper by ID (accessible by organizers and reviewers).
POST /api/reviews:  Submit a review for a paper (accessible by reviewers).
PATCH /api/papers/:   Update a paper after receiving feedback (accessible by authors).