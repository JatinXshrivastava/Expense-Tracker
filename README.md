# Expense Tracker

A simple personal expense tracker web app built with Node.js, Express, MongoDB, and vanilla HTML/CSS/JavaScript.

## Features

- User signup and login
- Add income and expense transactions
- View transactions in a table
- Static frontend served from the `frontend/` folder
- Media assets served from the `media/` folder

## Project Structure

- `backend/`
  - `index.js` - Express server and API routes
  - `middleware.js` - authentication middleware
  - `model.js` - MongoDB/Mongoose models
- `frontend/`
  - `index.html` - main dashboard page
  - `login.html` - login page
  - `signup.html` - signup page
- `media/`
  - `favicons/` - favicon assets
  - `images/` - image assets
- `package.json` - project dependencies and metadata

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or accessible remotely

### Install dependencies

```bash
npm install
```

### Start the server

```bash
node backend/index.js
```

The app will run on `http://localhost:3000`.

### Open the app

- Visit `http://localhost:3000` for the dashboard
- Visit `http://localhost:3000/login` for login
- Visit `http://localhost:3000/signup` for registration

## Notes

- The backend serves static files from the `frontend/` folder and media files from the `media/` folder.
- The app uses JSON Web Tokens (JWT) for authentication.
- If the favicon does not appear, clear browser cache and refresh the page.

