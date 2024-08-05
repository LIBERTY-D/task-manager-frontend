# React + TypeScript Frontend for Task Manager Application

## Overview
This is the frontend application for the Task Manager project, built with React, TypeScript, and Vite. It provides a modern and efficient user interface to interact with the backend services of the Task Manager application.

## Features
- User authentication and registration.
- Task management (CRUD operations).
- User profile management.
- Responsive and interactive design.

## Technologies Used
- **Frontend**: React, TypeScript, Vite
- **State Management**: React Context API 
- **Build Tool**: Vite
- **Other**: Axios (for API calls) 

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm (v10 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LIBERTY-D/task-manager-frontend.git
   cd task-manager-frontend
2. **Install dependencies**
   ```bash
    npm install
3. **Set up environment variables**
    Create a .env file in the root directory of the project and add the following environment variable: 
    ```dotenv
      VITE_MAP_BOX_KEY="YOUR-API-KEY"
      VITE_TASK_URL = http://127.0.0.1:8080/api/v1/tasks
      VITE_USER_URL = http://127.0.0.1:8080/api/v1/users
      VITE_PROFILE_URL=http://127.0.0.1:8080/api/v1/profiles
    ```
    ```
4. **Run the application**
   ```bash
    npm run dev
