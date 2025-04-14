const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid user' });
        }
        req.user = user; // Attach user object to request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const authorizeRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.userRole)) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

module.exports = { isAuthenticated, authorizeRole };
