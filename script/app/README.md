🚀 Project Setup Guide

This guide explains how to run each part of the project: FastAPI script, Laravel API backend, and React frontend.

---

🔹 1. Run the FastAPI Script

1. Open a terminal and navigate to the script folder:

   cd scripts

2. Activate the virtual environment:

   Windows:
   .\venv\Scripts\activate

   Linux/macOS:
   source venv/bin/activate

3. Run the FastAPI app using Uvicorn:

   uvicorn app.main:app --reload --port=8001

---

🔹 2. Run the Laravel API (backend-2)

1. Open a new terminal and go to the Laravel backend folder:

   cd backend-2

2. If migrations don't run automatically, run them manually:

   php artisan migrate

3. Start the Laravel development server:

   php artisan serve

---

🔹 3. Run the React Frontend

1. Open a third terminal and navigate to the frontend folder:

   cd frontend

2. Start the frontend development server:

   npm run dev

---