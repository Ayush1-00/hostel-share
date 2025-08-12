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

⚡ Getting Started
Prerequisites
Node.js v16+

MongoDB Atlas or local MongoDB

npm or yarn

1️⃣ Clone the Repository
git clone <repository-url>
cd hostelshare
2️⃣ Install Dependencies
npm run install-all
3️⃣ Environment Setup
Create .env in the server/ directory:

env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
4️⃣ Start Development Servers
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

git checkout -b feature/amazing-feature
Commit changes:

git commit -m "Add some amazing feature"
Push to your branch:

git push origin feature/amazing-feature
Open a Pull Request.

📜 License
This project is licensed under the MIT License – see LICENSE for details.

DEMO ->
<img width="1605" height="901" alt="image" src="https://github.com/user-attachments/assets/280b0ce6-1a48-4704-9037-8e0f89afe649" />
<img width="1660" height="664" alt="image" src="https://github.com/user-attachments/assets/d2ccc82e-62f3-460d-a9fc-0fae5563015d" />
<img width="1668" height="867" alt="image" src="https://github.com/user-attachments/assets/57b36a68-c682-4f8e-b56c-e0a0f2b5f86c" />

📬 Support
💌 Email: khandelwalshivam2004@gmail.com
🐛 Create an issue in the repository for bug reports & feature requests.


