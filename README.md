# Chattr - Real-time Chatting Application

Chattr is a real-time chatting application built using the **MERN stack** with a modern UI, designed to provide a seamless communication experience. The project features a responsive interface, file sharing, and group messaging capabilities.

## Technologies Used
- **Frontend**: React, Tailwind CSS, Shadcn framework
- **Backend**: Node.js, Express.js, MongoDB
- **Build Tool**: Vite
- **Encryption & Authentication**: JWT tokens, bcrypt.js

## Features
- **Login/Sign Up**: Secure authentication system.
- **Real-time Chat**: Send text messages, images, and files.
- **Group Messaging**: Create channels with groups of people for collective communication.

## Demo
Visit: [Demo Link](#)

### Demo Credentials
- **User 1**
  - Email: `user@gmail.com`
  - Password: `user123`
- **User 2**
  - Email: `user2@gmail.com`
  - Password: `user123`

## How to Set Up the Application

### Prerequisites
- Node.js installed on your system.
- MongoDB instance for database connection.

### Clone the Repository
```bash
git clone https://github.com/damarudhvarma/Chattr.git
cd chattr
```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Create a `.env` file in `client/` and add the following environment variable:
   ```env
   VITE_SERVER_URL="<Your Backend Server URL>"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file in `backend/` and add the following environment variables:
   ```env
   PORT=<Server URL Port>
   JWT_KEY="<Your JWT Secret Key>"
   ORIGIN="<Your Frontend URL>"
   DATABASE_URI="<Your MongoDB URI>"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend server using Nodemon:
   ```bash
   npx nodemon index.js
   ```

### Ready to Use
Once both the frontend and backend servers are running, you can access the application from your browser and start chatting in real-time!

## Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with your changes.

## License
This project is licensed under the [MIT License](LICENSE).

