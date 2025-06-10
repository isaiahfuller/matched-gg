## G4MR - A Better Gaming Recommendation Engine

**G4MR** is a powerful, proprietary recommendation engine designed to help gamers discover their next favorite title.

This repository is a monorepo containing both the frontend and backend components of the web application. The frontend is built with React and Vite, while the backend is built with NestJS.

### Stack

Frontend - React, Vite, Mantine
Backend - NestJS, Drizzle, PostgreSQL, Powered by IGDB

![G4MR Marquee](README/images/g4mr_marquee.png)

- Yarn Berry (v4)
- Node.js
- nvm (optional)

### Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/isaiahfuller/g4mr.git
   ```

2. Install dependencies within the project's root directory:

   ```bash
   corepack enable
   yarn
   ```

### Preparing the database:

1. From the root directory:

   ```bash
   docker compose up -d
   yarn backend:migrate
   yarn backend:seed
   ```

   This will create the database, run migrations, and seed the database with initial data.

### Receiving updated data:

1. From the root directory:

   ```bash
   yarn webhooks
   ```

   This will start an Express server that listens for data changes from IGDB.

2. From the root directory:

   ```bash
   yarn webhooks:add
   ```

   This will register webhooks with IGDB.

### Running the application:

1. From the root directory:

   ```bash
   yarn dev
   ```

### Running individual components:

If you'd like to install **only** the depedencies for a specific component and then run it, you can do so by navigating to the component's directory and running the following commands:

1. To run any of the components, you can use the `yarn workspaces focus` command to install the dependencies for that component and then run the component:

   ```bash
   yarn workspaces focus @g4mr/<WORKSPACE_NAME>
   cd <WORKSPACE_NAME>
   yarn run dev
   ```

   Replace `<WORKSPACE_NAME>` with the workspace you want to build i.e. `frontend`, `backend`, or `landing`.

### Building the application:

1. From the root directory:

   ```bash
   yarn run build:frontend
   ```

   This will build the frontend of the application and output the build files to the `frontend/dist` directory.

2. The backend runs on node and does not require a build step.
