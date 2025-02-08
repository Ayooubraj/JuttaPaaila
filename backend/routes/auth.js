const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const protect = require('../middleware/auth');

// User Registration
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful', userId: newUser._id });
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ message: 'Login successful', user });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

// Logout user
router.post('/logout', async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});

// Get user profile
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
    const { name, password } = req.body;
    const userId = req.user.id; // Get user ID from the token

    try {
        const updates = {};
        if (name) updates.name = name; // Update name if provided
        if (password) updates.password = await bcrypt.hash(password, 10); // Hash new password

        await User.findByIdAndUpdate(userId, updates, { new: true });
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete user account
router.delete('/profile', protect, async (req, res) => {
    const userId = req.user.id; // Get user ID from the token

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const protect = require('../middleware/auth');

// // User Registration
// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'Registration successful', userId: newUser._id });
// });

// // Login user
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//         const token = generateToken(user._id); // Generate a token for the user
//         res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
//     } else {
//         res.status(400).json({ message: 'Invalid credentials' });
//     }
// });

// // Logout user
// router.post('/logout', async (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: 'Logged out successfully'
//     });
// });

// // Get user profile
// router.get('/me', protect, async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Update user profile
// router.put('/profile', protect, async (req, res) => {
//     const { name, password } = req.body;
//     const userId = req.user.id; // Get user ID from the token

//     try {
//         const updates = {};
//         if (name) updates.name = name; // Update name if provided
//         if (password) updates.password = await bcrypt.hash(password, 10); // Hash new password

//         await User.findByIdAndUpdate(userId, updates, { new: true });
//         res.status(200).json({ message: 'Profile updated successfully' });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Delete user account
// router.delete('/profile', protect, async (req, res) => {
//     const userId = req.user.id; // Get user ID from the token

//     try {
//         await User.findByIdAndDelete(userId);
//         res.status(200).json({ message: 'Account deleted successfully' });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Generate JWT
// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: '30d',
//     });
// };

// module.exports = router;