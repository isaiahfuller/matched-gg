## G4MR - A Better Gaming Recommendation Engine

**G4MR** is a powerful, proprietary recommendation engine designed to help gamers discover their next favorite title.

This repository is a monorepo containing both the frontend and backend components of the web application. The frontend is built with React and Vite, while the backend is built with NestJS. The landing page is a static site running on Astro.

### Stack

Frontend - React, Vite, TailwindCSS, Mantine
Backend - NestJS, Drizzle, PostgreSQL, Powered by IGDB
Landing - Astro, TailwindCSS

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
   yarn set version stable
   yarn
   ```

### Running the application:

1. From the root directory:

   ```bash
   yarn dev
   ```

### Running individual components:

If you'd like to install **only** the depedencies for a specific component and then run it, you can do so by navigating to the component's directory and running the following commands:

1. To run the frontend:

   ```bash
   yarn workspaces focus @g4mr/frontend
   yarn dev:frontend
   ```

2. To run the backend:

   ```bash
   yarn workspaces focus @g4mr/backend
   yarn dev:backend
   ```

3. To run the landing page:

   ```bash
   yarn workspaces focus @g4mr/landing
   yarn dev:landing
   ```

### Building the application:

1. From the root directory:

   ```bash
   yarn run build:frontend
   ```

   This will build the frontend of the application and output the build files to the `frontend/dist` directory.

2. From the root directory:

   ```bash
   yarn run build:landing
   ```

3. The backend runs on node and does not require a build step.
