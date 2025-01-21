# WebTechProject  

### Live Preview: [https://final-project-webtech.azurewebsites.net/](https://final-project-webtech.azurewebsites.net/)  

---

## 1. Project Overview  

### Objective  
The **WebTechProject** is a comprehensive **conference management platform** designed to streamline the process of organizing and managing scientific conferences. It allows **organizers**, **reviewers**, and **authors** to collaborate efficiently through paper submissions, reviews, feedback loops, and conference management.  

### User Roles and Features  

#### 1. **Organizers**  
- Create, update, and manage conferences (title, description, dates).  
- Track paper statuses: Submitted, Under Review, Feedback Provided, Accepted, Rejected.  

#### 2. **Reviewers**  
- Access automatically assigned papers for review.  
- Provide feedback and approval/rejection for papers.  

#### 3. **Authors**  
- Submit papers for conferences.  
- Upload revised papers after receiving feedback.  
- Monitor the status of their papers throughout the review process.  

---

## 2. Core Features  

- **Conference Management**:  
  Organizers can create and manage conferences, specifying details such as name, description, and dates.  

- **Paper Submission**:  
  Authors can submit papers to a conference, including title, abstract, and file upload.  

- **Automated Reviewer Assignment**:  
  Each submitted paper is automatically assigned to two reviewers for evaluation.  

- **Feedback and Revision Workflow**:  
  Reviewers can provide feedback, and authors can revise and resubmit their papers for final evaluation.  

- **Real-Time Updates**:  
  All users can monitor the progress and status of their tasks (e.g., submitted papers, review statuses, feedback loops).  

---

## 3. Tech Stack  

### Frontend  
- **React.js**: A modern library for building interactive user interfaces.  
- **Bootstrap**: For advanced and responsive styling.  
- **Responsive Design**: Ensuring accessibility on desktop, tablet, and mobile devices.  

### Backend  
- **Node.js with Express.js**: RESTful API to handle server-side operations.  
- **Sequelize ORM**: For relational database operations and efficient data management.  
- **MySQL**: Relational database for storing all user, conference, and paper data.  

### Deployment  
- **Microsoft Azure**: The application is hosted and deployed using Azure for high scalability and availability.  

---

## 4. Getting Started  

### Prerequisites  
- **Node.js**: v16+  
- **MySQL**: Installed locally or accessible via a cloud service.  

### Installation Steps  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/CreatorStefann/WebTechProject.git  
   cd WebTechProject  

2. Install dependencies for the frontend:
   ```bash
   cd frontend  
   npm install  

3. Install dependencies for the backend:
   ```bash
   cd ../backend  
   npm install     

4. Configure the database:
   Update the .env file in the backend folder with your database credentials:
   ```env
   DB_HOST=localhost  
   DB_USER=root  
   DB_PASSWORD=yourpassword  
   DB_NAME=webtech   

5. Configure the database:
   ```bash
   cd backend  
   npm start  
  
6. Start the frontend:
   ```bash
   cd ../frontend  
   npm start

7. Access the application at http://localhost:3000 or use the live preview.

---

## 5. API Overview  

### Endpoints  

#### **Conferences**  
- **Create Conference**: `POST /api/conferences`  
  _Allows organizers to create a new conference._  
- **List Conferences**: `GET /api/conferences`  
  _Retrieves a list of all conferences._  

#### **Users**  
- **Register User**: `POST /api/users`  
  _Registers a new user (author, reviewer, or organizer)._  
- **Login User**: `POST /api/auth/login`  
  _Authenticates a user and provides access credentials._  

#### **Papers**  
- **Submit Paper**: `POST /api/papers`  
  _Allows authors to submit a paper for a specific conference._  
- **List Submitted Papers**: `GET /api/papers`  
  _Fetches a list of all papers submitted to conferences._  
- **Update Paper**: `PATCH /api/papers/{id}`  
  _Enables authors to update a paper after receiving feedback._  

#### **Reviews**  
- **Submit Review**: `POST /api/reviews`  
  _Allows reviewers to submit their review for an assigned paper._  
- **Get Reviews for a Paper**: `GET /api/reviews/{paperId}`  
  _Retrieves all reviews associated with a specific paper._  

