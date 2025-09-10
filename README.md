# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


          Personal Finance Tracker - MERN Stack Application
A comprehensive personal finance management application built with the MERN stack (MongoDB, Express.js, React, Node.js) that helps users track their income and expenses with full CRUD functionality.

                        Features
User Authentication: Register and login with JWT-based authentication

Transaction Management: Add, view, edit, and delete financial transactions

Categorization: Organize transactions by custom categories

Financial Dashboard: Visual overview of income, expenses, and balance

Data Visualization: Interactive charts for spending analysis

Filtering & Search: Filter transactions by type, category, and date range

Responsive Design: Works perfectly on mobile, tablet, and desktop

Secure: Protected routes and user-specific data access

                   Prerequisites
Before running this application, ensure you have the following installed:

Node.js (v14 or higher)

MongoDB (local installation or MongoDB Atlas account)

npm or yarn package manager

Git

    Installation & Setup
1. Clone the Repository
git clone <your-repository-url>
cd personal-finance-tracker

2. Backend Setup
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-tracker
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=90d" > .env

# Start the backend server
npm run dev

The backend server will start on http://localhost:5000

3. Frontend Setup
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env

# Start the frontend development server
npm run dev

4. Database Setup
# For local MongoDB installation
mongod

# Or if using MongoDB as a service (Windows)
net start MongoDB

# Or if using Homebrew (Mac)
brew services start mongodb-community

API Documentation

Transaction Endpoints (Protected)
Get All Transactions
URL: /api/transactions

Method: GET

Query Parameters:

type (optional): Filter by type (income or expense)

category (optional): Filter by category

startDate (optional): Filter by start date (YYYY-MM-DD)

endDate (optional): Filter by end date (YYYY-MM-DD)

Success Response: 200 OK

[
  {
    "_id": "transaction-id",
    "title": "Salary",
    "amount": 5000,
    "type": "income",
    "category": "Salary",
    "date": "2023-10-15T00:00:00.000Z",
    "user": "user-id",
    "createdAt": "2023-10-15T10:30:00.000Z",
    "updatedAt": "2023-10-15T10:30:00.000Z"
  }
]

Get Single Transaction
URL: /api/transactions/:id

Method: GET

Headers: Authorization: Bearer <jwt-token>

Success Response: 200 OK

Create Transaction
URL: /api/transactions

Method: POST

Update Transaction
URL: /api/transactions/:id

Method: PUT

Delete Transaction
URL: /api/transactions/:id

Method: DELETE

Headers: Authorization: Bearer <jwt-token>

Success Response: 200 OK

Get Statistics
URL: /api/transactions/stats

Method: GET

Headers: Authorization: Bearer <jwt-token>

Success Response: 200 OK


 Frontend Routes
/ - Dashboard with transaction list and statistics

/add - Add new transaction form

/:id/edit - Edit existing transaction

/:id/delete - Delete transaction confirmation

  Backend Dependencies
express: Web framework

mongoose: MongoDB object modeling

cors: Cross-Origin Resource Sharing

dotenv: Environment variables


   Frontend Dependencies
react: UI library

react-dom: React DOM rendering

react-router-dom: Routing

axios: HTTP client

chart.js & react-chartjs-2: Data visualization

tailwindcss: CSS framework