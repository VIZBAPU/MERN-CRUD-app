/*
    Name: Vishwadeepsinh Vaghela
    Student ID: C0951658
    Submission Date: 7 December 2025
    Assignment: CRUD Application using Node.js, Express, Mongoose, REACT and MongoDB
*/

// index.js
// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const cors = require('cors');

// MongoDB connection URI
const uri = "mongodb+srv://crudAppUser:Vishwa250102@crud-cluster.kvts5nk.mongodb.net/?appName=crud-cluster";

// Display text if Connected to MongoDB
console.log('Connecting to the MongoDB...');
mongoose.connect(uri)
.then(() => {
    console.log('MongoDB Connected Successfully!');
    console.log('Database: userdb');
})
.catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
});

// Define User schema
const userSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    address1: {
        type: String,
        required: [true, 'Address line 1 is required'],
        trim: true
    },
    address2: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    postalCode: {
        type: String,
        required: [true, 'Postal code is required'],
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    userNotes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Create User model
const User = mongoose.model('User', userSchema);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//Set up Pug as the engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



// Middleware to parse JSON bodies
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.redirect('/users');
});

// Users routes
app.get('/users', async (req, res) => {
  try {
        // Fetch all users from database, sorted by last name
        const users = await User.find().sort({ lastName: 1 });
        
        // Render the display page with user data
        res.render('display', { 
            title: 'User Management System - All Users',
            users: users 
        });
    } catch (error) {
        // Handle errors
        console.error('Error fetching users:', error);
        res.status(500).render('error', { 
            title: 'Error',
            message: 'Failed to load users' 
        });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        // Fetch all users from database
        const users = await User.find().sort({ lastName: 1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add user form route
app.get('/users/add', (req, res) => {
    res.render('add-user', { 
        title: 'Add New User', 
        user: {} 
    });
});

// Create user route
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect('/users');
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
          const errors = Object.values(error.errors).map(err => err.message);
          res.render('add-user', {
                title: 'Add New User - Error',
                user: req.body,
                errors: errors
            });
        } else if (error.code === 11000) {
            // Handle duplicate email error
            res.render('add-user', {
                title: 'Add New User - Error',
                user: req.body,
                errors: ['Email already exists']
            });
        } else {
            // Handle other errors
          res.status(500).render('error', { 
                title: 'Error',
                message: 'Failed to add user' 
            });
        }
      }
});

// View user details route
app.get('/users/:id', async (req, res) => {
    try {
        // Fetch user by ID
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Edit user form route
app.put('/users/:id', async (req, res) => {
    try {
        // Update user by ID
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        // Return updated user data as JSON
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete user route
app.delete('/users/:id', async (req, res) => {
    try {
        // Delete user by ID
        await User.findByIdAndDelete(req.params.id);

        // Return success message as JSON
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
// Listen on specified PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Database connected successfully ${uri}`);
    console.log(`http://localhost:${PORT}/users to view the user management system.`);
    console.log(`http://localhost:${PORT}/users/add to add a new user.`);
});

// Export the app for testing purposes
module.exports = app;