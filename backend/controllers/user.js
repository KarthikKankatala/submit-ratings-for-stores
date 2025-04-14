const User = require('../models/user');
const Store = require('../models/store');
const Rating = require('../models/rating');

exports.updatePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const userId = req.userId;
        const updated = await User.updatePassword(userId, newPassword);
        if (updated) {
            res.status(200).json({ message: 'Password updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Failed to update password' });
    }
};

exports.getStores = async (req, res) => {
    const { name, address, sortBy, sortOrder } = req.query;
    const filters = { name, address };
    const sort = sortBy ? { field: sortBy, order: sortOrder } : {};
    try {
        const stores = await Store.getAll(filters, sort);
        res.status(200).json(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
        res.status(500).json({ message: 'Failed to fetch stores' });
    }
};

exports.getStoreDetails = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const storeDetails = await Store.getDetailsWithRatings(id);
        if (!storeDetails) {
            return res.status(404).json({ message: 'Store not found' });
        }
        const userRating = await Rating.getUserRating(userId, id);
        res.status(200).json({ store: storeDetails, userRating:userRating });
    } catch (error) {
        console.error('Error fetching store details:', error);
        res.status(500).json({ message: 'Failed to fetch store details' });
    }
};

exports.submitRating = async (req, res) => {
    const { id: storeId } = req.params;
    const { rating } = req.body;
    const userId = req.userId;
    try {
        await Rating.create(userId, storeId, rating);
        res.status(200).json({ message: 'Rating submitted successfully' });
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ message: 'Failed to submit rating' });
    }
};