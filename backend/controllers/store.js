const Rating = require('../models/rating');
const Store = require('../models/store');

exports.getOwnerDashboard = async (req, res) => {
    const ownerId = req.userId;
    try {
        const [storeResult] = await db.execute('SELECT * FROM stores WHERE owner_id = ?', [ownerId]);
        const store = storeResult[0];
        if (!store) {
            return res.status(404).json({ message: 'Store not found for this owner' });
        }

        const ratings = await Rating.getRatingsByStore(store.id);
        const averageRating = await Rating.getAverageRating(store.id);

        res.status(200).json({ store, ratings, averageRating });
    } catch (error) {
        console.error('Error fetching owner dashboard data:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard data' });
    }
};

exports.updatePassword = async (req, res) => {
    const UserController = require('./user');
    return UserController.updatePassword(req, res);
};