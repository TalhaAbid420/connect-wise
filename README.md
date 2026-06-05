# ConnectWise — Professional Mentorship Platform

ConnectWise is a professional mentorship platform designed to connect aspiring professionals (Mentees) with experienced industry experts (Mentors) for guided learning, direct chat, and video consultations.

This repository is organized as a monorepo containing both the frontend and backend services:

```text
connect-wise/
├── connect-wise-backend-main/    # Node.js/Express REST API
└── connect-wise-frontend-main/   # React/Vite/Tailwind CSS Web Application
```

---

## 🚀 Key Features

### For Mentees (Users)
*   **Mentor Search & Discovery**: Browse and filter verified mentors by domain, experience, and pricing.
*   **Subscription Plans**: Subscribe to mentors' monthly guidance packages securely via Stripe.
*   **Real-time Chat & Emoji Support**: Message active mentors in real-time.
*   **Video Meetings**: Join video consultation rooms directly from the chat screen.
*   **AI virtual Assistant**: Get instant career suggestions and answers using the built-in Gemini Assistant.
*   **Reviews & Ratings**: Rate mentors and write feedback based on mentorship quality.

### For Mentors
*   **Interactive Onboarding**: Register to become a mentor, configure a professional profile, bio, and monthly fee.
*   **Mentor Dashboard**: Review statistics, monthly earnings, pending requests, and student lists.
*   **Meeting Control**: Initiate video rooms powered by Whereby.
*   **Chats & Assistant**: Direct access to student message channels and the virtual AI assistant.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Radix UI, Framer Motion, Zustand, Axios, React Query |
| **Backend** | Node.js, Express, TypeScript, Passport.js, JWT, Mongoose, Zod |
| **Database** | MongoDB Atlas |
| **APIs & Integrations** | Google Gemini (LangChain), Stripe API, Whereby API, Cloudinary |

---

## ⚙️ Environment Configuration

Before running the application, you need to create environment files for both the frontend and backend.

### 1. Backend Configuration
Create a `.env` file in the `connect-wise-backend-main` directory:
```env
MONGODB_URI="your_mongodb_atlas_connection_string"
JWT_SECRET="your_custom_jwt_secret_key"
FRONTEND_URL="http://localhost:5173"

# Google Gemini AI Key
GOOGLE_API_KEY="your_google_gemini_api_key"

# Stripe Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Services
WHEREBY_API_KEY="your_whereby_developer_token"
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
```

### 2. Frontend Configuration
Ensure `.env.development` exists in `connect-wise-frontend-main` directory:
```env
VITE_COOKIE_NAME="auth"
VITE_BACKEND_URL="http://localhost:3000"
```

---

## 🏃 Getting Started

### Prerequisites
*   Node.js (v18.0.0 or higher)
*   `pnpm` (recommended), `npm`, or `yarn`

### Setup and Seed the Backend
1. Navigate to the backend directory:
   ```bash
   cd connect-wise-backend-main
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the database seed script to populate mock users, mentors, and reviews:
   ```bash
   npx ts-node src/utils/seed.ts
   ```
4. Start the backend development server:
   ```bash
   pnpm dev
   ```
   *The server runs by default on `http://localhost:3000`.*

### Setup and Start the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ../connect-wise-frontend-main
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
   *The client web application runs by default on `http://localhost:5173`.*

---

## 💡 AI Integration Roadmap

We are actively updating ConnectWise to include modern AI-driven features:
*   **AI-Powered Mentor Matching**: Goal-based semantic matching using text embeddings.
*   **AI Resume & Portfolio Critique**: Drag-and-drop resume audits using Gemini Multimodal Vision API.
*   **AI Mock Interviews**: Simulated voice-to-voice and text-to-text interview modules with graded feedback.
*   **AI Meeting Summaries**: Automated action item and brief generation from Whereby session logs.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
