## G4MR - A Better Gaming Recommendation Engine

**G4MR** is a powerful, proprietary recommendation engine designed to help gamers discover their next favorite title.

This repository is a monorepo containing both the frontend and backend components of the web application. The frontend is built with React and Vite, while the backend is built with NestJS.

### Prerequisites

- Yarn
- Node.js

### Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/isaiahfuller/g4mr.git
   ```

2. Install dependencies within the project's root directory:

   ```bash
   yarn
   ```

**Running both the Frontend and Backend in dev mode**

1. From the root directory:

   ```bash
   docker compose up -d
   yarn run dev
   ```

   This will start both the frontend and backend services in dev mode, along with a PostgreSQL database container.

**Running only the frontend (React with Vite):**

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Start the development server:

   ```bash
   yarn run dev
   ```

   This will typically start the frontend server on `http://localhost:3000` by default.

**Running only the backend (NestJS):**

1. Run the PostgreSQL database container:

   ```bash
   docker compose up -d
   ```

   This will start a PostgreSQL database container in the background.

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   This will typically start the backend server on a designated port (as configured in NestJS). You can check the specific port number in the console output.

**Building the application:**

1. From the root directory:

   ```bash
   yarn run build
   ```

   This will build the frontend of the application and output the build files to the `frontend/dist` directory.

2. The backend runs on node and does not require a build step.
