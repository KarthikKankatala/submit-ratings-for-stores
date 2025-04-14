# Store Rating Application

This is a full-stack web application that allows users to browse stores, view their details, and submit ratings. Store owners can manage their store information and view ratings. Administrators have overall control over the system.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Store Rating Application aims to provide a platform where users can discover local stores, read reviews and ratings from other users, and share their own experiences by submitting ratings. The application caters to three main roles:

- **General Users:** Can view a list of stores, see details of a specific store (including ratings), and submit their own ratings after logging in/signing up.
- **Store Owners:** Can log in to a dashboard to view information about their store, see the ratings and reviews it has received, and potentially manage store details in future iterations.
- **Administrators:** Have administrative privileges to manage users, stores, and potentially ratings.

## Features

- **User Authentication:** Secure login and signup functionality for users, store owners, and administrators.
- **Store Listings:** Browse a list of all available stores with basic information.
- **Store Details:** View detailed information about a specific store, including user ratings and average rating.
- **Rating Submission:** Logged-in users can submit ratings for stores.
- **User Roles:** Distinct roles (user, owner, admin) with role-based access control for different features.
- **Dashboard:** Separate dashboards for users, store owners, and administrators (with role-specific functionalities).
- **Search and Filtering:** Basic search functionality for stores by name and address.

## Technologies Used

- **Frontend:**
    - React: JavaScript library for building user interfaces.
    - React Router: For handling client-side routing.
    - Axios: For making HTTP requests to the backend API.
    - Context API/Redux (Conceptual): For state management (basic Context API used for authentication; more complex state management can be implemented as needed).
    - CSS: For styling.
- **Backend:**
    - Node.js: JavaScript runtime environment.
    - Express: Web application framework for Node.js.
    - MySQL: Relational database for storing application data.
    - Sequelize (Conceptual): ORM (Object-Relational Mapper) for interacting with the MySQL database (raw `db.execute` used in the provided code).
    - CORS: Middleware for enabling Cross-Origin Resource Sharing.
    - dotenv: For managing environment variables.
- **Other:**
    - npm: Package manager for JavaScript.

## Getting Started

Follow these steps to get the application running on your local machine.

### Prerequisites

- **Node.js** (version >= 14.0.0) and **npm** (version >= 6.0.0) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).
- **MySQL** installed and running. You will need to create a database for the application.

### Installation

1.  **Clone the repository (if you have it):**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3.  **Install backend dependencies:**
    ```bash
    npm install
    ```

4.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

5.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

### Configuration

1.  **Backend Configuration:**
    - Create a `.env` file in the `backend` directory based on the `.env.example` (if provided) or create the following environment variables:
      ```env
      DB_HOST=localhost
      DB_USER=<your_mysql_username>
      DB_PASSWORD=<your_mysql_password>
      DB_DATABASE=<your_database_name>
      PORT=5000
      JWT_SECRET=<your_secret_jwt_key>
      ```
    - Update the values with your MySQL database credentials and a secret key for JWT (if used for authentication).

2.  **Frontend Configuration:**
    - In the `frontend` directory, you might have an environment configuration file (e.g., `.env` or a config file in `src`). If so, configure the base URL for your backend API:
      ```env
      REACT_APP_API_BASE_URL=http://localhost:5000/api
      ```
      (Adjust the port if your backend runs on a different port).

### Running the Application

1.  **Start the backend server:**
    - Navigate to the `backend` directory in your terminal:
      ```bash
      cd backend
      ```
    - Run the command:
      ```bash
      npm start
      ```
    - The backend server should start running on the configured port (default is 5000).

2.  **Start the frontend development server:**
    - Open a new terminal window and navigate to the `frontend` directory:
      ```bash
      cd frontend
      ```
    - Run the command:
      ```bash
      npm start
      ```
    - The frontend application should open in your browser, usually at `http://localhost:3000`.

## API Endpoints

This is a list of the main API endpoints provided by the backend:

- **`/api/auth/signup` (POST):** Registers a new user.
- **`/api/auth/login` (POST):** Logs in an existing user.
- **`/api/users/stores` (GET):** Retrieves a list of all stores (with optional filtering and sorting).
- **`/api/users/stores/:id` (GET):** Retrieves details of a specific store, including ratings.
- **`/api/users/stores/:id/rate` (POST):** Submits a rating for a specific store (requires authentication).
- **`/api/users/update-password` (POST):** Updates the logged-in user's password (requires authentication).
- **`/api/owner/dashboard` (GET):** Retrieves data for the store owner's dashboard (requires owner authentication).
- **`/api/owner/update-password` (POST):** Updates the logged-in store owner's password (requires authentication).
- **`/api/stores` (POST):** Creates a new store (requires admin/owner authentication).
- **`/api/stores/:id` (PUT):** Updates an existing store (requires admin/owner authentication).
- **`/api/admin/dashboard` (GET):** Retrieves data for the admin dashboard (requires admin authentication).
- **`/api/admin/users` (GET):** Retrieves a list of all users (requires admin authentication).
- **`/api/admin/users/:id` (DELETE):** Deletes a user (requires admin authentication).
- **`/api/ratings` (GET):** Retrieves a list of all ratings (requires admin authentication).
- **`/api/ratings/:id` (DELETE):** Deletes a rating (requires admin authentication).

**(Note: This list might not be exhaustive and depends on the exact features implemented.)**

## Database Schema

The application uses a MySQL database with the following main tables (subject to change based on the application's evolution):

- **`users`:**
    - `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
    - `name` (VARCHAR)
    - `email` (VARCHAR, UNIQUE)
    - `password` (VARCHAR)
    - `role` (ENUM('user', 'owner', 'admin'), DEFAULT 'user')
    - `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
    - `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

- **`stores`:**
    - `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
    - `name` (VARCHAR)
    - `address` (VARCHAR)
    - `owner_id` (INT, FOREIGN KEY referencing `users.id`)
    - `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
    - `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

- **`ratings`:**
    - `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
    - `user_id` (INT, FOREIGN KEY referencing `users.id`)
    - `store_id` (INT, FOREIGN KEY referencing `stores.id`)
    - `rating` (INT, 1-5 scale)
    - `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
    - `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
    - **UNIQUE KEY** (`user_id`, `store_id`) to ensure a user can rate a store only once.

## Contributing

Contributions to the project are welcome. Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear and concise messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.



**Last Updated:** April 14, 2025
