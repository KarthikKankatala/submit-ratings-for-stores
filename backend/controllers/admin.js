const User = require('../models/user');
const Store = require('../models/store');
const Rating = require('../models/rating');

exports.addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userId = await User.create(name, email, password, role);
        res.status(201).json({ message: 'User added successfully', userId });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Failed to add user' });
    }
};

exports.addStore = async (req, res) => {
    try {
        const { name, address, ownerId } = req.body;
        const storeId = await Store.create(name, address, ownerId);
        res.status(201).json({ message: 'Store added successfully', storeId });
    } catch (error) {
        console.error('Error adding store:', error);
        res.status(500).json({ message: 'Failed to add store' });
    }
};

exports.getDashboardOverview = async (req, res) => {
    try {
        const [userCountResult] = await db.execute('SELECT COUNT(*) AS count FROM users');
        const [storeCountResult] = await db.execute('SELECT COUNT(*) AS count FROM stores');
        const [ratingCountResult] = await db.execute('SELECT COUNT(*) AS count FROM ratings');
        res.status(200).json({
            userCount: userCountResult[0].count,
            storeCount: storeCountResult[0].count,
            ratingCount: ratingCountResult[0].count,
        });
    } catch (error) {
        console.error('Error fetching dashboard overview:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard overview' });
    }
};

exports.getUsers = async (req, res) => {
    const { name, email, role, sortBy, sortOrder } = req.query;
    const filters = { name, email, role };
    const sort = sortBy ? { field: sortBy, order: sortOrder } : {};
    try {
        const users = await User.getAll(filters, sort);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};
exports.getStoresAdmin = async (req, res) => {
    const { name, address, ownerId, sortBy, sortOrder } = req.query;
    const filters = { name, address, ownerId };
    const sort = sortBy ? { field: sortBy, order: sortOrder } : {};
    try {
        const stores = await Store.getAll(filters, sort);
        res.status(200).json(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
        res.status(500).json({ message: 'Failed to fetch stores' });
    }
};

exports.getUserDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const userDetails = await User.getDetailsWithRatings(id);
        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userDetails);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Failed to fetch user details' });
    }
};

exports.getStoreDetailsAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const storeDetails = await Store.getDetailsWithRatings(id);
        if (!storeDetails) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(storeDetails);
    } catch (error) {
        console.error('Error fetching store details:', error);
        res.status(500).json({ message: 'Failed to fetch store details' });
    }
};