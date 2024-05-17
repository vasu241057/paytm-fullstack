# Paytm Clone - Front-End and Back-End

[![Hosted on Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-blue?logo=vercel)](https://paytm-front-end.vercel.app/)

This project is a simplified front-end and back-end implementation of Paytm, a popular digital payments platform in India.

## Live Demo

Experience the Paytm Clone at: https://paytm-front-end.vercel.app/

## Project Structure

* **frontend:** Contains the Next.js-based front-end application.
* **backend:** Houses the Express.js back-end server.

## Technologies Used

### Front-End (frontend)

* **Next.js:** A React framework for building modern web applications.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Axios:** A promise-based HTTP client for API requests.
* **React Toastify:** A library for displaying toast notifications.
* **Zod:** A TypeScript-first schema validation library.

### Back-End (backend)

* **Express.js:** A minimal and flexible web application framework for Node.js.
* **Mongoose:** An elegant MongoDB object modeling for Node.js.
* **JSON Web Token (JWT):** A standard for securely transmitting information between parties as a JSON object.
* **Zod:** A TypeScript-first schema validation library.

## Installation and Setup

### Prerequisites

* Node.js and npm (or yarn) installed
* MongoDB running locally or a MongoDB Atlas account

### Steps

1. **Clone the Repository:**

   ```bash
   git clone repo-link


2. **Install Dependencies:**

   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install   

3. **Set up environment variables:**

   # backend/.env

   ```bash
    MONGODB_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
