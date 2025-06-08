# RecallRick Monorepo (Nx)

RecallRick is a fullstack chat and knowledge recall platform designed to facilitate interactive conversations, question answering, and information retrieval. The project features a Node.js/Express backend for chat and bot logic, and an Angular frontend for a modern, responsive user experience. Built as an Nx monorepo, it enables efficient development, code sharing, and scalable deployment for both backend and frontend services.

---

## Project Structure

- **apps/backend**: Node.js/Express backend API
- **apps/recall-rick**: Angular frontend application
- **common/**: Shared utilities and types used by both backend and frontend

---

## How to Run the Project

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### 1. Install dependencies
```sh
npm install
```

### 2. Run the Backend API
The backend provides REST endpoints for chat, message, and bot operations. It connects to a MongoDB database and exposes controllers for handling chat messages and bot logic.

To start the backend server:
```sh
npx nx serve backend
```
- **Main components:**
  - `controllers/`: Handles HTTP requests (e.g., `bot.controller.ts`, `message.controller.ts`)
  - `services/`: Business logic for bots and messages (e.g., `bot.service.ts`, `message.service.ts`)
  - `db/`: MongoDB client and repository for data access
  - `routes/`: Express route definitions
  - `utils/`: Utility functions (e.g., AI client integration)

### 3. Run the Frontend (recall-rick)
The frontend is an Angular application for interacting with the chat and bot features. It communicates with the backend API to send/receive messages and display chat history.

To start the frontend dev server:
```sh
npx nx serve recall-rick
```
- **Main components:**
  - `cmps/`: Angular components for chat UI, message display, user modal, etc.
  - `services/`: Angular services for API calls, user management, chat state, etc.
  - `app.module.ts`: Main Angular module

The app will be available at [http://localhost:4200](http://localhost:4200) by default.

---

## Useful Commands
- **List all Nx projects:**
  ```sh
  npx nx show projects
  ```
---

For more details, see the source code and comments in each app's directory.
