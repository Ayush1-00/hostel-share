# HostelShare - Meal QR & Travel Sharing Platform

A full-stack web application that allows hostel students to share unused meal QR codes and find travel companions.

## Features

### 🍽️ Meal QR Sharing
- Upload and share unused meal QR codes
- Browse available QR codes from other students
- Claim QR codes for use
- Real-time status updates (available/claimed)

### 🚗 Travel Sharing
- Create travel plans with source, destination, and date
- Search for travel companions going to the same destination
- Contact fellow travelers
- Filter by destination and travel date

### 👤 User Management
- User registration and authentication
- Role-based access (Student/Admin)
- Secure JWT-based authentication
- Admin panel for monitoring users and QR logs

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

## Project Structure

```
hostelshare/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middleware
│   ├── uploads/           # File uploads directory
│   ├── package.json
│   └── server.js
└── package.json           # Root package.json
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hostelshare
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:3000`
   - Frontend development server on `http://localhost:5173`

### Individual Commands

- **Start backend only**: `npm run server`
- **Start frontend only**: `npm run client`
- **Build frontend**: `npm run build`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Meal QR
- `GET /api/qr/available` - Get available QR codes
- `POST /api/qr/donate` - Upload new QR code
- `POST /api/qr/claim/:id` - Claim a QR code

### Travel Plans
- `GET /api/travel/all` - Get all travel plans
- `POST /api/travel/create` - Create new travel plan
- `GET /api/travel/match` - Search travel plans

### Admin (Admin role required)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/qrs` - Get all QR logs

## Features in Detail

### Authentication System
- Secure user registration and login
- JWT-based authentication
- Role-based access control (Student/Admin)
- Password hashing with bcryptjs

### File Upload System
- Secure image upload for QR codes
- File validation and storage
- Automatic filename generation
- Static file serving

### Real-time Updates
- Dynamic status updates for QR codes
- Instant claim notifications
- Live search and filtering

### Responsive Design
- Mobile-first design approach
- Beautiful UI with Tailwind CSS
- Smooth animations and transitions
- Intuitive user experience

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your-email@example.com or create an issue in the repository.