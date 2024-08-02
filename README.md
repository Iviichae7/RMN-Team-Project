# Team Project

## Overview

This project is an IT support service application built using web technologies, including React, Node.js, Express, and MySQL. It provides a platform for users to register, log in, submit support tickets, and interact with IT support agents. The project also integrates with Google and Microsoft for authentication.

## Features

- User Registration and Login
- Google and Microsoft OAuth Authentication
- User Ticket Submission and Tracking
- Admin Dashboard for Managing Tickets
- Real-time Chat & Notifications with Socket.io
- Payment Integration with Stripe(in test)

## Technologies Used

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express, MySQL
- Authentication: Passport.js, Google OAuth, Microsoft OAuth
- Real-time: Socket.io
- Payments: Stripe

## Installation

### Prerequisites

- Node.js
- MySQL locally: Optional - Aiven

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/Iviichae7/RMN-Team-Project.git
   cd RMN-Team-Project
   ```

2. Install dependencies for both frontend and backend:

   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the `backend` directory and add the following:

   ```env
   # Backend Environment Variables
   DB_HOST=database-host
   DB_USER=database-user
   DB_PORT=database-port
   DB_PASS=-database-password
   DB_NAME=database-name
   SESSION_SECRET=session-secret
   GOOGLE_CLIENT_ID=-google-client-id
   GOOGLE_CLIENT_SECRET=google-client-secret
   MICROSOFT_CLIENT_ID=microsoft-client-id
   MICROSOFT_CLIENT_SECRET=microsoft-client-secret
   STRIPE_SECRET_KEY=striple-secret-key
   STRIPE_PUBLIC_KEY=striple-public-key
   ```

4. Set up your environment variables. Create a `.env` file in the `frontend` directory and add the following:
   ```env
   REACT_APP_STRIPE_PUBLIC_KEY=striple-public-key
   ```

### Database Schema

To ensure the application runs successfully, set up the database schema using the `schema.sql` file included in this repository.

1. Access your MySQL environment (locally or cloud-hosted).
2. Run the database schema.sql script.

   ```
   schema.sql
   ```

### Testing the Admin Dashboard

To test the admin dashboard, you need to insert an admin user into the database. Run the following SQL command in your local env or cloud:

```sql
insert into Users (Email, password, role, First_Name, Second_Name) values
('Admin@rmn.ie', SHA2('1234', 256), 'admin', 'Admin', 'User');
```

### Running the Application

1. Start the backend server:

   ```sh
   cd backend
   nodemon .\server.js
   ```

2. Start the frontend development server:

   ```sh
   cd frontend
   npm start
   ```

The application should now be running on [http://localhost:3000](http://localhost:3000), and the backend server should be running on [http://localhost:3001](http://localhost:3001).

## Acknowledgments

- Special thanks to the team members who contributed to this project.
- Inspired by various projects and community.

---

Thank you.
