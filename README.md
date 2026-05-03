🐄 QurbaniHat

A modern livestock marketplace for buying and booking Qurbani animals with ease, trust, and transparency.

🚀 Live Demo

👉 Live Site: https://qurbani-hat-zeta.vercel.app/

👉 GitHub Repo: https://github.com/niloypaul07/qurbani-hat

📌 Overview

QurbaniHat is a full-stack style frontend marketplace built with Next.js that allows users to:

Browse livestock animals (cow, goat, sheep)
View detailed animal profiles
Book animals after authentication
Manage user profile
Update personal information

The platform is designed with a modern UI, smooth UX, and responsive layout suitable for all devices.

🧰 Tech Stack
Frontend
⚡ Next.js (App Router)
🎨 Tailwind CSS
⚛️ React.js
UI / UX
🎯 Lucide React Icons
🎞️ Lottie Animations
🌈 Gradient-based modern UI
Auth
🔐 Better Auth
✨ Features
🐄 Core Features
Browse animals by category
Sort animals by price
View detailed animal information
Booking system (form validation included)
👤 Authentication
Email & Password Login
Google Login
Secure session handling
📦 Profile System
User profile dashboard
Update name & profile image
Member since tracking
🎯 UX Features
Loading states
Toast notifications
Fully responsive design
Smooth animations
❌ Extra Features
Custom 404 Not Found page
Protected routes
Mobile-friendly navbar with avatar access
📁 Project Structure
/app
  /animals
  /details-page/[id]
  /login
  /register
  /my-profile
  /update-profile
  /not-found

/components
  Navbar.jsx
  Footer.jsx

/public
  allanimals.json
  avatar.png

/assets
  logo.jpg
🐄 Animal Data Example
{
  "id": 1,
  "name": "Deshi Shahi Cow",
  "type": "Cow",
  "breed": "Local Deshi",
  "price": 120000,
  "weight": 280,
  "age": 3,
  "location": "Bogura",
  "description": "Healthy deshi cow suitable for Qurbani.",
  "image": "https://i.postimg.cc/example.jpg",
  "category": "Large Animal"
}
🧭 Routes
🌍 Public Routes
/ → Home
/animals → All Animals
/login → Login Page
/register → Register Page
🔒 Private Routes
/details-page/[id] → Animal Details + Booking
/my-profile → User Profile
/update-profile → Edit Profile
🔐 Authentication Flow
User registers or logs in
Session is stored via Better Auth
Protected routes require login
Unauthorized users are redirected
⚙️ Installation & Setup
# Clone repo
git clone https://github.com/niloypaul07/qurbani-hat

# Install dependencies
npm install

# Run project
npm run dev
🌐 Environment Variables

Create a .env.local file:

BETTER_AUTH_URL=your_auth_url
BETTER_AUTH_SECRET=your_secret

🚀 Deployment

Recommended platforms:

Vercel


final UI polish & responsiveness
🏆 Challenges Implemented
👤 Profile system with update feature
🔐 Authentication (Google + Email)
🎞️ Lottie loading animation
📱 Fully responsive UI
🎨 Unique gradient-based design system
❌ Custom 404 page
🔒 Protected routes
🎨 UI Design Philosophy
Modern gradient branding
Clean card-based layout
Mobile-first responsiveness
Smooth hover transitions
Minimal but premium look
👨‍💻 Author

Built with ❤️ for assignment submission
QurbaniHat Project

⭐ If You Like This Project

Give it a ⭐ on GitHub and share it!