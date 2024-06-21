#Ellanatek 

Here's a step-by-step tutorial for setting up your React project with a Node.js backend, from cloning the repository to running both the backend and frontend.

### Tutorial: Setting Up and Running the Project

#### Prerequisites

Before starting, ensure you have the following software installed on your machine:

- **Git**: [Download and install Git](https://git-scm.com/downloads)
- **Node.js and npm**: [Download and install Node.js](https://nodejs.org/en/download/) (npm is included with Node.js)

#### Step 1: Clone the Repository

1. Open your terminal (Command Prompt, PowerShell, or a terminal application).

2. Navigate to the directory where you want to clone the repository:

   ```sh
   cd /path/to/your/directory
   ```

3. Clone the repository using Git:

   ```sh
   git clone https://github.com/yourusername/your-repo.git
   ```

4. Change into the project directory:

   ```sh
   cd your-repo
   ```

#### Step 2: Set Up the Backend

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Start the backend server:

   ```sh
   node index.js
   ```

   Your backend should now be running. If you see any output indicating the server is listening on a specific port, your backend setup is successful.

#### Step 3: Set Up the Frontend

1. Open a new terminal window or tab and navigate to the frontend directory:

   ```sh
   cd /path/to/your-repo/ellanatek
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:

   ```sh
   npm start
   ```

   This should automatically open your web browser and navigate to `http://localhost:3000`, where you can see your React application running. If it doesn't open automatically, you can manually open your browser and go to `http://localhost:3000`.

### Summary of Commands

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Set up and run the backend**:
   ```sh
   cd backend
   npm install
   node index.js
   ```

3. **Set up and run the frontend**:
   ```sh
   cd /path/to/your-repo/ellanatek
   npm install
   npm start
   ```

### Notes

- Ensure that both the backend and frontend are running simultaneously in different terminal windows or tabs.
- If you encounter any issues, check the console output for error messages and ensure all dependencies are correctly installed.

This tutorial should help first-time users clone your repository, set up the project, and run both the backend and frontend components.