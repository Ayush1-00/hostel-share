🚀 HostelShare – Meal QR & Travel Sharing Platform
A full-stack platform empowering hostel students to share unused meal QR codes and connect with travel companions — saving food, time, and money.

✨ Features
🍽️ Meal QR Sharing
Upload and share unused meal QR codes.

Browse available QR codes in real-time.

Claim QR codes instantly.

Live status updates: Available → Claimed.

🚗 Travel Sharing
Create travel plans with source, destination, and date.

Find travel companions going your way.

Direct contact options.

Filter by destination or date for quick matches.

👤 User Management
Secure Registration & Login with JWT.

Role-based access: Student / Admin.

Admin panel to monitor users, QR logs, and potential misuse.

🛠 Tech Stack
Frontend

⚛ React 18 – Hooks-based, modern UI.

⚡ Vite – Lightning-fast builds.

🎨 Tailwind CSS – Utility-first styling.

🎯 Lucide React – Elegant, scalable icons.

Backend

🟢 Node.js & Express.js – RESTful API backend.

🍃 MongoDB & Mongoose – NoSQL database modeling.

🔑 JWT – Authentication tokens.

📂 Multer – Image uploads.

🔒 bcryptjs – Secure password hashing.

📂 Project Structure
bash
Copy
Edit
hostelshare/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── services/       # API services
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── controllers/        # Route logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middlewares/        # Auth & validation
│   ├── uploads/            # QR code images
│   ├── package.json
│   └── server.js
└── package.json            # Root package.json
⚡ Getting Started
Prerequisites
Node.js v16+

MongoDB Atlas or local MongoDB

npm or yarn

1️⃣ Clone the Repository
bash
Copy
Edit
git clone <repository-url>
cd hostelshare
2️⃣ Install Dependencies
bash
Copy
Edit
npm run install-all
3️⃣ Environment Setup
Create .env in the server/ directory:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
4️⃣ Start Development Servers
bash
Copy
Edit
npm run dev
Backend → http://localhost:3000

Frontend → http://localhost:5173

🔗 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user

Meal QR
Method	Endpoint	Description
GET	/api/qr/available	Fetch available QRs
POST	/api/qr/donate	Upload new QR code
POST	/api/qr/claim/:id	Claim a QR code

Travel Plans
Method	Endpoint	Description
GET	/api/travel/all	Get all travel plans
POST	/api/travel/create	Create travel plan
GET	/api/travel/match	Search travel plans

Admin (Requires Admin Role)
Method	Endpoint	Description
GET	/api/admin/users	List all users
GET	/api/admin/qrs	View QR logs

🖼 Key Features in Action
🔐 Authentication System – Secure, role-based access.

📸 File Upload System – QR code uploads with validation & static serving.

⚡ Real-Time Updates – Instant status changes and search filters.

📱 Responsive UI – Mobile-first, fluid design with smooth animations.

🤝 Contributing
Fork the repository.

Create a feature branch:

bash
Copy
Edit
git checkout -b feature/amazing-feature
Commit changes:

bash
Copy
Edit
git commit -m "Add some amazing feature"
Push to your branch:

bash
Copy
Edit
git push origin feature/amazing-feature
Open a Pull Request.

📜 License
This project is licensed under the MIT License – see LICENSE for details.

📬 Support
💌 Email: your-email@example.com
🐛 Create an issue in the repository for bug reports & feature requests.
