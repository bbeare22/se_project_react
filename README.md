# WTWR (What to Wear?)

A weather-based clothing recommendation web app built with the MERN stack (MongoDB, Express.js, React, Node.js). WTWR helps users decide what to wear based on the current weather conditions and lets them upload, like, and manage their own clothing items.

## Features

✅ View real-time weather and suggested clothing  
✅ Register / Sign in / Sign out  
✅ Secure token-based authentication with JWT  
✅ Add, like, and delete clothing items  
✅ Edit user profile (name and avatar)  
✅ Protected routes for authenticated users  
✅ Responsive design for mobile and desktop

---

## Tech Stack

- **Frontend**: React, CSS, JSX, React Router
- **Backend**: Express.js, Node.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **Weather API**: OpenWeatherMap (for real-time weather data)
- **Other Tools**: Postman (API testing), localStorage, Git, Vite

---

## API Overview

Auth
POST /signup – Register new user

POST /signin – Login

GET /users/me – Get current user

PATCH /users/me – Update profile

Clothing Items
GET /items – All clothing items

POST /items – Add a new item

DELETE /items/:id – Delete item

PUT /items/:id/likes – Like

DELETE /items/:id/likes – Unlike

---

## Author

Brett Beare
Built during the TripleTen Software Engineering Program

---

## Frontend se_project_react

Link: https://github.com/bbeare22/se_project_react

## backend se_projectexpress

Link: https://github.com/bbeare22/se_project_express
