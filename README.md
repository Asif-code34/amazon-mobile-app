# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

https://expo.dev/accounts/asifcode-4334/projects/amazon/builds/e1b16b27-bc0f-4402-97fc-f338e2ab6248

# E-Commerce Mobile App

A full-stack mobile e-commerce application built with **React Native (Expo)**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB Atlas**.

## 🔗 Live Demo

- 🌐 **Web App:** https://asifcode-4334-amazon.expo.app
- 📱 **Android APK:** https://github.com/Asif-code34/amazon-mobile-app/releases/latest
- 🎬 **Backend API:** https://amazon-mobile-app-smy6.onrender.com/health
- 💻 **Source Code:** https://github.com/Asif-code34/amazon-mobile-app

## 🔑 Demo Credentials

Email: demo@example.com  
Password: password123

_(Register a fresh user or use these if the demo account exists)_

## ✨ Features

### Frontend (React Native)

- JWT authentication (register / login / auto-login)
- Persistent cart with Redux + AsyncStorage
- Home with hero carousel, category filters, trending deals
- Product detail with image carousel and ratings
- Multi-step checkout (address → delivery → payment → confirm)
- Address management (add / edit / delete)
- Order history and confirmation
- Profile dashboard with logout
- Custom splash screen and cross-platform layout

### Backend (Node.js + Express)

- Bcrypt password hashing + JWT auth
- Auth middleware protecting all user routes
- Rate limiting on login / register
- Address CRUD operations
- Order creation and history
- Environment validation, 404 handler, global error handler

## 🛠️ Tech Stack

| Layer      | Technologies                                                               |
| ---------- | -------------------------------------------------------------------------- |
| Frontend   | React Native, Expo, React Navigation, Redux Toolkit, Axios, AsyncStorage   |
| Backend    | Node.js, Express, MongoDB Atlas, Mongoose, JWT, Bcrypt, express-rate-limit |
| Deployment | Render (backend), EAS Hosting (web), EAS Build (Android)                   |

## 🚀 Setup

### Backend

```bash
cd api
npm install
cp .env.example .env
# Fill in MONGO_URI and JWT_SECRET
npm run dev
```
