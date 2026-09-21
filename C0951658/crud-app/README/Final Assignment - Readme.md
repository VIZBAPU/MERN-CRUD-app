# MERN CRUD application
### Name: Vishwadeepsinh Vaghela
### Student ID: C0951658
### Assignment: Full Stack JavaScript - Final Assignment

## Description
- Using Node.js with Express, Mongoose, REACT and MongoDB create a user website that is a CRUD
Application, and which exposes a REST API. Use your Express Project if you wish to act as the
backend server.

## Key Features
- User Authentication
- User Management
- Display User in Tabular format
- Responsive Design
- RESTful API
- Modern UI

## Technology Used
- React library
- React Router DOM
- Axios to call API
- React Bootstrap
- AG Grid React for data grid
- W3CSS for extra styling

## Backend
- Express.js
- Mongoose
- CORS 
- BodyParser
- PUG

## Database
- MongoDb Atlas
- Mongoose DOM

## Installation
- Node.js
- MongoDB Atlas
  
## Setup for Backend
- Navigate to 'crud-app' using terminal - 'cd crud-app'
- Enter command 'npm install' and then 'npm start'
  
## Setup for Front end
- Navigate to 'client' using terminal
- Enter command 'npm install' and then 'npm start'

http://localhost:3002 Link should be open in your browser

## Application Pages
1. Login page - http://localhost:3002/
   - Type 'admin' and 'password' in Username and Password field to login.
2. User Dashboard - http://localhost:3002/users
   - Displays Users, Total users count and Buttons - to redirect you to edit/delete and add a new user page.
3. Add User - http://localhost:3002/add
   - Fill up the details to create new user
4. Edit User - http://localhost:3002/edit/:id
   - If you want to edit any detail, rewrite the populated data.
   - If you want to delete the user, Delete button is at the bottom

## User schema
- firstName: String,     // Required
- lastName: String,      // Required
- dateOfBirth: Date,     // Required
- email: String,         // Required, Unique
- phoneNumber: String,   // Required
- address1: String,      // Required
- address2: String,      // Optional
- city: String,          // Required
- postalCode: String,    // Required
- country: String,       // Required
- userNotes: String,     // Optional
- timestamps: true       // CreatedAt, UpdatedAt

## Updation from previous assignment
- Adding react in the front end
- Adding RESTful APIs
- Adding user Authentication
- Enhanced UI

## Screenshots
- Login page
- User Dashboard
- Add user page
- Edit/delete user page

## References
- https://www.w3schools.com/w3css/
- https://react.dev/
- Mongoose
- AG Grid React
- React bootstrap
- Express.js