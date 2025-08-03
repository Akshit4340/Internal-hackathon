# EventSphere - Event Management Platform

A full-stack event management application built for hackathon participants to discover, create, and participate in events. The platform allows users to browse events, RSVP, comment, and interact with other attendees in real-time.

## Features

- **User Authentication**: Register, login, and profile management
- **Event Management**: Create, view, edit, and delete events
- **RSVP System**: Users can RSVP to events and view attendee lists
- **Real-time Comments**: Comment on events with real-time updates
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Real-time Communication**: Socket.io integration for live updates

##  Architecture

This is a monorepo containing both frontend and backend applications:

```
server/
├── backend/           # Node.js/Express API server
├── client/           # React frontend application
└── README.md         # This file
```

##  Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Real-time**: Socket.io
- **File Upload**: Multer
- **Environment**: dotenv

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Native fetch API
- **Icons**: Lucide React

## Project Structure

### Backend (`/backend`)

```
backend/
├── index.js              # Main server entry point
├── package.json           # Backend dependencies
├── config/
│   └── db.js             # MongoDB connection configuration
├── controller/
│   ├── authController.js  # Authentication logic
│   └── eventController.js # Event management logic
├── middleware/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   ├── user.js           # User schema and model
│   └── events.js         # Event schema and model
└── routes/
    ├── authRoutes.js     # Authentication routes
    └── eventRoutes.js    # Event management routes
```

### Frontend (`/client`)

```
client/
├── index.html            # HTML entry point
├── package.json          # Frontend dependencies
├── vite.config.js        # Vite configuration
├── src/
│   ├── App.jsx           # Main React component
│   ├── main.jsx          # React DOM entry point
│   ├── index.css         # Global styles
│   ├── lib/
│   │   └── axios.js      # HTTP client configuration
│   └── pages/
│       ├── HomePage.jsx      # Landing page
│       ├── LoginPage.jsx     # User login
│       ├── RegisterPage.jsx  # User registration
│       ├── Events.jsx        # Event listing
│       ├── EventDetail.jsx   # Event details and RSVP
│       ├── CreateEvent.jsx   # Event creation form
│       ├── MyEvent.jsx       # User's events
│       ├── Dashboard.jsx     # Admin dashboard
│       └── Profile.jsx       # User profile
└── public/
    ├── hero-img.png      # Hero section image
    └── vite.svg          # Vite logo
```

## 🔧 Key Components

### Database Models

#### User Model (`models/user.js`)

- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password
- `bio`: User biography
- `interests`: Array of user interests
- `photoUrl`: Profile picture URL
- `isOrganizer`: Boolean flag for event organizers
- `oauthProvider` & `oauthId`: OAuth integration fields

#### Event Model (`models/events.js`)

- `title`: Event title
- `description`: Event description
- `category`: Event category
- `date`: Event date and time
- `location`: Event location
- `createdBy`: Reference to User who created the event
- `attendees`: Array of User references who RSVP'd
- `comments`: Embedded comment subdocuments

### API Endpoints

#### Authentication Routes (`/api/auth`)

- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

#### Event Routes (`/api/events`)

- `GET /` - Get all events
- `POST /` - Create new event
- `GET /:id` - Get specific event
- `PUT /:id` - Update event
- `DELETE /:id` - Delete event
- `POST /:id/rsvp` - RSVP to event
- `POST /:id/comments` - Add comment to event

### Frontend Pages

1. **HomePage**: Landing page with hero section and featured events
2. **LoginPage**: User authentication form
3. **RegisterPage**: New user registration form
4. **Events**: Event listing with search and filter capabilities
5. **EventDetail**: Detailed event view with RSVP and comments
6. **CreateEvent**: Form to create new events
7. **MyEvent**: User's personal events dashboard
8. **Dashboard**: Admin dashboard for event management
9. **Profile**: User profile management

## 🎨 Design System

The application uses a consistent color palette:

- **Primary**: `#1B3C53` (Dark blue)
- **Secondary**: `#456882` (Medium blue)
- **Accent**: `#D2C1B6` (Light brown)
- **Background**: `#F9F3EF` (Cream)

Typography: Poppins font family for modern, clean appearance.


## 🔐 Authentication Flow

1. User registers with name, email, and password
2. Password is hashed using bcryptjs
3. JWT token is generated upon successful login
4. Token is stored in localStorage on the frontend
5. Protected routes verify JWT token via middleware
6. User data is attached to request object for route handlers

## 🌐 Real-time Features

The application uses Socket.io for real-time communication:

- Live event updates
- Real-time comment notifications
- User connection status
- Event attendance updates


##  Development Tools

- **Nodemon**: Auto-restart backend during development
- **Vite**: Fast frontend build tool with HMR
- **ESLint**: Code linting for consistent style
- **Tailwind CSS**: Utility-first CSS framework




**Note**: This is a hackathon project focused on rapid prototyping and core functionality. Some features may be in development or require additional implementation for production use.
