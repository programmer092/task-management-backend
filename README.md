# Task Management Backend

This project is the backend for a task management application inspired by tools like Jira/Trello. It provides users with a board featuring three columns: **Todo**, **In Progress**, and **Completed**. The API is built using **TypeScript**, **NestJs** and **TypeORM**, and utilizes a **PostgreSQL** database for data persistence.

---

## Features

- User-friendly task management (board view)
- Task lifecycle: Todo → In Progress → Completed
- RESTful API endpoints
- Database migrations for easy setup and updates
- Built with TypeScript and TypeORM

---

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/programmer092/task-management-backend.git
   cd task-management-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add your PostgreSQL connection details (example below):

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_postgres_user
   DATABASE_PASSWORD=your_postgres_password
   DATABASE_NAME=taskmanagement
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   JWT_EXPIRES_IN=1d
   JWT_REFRESH_EXPIRES_IN=7d
   ```

### Database Setup

1. **Create the PostgreSQL Database:**  
   Run the script to create the database.
   ```bash
   npm run database:create
   ```

2. **Run Migrations:**  
   Apply the latest database migrations.
   ```bash
   npm run migration:up
   ```

### Running the Server

Start the backend server:
```bash
npm start
```
The server will start and listen for requests on port 3000 or on different port if specified through configuration.

---

## Tech Stack

- **TypeScript** for strong typing and modern JS features
- **TypeORM** for database management and migrations
- **PostgreSQL** as the database
- **NestJS**

---

## API Documentation

### Authentication

**Base Route:** `/auth`

#### Register
- **POST** `/auth/register`
- **Body:**  
  ```json
  {
    "fullName": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Response:** User registration result.

#### Login
- **POST** `/auth/login`
- **Body:**  
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** Access and refresh tokens.

#### Refresh Access Token
- **POST** `/auth/refresh-access-token`
- **Authentication:** Requires RefreshTokenGuard.
- **Response:** New access token.

---

### Task Management

**Base Route:** `/task`  
*Requires JWT Authentication.*

#### Create Task
- **POST** `/task/create`
- **Body:**  
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "Todo | In Progress | Completed",
    "priority": "Low | Medium | High",
    "deadline": "Date"
  }
  ```
- **Response:** Created task object.

#### Get All Tasks
- **GET** `/task`
- **Response:** Array of user's tasks.

#### Get Task by ID
- **GET** `/task/:id`
- **Params:**  
  - `id`: Task ID
- **Response:** Task object.

#### Update Task
- **PATCH** `/task/:id`
- **Body:**  
  ```json
  {
    "title": "string", // optional
    "description": "string", // optional
    "status": "Todo | In Progress | Completed", // optional
    "priority": "Low | Medium | High" // optional
    "deadline": "Date" //optional
  }
  ```
- **Response:** Updated task object.

#### Delete Task
- **DELETE** `/task/:id`
- **Response:** Deletion result.

#### Get Tasks by Status
- **GET** `/task/status/:status`
- **Params:**  
  - `status`: Task status
- **Response:** Tasks with specified status.

#### Get Tasks by Priority
- **GET** `/task/priority/:priority`
- **Params:**  
  - `priority`: Task priority
- **Response:** Tasks with specified priority.

---

## Folder Structure

- `/src`: Main backend source code
- `/src/migrations`: TypeORM migrations
- `/src/utils/helper/create-db.ts`: Database creation utility

---

**Note:**  
- All `/task` endpoints require authentication via JWT.
- All API endpoints are prefixed with `/api`. For example, your authentication endpoint is: `http://localhost:3000/api/auth/login`
- Task operations are scoped to the authenticated user.
- For more controllers or endpoints, view your project’s [GitHub code search results](https://github.com/programmer092/task-management-backend/search?q=controller).

  
