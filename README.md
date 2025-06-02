# Charging Station Management System

A full-stack web application for managing electric vehicle charging stations. Built with Vue.js, Node.js, and MongoDB.

## 🌟 Features

- **Interactive Map View**: View all charging stations on an interactive map
- **Station Management**: Add, edit, and delete charging stations
- **Real-time Status**: Monitor station status (Active/Inactive)
- **Detailed Information**: View power output, connector types, and location details
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Live Demo

Frontend: [https://charging-station-app.vercel.app](https://charging-station-app.vercel.app)
Backend: [https://charging-station-api.onrender.com](https://charging-station-api.onrender.com)

## 🛠️ Tech Stack

### Frontend
- Vue.js 3
- Vite
- Tailwind CSS
- Leaflet.js (for maps)
- Axios
- Vue Router
- Vue Toastification

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose ODM

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/charging-station-app.git
cd charging-station-app
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Create environment files

Frontend (.env):
```env
VITE_API_URL=http://localhost:5000
```

Backend (.env):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🚀 Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Project Structure

```
charging-station-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── router/
│   │   ├── App.vue
│   │   └── main.js
│   ├── public/
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middlewares/
    │   └── server.js
    └── package.json
```

## 🔐 API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Charging Stations
- GET `/api/chargers` - Get all charging stations
- GET `/api/chargers/:id` - Get a specific station
- POST `/api/chargers` - Create a new station
- PUT `/api/chargers/:id` - Update a station
- DELETE `/api/chargers/:id` - Delete a station
- GET `/api/chargers/user` - Get user's stations

## 🎯 Features in Detail

### Map Integration
- Interactive map view using Leaflet.js
- Real-time station location updates
- Click markers for station details
- Direct link to Google Maps

### Station Management
- Add new charging stations with location
- Edit existing station details
- Delete stations
- View station status and specifications

### User Features
- User registration and login
- Personal station management
- Secure authentication with JWT
- Protected routes and API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- OpenStreetMap for map data
- Vue.js team for the amazing framework
- MongoDB for the database solution