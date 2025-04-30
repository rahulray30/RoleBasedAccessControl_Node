# Role-Based Access Control API

A Node.js application implementing role-based access control (RBAC) using Express and MongoDB.

## Features

- User authentication with JWT
- Role-based authorization (User, Admin, Moderator)
- MongoDB integration
- Password hashing with bcrypt
- Environment variable configuration
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3003
   MONGODB_URI=mongodb://localhost:27017/rbac_db
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
4. Start the server:

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## Project Structure

```
├── src/
│   ├── index.js          # Application entry point
│   ├── models/           # Database models
│   │   └── User.js       # User model
│   └── middleware/       # Custom middleware
│       └── auth.js       # Authentication middleware
├── .env                  # Environment variables
└── package.json         # Project dependencies
```

## API Endpoints

- GET / - Welcome message
- More endpoints to be implemented...

## License

ISC
