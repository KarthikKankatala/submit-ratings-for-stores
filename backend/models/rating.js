const db = require('../config/db');

class Rating {
    static async create(userId, storeId, ratingValue) {
        try {
            const [existingRating] = await db.execute(
                'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
                [userId, storeId]
            );

            if (existingRating.length > 0) {
                const [result] = await db.execute(
                    'UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?',
                    [ratingValue, userId, storeId]
                );
                return result.affectedRows > 0;
            } else {
                const [result] = await db.execute(
                    'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
                    [userId, storeId, ratingValue]
                );
                return result.insertId;
            }
        } catch (error) {
            console.error('Error submitting/updating rating:', error);
            throw error;
        }
    }

    static async getAverageRating(storeId) {
        try {
            const [rows] = await db.execute(
                'SELECT AVG(rating) AS averageRating FROM ratings WHERE store_id = ?',
                [storeId]
            );
            return rows[0]?.averageRating || 0;
        } catch (error) {
            console.error('Error getting average rating:', error);
            throw error;
        }
    }

    static async getUserRating(userId, storeId) {
        try {
            const [rows] = await db.execute(
                'SELECT rating FROM ratings WHERE user_id = ? AND store_id = ?',
                [userId, storeId]
            );
            return rows[0]?.rating;
        } catch (error) {
            console.error('Error getting user rating:', error);
            throw error;
        }
    }

    static async getRatingsByStore(storeId) {
        try {
            const [rows] = await db.execute(
                'SELECT r.rating, u.name AS userName, u.id AS userId FROM ratings r JOIN users u ON r.user_id = u.id WHERE r.store_id = ?',
                [storeId]
            );
            return rows;
        } catch (error) {
            console.error('Error getting ratings by store:', error);
            throw error;
        }
    }
}

module.exports = Rating;