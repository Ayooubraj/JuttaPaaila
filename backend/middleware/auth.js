const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = protect; 