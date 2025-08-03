# Job Tracker Assignment

This is a MERN stack assignment that allows users to track job applications with statuses.

## ✅ Assignment Goals

### 1. Fix Status Display & Persistence

- Debugged incorrect status rendering.
- Ensured status updates are correctly saved to the backend via API.

### 2. Track Job Status History

- Implemented a system to record every status change (timestamped).
- Each update appends to a `history` array in the job document.

### 3. Show History in UI

- Status history is displayed under each job card in reverse chronological order.
- Includes status, timestamp, and optional notes.

---

## 🔧 Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Express.js + MongoDB (native driver)
- **Database:** MongoDB (local)

## Structure

root/
├── backend/     # Express backend with job tracking APIs
├── frontend/    # React app to manage and view job applications
└── README.md

## Status Flow

Applied → Reviewed → Arrivedpplied → Reviewed → Arrived

## ✨ Features

- ✅ Add job with `title`, `company`, and optional `description`
- 🔁 Update job status (in order)
- 🗑️ Delete job
- 📜 View status history with timestamps

## 🚀 Setup Instructions

> Make sure MongoDB is running locally on default port `27017`

### 1. Backend

```bash
cd backend
npm install
node server.js
```

### 2. Frontend

```
cd frontend
npm install 
npm run dev
```

## 🧠 AI Tools Used

* **ChatGPT (GPT-4o)**
  * Helped brainstorm clean status badge styles.
  * Assisted with markdown structure for this README.


## 👨‍💻 Author

Built by Muneeb Peerzade
