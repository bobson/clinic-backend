# 🏥 Clinic Backend

This is the backend for the **Clinic Management App**. It is a Node.js server using **GraphQL**, **Express**, and **MongoDB** (via Mongoose). It supports full CRUD operations for patients and appointments, with relations between them.

---

## 🚀 Tech Stack

- **Node.js**
- **Express**
- **GraphQL (apollo-server-express)**
- **MongoDB + Mongoose**
- **dotenv**

---

## 📦 Features

- Full **CRUD** for Patients
- Full **CRUD** for Appointments
- Each appointment is linked to a patient
- Date handling for appointments
- MongoDB database integration
- Modular GraphQL schema and resolvers

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/clinic-backend.git
cd clinic-backend

```

### 2. Install dependencies

```bash
npm install
```

### 3. Create .env file

```bash
MONGODB_URI=your-mongodb-connection-string
PORT=4000
```

### 4. Run the server

```bash
npm start
```

Server will be running at:
📍 http://localhost:4000/graphql
