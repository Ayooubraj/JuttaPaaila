const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const authRoutes = require('./routes/auth');
const protect = require('./middleware/auth');

// Load env vars
dotenv.config();

// Connect to database
const startServer = async () => {
    try {
        await connectDB(); // Connect to MongoDB
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }

    const app = express();

    // CORS configuration - add this before other middleware
    app.use(cors({
        origin: 'http://localhost:3000', // Allow requests from your frontend
        credentials: true // Allow credentials (cookies, authorization headers, etc.)
    }));

    // Other Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use('/uploads', express.static('uploads')); // Serve uploaded files

    // Set up multer for file uploads
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
        }
    });
    const upload = multer({ storage });

    // Product Schema
    const productSchema = new mongoose.Schema({
        name: String,
        category: String,
        price: Number,
        image: String,
    });

    const Product = mongoose.model('Product', productSchema);

    // Admin User Model
    const AdminUser = mongoose.model('AdminUser', new mongoose.Schema({
        email: String,
        password: String,
    }));

    // Add this line before defining your routes
    app.use('/api', (req, res, next) => {
        next();
    });

    // Routes
    app.use('/api/auth', authRoutes);

    app.post('/products', upload.single('image'), async (req, res) => {
        const { name, category, price } = req.body;
        const image = req.file.path; // Get the path of the uploaded image

        const newProduct = new Product({ name, category, price, image });
        await newProduct.save();
        res.status(201).json(newProduct);
    });

    // Get all products
    app.get('/products', async (req, res) => {
        const products = await Product.find();
        res.json(products);
    });

    // Update product route
    app.put('/products/:id', upload.single('image'), async (req, res) => {
        const { id } = req.params;
        const { name, category, price } = req.body;
        const updateData = { name, category, price };

        if (req.file) {
            updateData.image = req.file.path; // Update image if a new one is uploaded
        }

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    });

    // Delete product route
    app.delete('/products/:id', async (req, res) => {
        const { id } = req.params;
        try {
            await Product.findByIdAndDelete(id);
            res.status(204).send(); // No content
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    });

    // Then define your admin login route with the prefix
    app.post('/api/admin/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            const adminUser = await AdminUser.findOne({ email });
            if (!adminUser) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, adminUser.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: adminUser._id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

// Start the server
startServer();

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ayooub.designs@gmail.com', // Your email address (sender)
        pass: '1234567890' // Your app password or regular password
    }
});

// Store the verification codes temporarily
let verificationCodes = {};

// User Registration
authRoutes.post('/register', async (req, res) => {
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

    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes[newUser._id] = verificationCode; // Store the code

    // Send verification code via email to the user's email address
    await transporter.sendMail({
        from: 'ayooub.designs@gmail.com', // Sender's email
        to: email, // This is the user's email address (e.g., 'abc@gmail.com')
        subject: 'Your Verification Code',
        text: `Your verification code is ${verificationCode}`
    });

    res.status(200).json({ message: 'Registration successful, verification code sent to your email', userId: newUser._id });
});

// Login user
authRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ message: 'Login successful', user });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

// Verify the code
authRoutes.post('/verify', async (req, res) => {
    const { userId, code } = req.body;

    if (verificationCodes[userId] && verificationCodes[userId] === code) {
        delete verificationCodes[userId]; // Remove the code after verification
        const token = generateToken(userId);
        res.json({ token });
    } else {
        res.status(400).json({ message: 'Invalid verification code' });
    }
});

// Logout user
authRoutes.post('/logout', async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during logout'
        });
    }
});

// Get user profile
authRoutes.get('/me', protect, async (req, res) => {
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
authRoutes.put('/profile', protect, async (req, res) => {
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
authRoutes.delete('/profile', protect, async (req, res) => {
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