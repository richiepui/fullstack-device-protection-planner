
# Fullstack-Device-Protection-Planner

Github Link: https://github.com/richiepui/fullstack-device-protection-planner/tree/main

## Overview

The **Device Protection Planner** is a web application designed for Asurion. The app allows users to manage their devices' protection plans, receive AI-generated maintenance tips, and track protection plans effectively. The application showcases frontend design, backend API development

## Features

- **Device Management**: Add, view, edit, and delete devices.
- **Protection Plans**: Add and extend protection plans for devices.
- **Generative AI**: Receive AI-generated tips and recommendations based on the device type and age (API Only)
- **Responsive Design**: Built with Chakra UI for a responsive user experience.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens.

## Features Not Completed

- **Generative AI**: Not done for the UI

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 16.x or later)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git** (for version control)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fullstack-device-protection-planner.git
cd fullstack-device-protection-planner
```

### 2. Backend Setup

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file.

4. Update the `.env` file with your MongoDB connection string and JWT secret:

    ```
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-generated-secret
    ```

5. Start the backend server:

    ```bash
    npm run dev
    ```

    The backend server will start on `http://localhost:3000`.

### 3. Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd device-protection-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm run dev
    ```

    The frontend server will start on `http://localhost:3001`.

### 4. Access the Application

- Navigate to `http://localhost:3001` in your browser to start using the **Device Protection Planner** application.

