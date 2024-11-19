# WebTechProject

## 1. Project Overview

### Objective
Develop a **conference management web application** that allows organizers, reviewers, and authors to manage conferences, paper submissions, reviews, and feedback.

### User Roles

- **Organizer**:  
  - Create conferences.
  - Assign reviewers to conferences.
  - Monitor paper statuses (submitted, under review, accepted, rejected).

- **Reviewer**:  
  - Review assigned papers.
  - Provide feedback or approve/reject papers.

- **Author**:  
  - Submit papers for conferences.
  - Upload updated papers based on feedback from reviewers.

### Core Features

- **Conference Creation**:  
  Organizers can create conferences with titles, start/end dates, and descriptions.

- **Paper Submission**:  
  Authors can submit papers with a title, abstract, and PDF file for a specific conference.

- **Reviewer Assignment**:  
  Two reviewers are automatically assigned to each paper upon submission.

- **Review Management**:  
  Reviewers can provide feedback or approve/reject papers.

- **Feedback Loop**:  
  Authors can revise and re-upload papers based on reviewer feedback.

- **Status Monitoring**:  
  Organizers can track the status of submitted papers (pending, under review, feedback given, accepted, rejected).

---

## 2. API Specifications

### Endpoints

#### **Conferences**
- **Create Conference**  
  `POST /api/conferences`  
  _Create a new conference (organizer access)._

- **List Conferences**  
  `GET /api/conferences`  
  _Get a list of all conferences (organizer access)._

#### **Users**
- **Register User**  
  `POST /api/users`  
  _Register a new user (author/reviewer/organizer access)._

#### **Papers**
- **Submit Paper**  
  `POST /api/papers`  
  _Submit a paper to a specific conference (author access)._

- **List Submitted Papers**  
  `GET /api/papers`  
  _Get a list of all papers submitted to a conference (organizer access)._

- **Get Paper Details**  
  `GET /api/papers/{id}`  
  _Retrieve details of a specific paper by ID (organizer and reviewer access)._

- **Update Paper (After Feedback)**  
  `PATCH /api/papers/{id}`  
  _Update a paper after receiving feedback (author access)._

#### **Reviews**
- **Submit Review**  
  `POST /api/reviews`  
  _Submit a review for an assigned paper (reviewer access)._