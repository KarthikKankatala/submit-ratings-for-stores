const db = require('../config/db');

class Store {
    static async create(name, address, ownerId) {
        try {
            const [result] = await db.execute(
                'INSERT INTO stores (name, address, owner_id) VALUES (?, ?, ?)',
                [name, address, ownerId]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error creating store:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.execute('SELECT * FROM stores WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error finding store by ID:', error);
            throw error;
        }
    }

    static async getAll(filters = {}, sort = {}) {
        console.log('Inside Store.getAll'); // Added log
        console.log('Filters:', filters);     // Added log
        console.log('Sort:', sort);         // Added log

        let query = 'SELECT * FROM stores WHERE 1=1';
        const values = [];

        if (filters.name) {
            query += ' AND name LIKE ?';
            values.push(`%${filters.name}%`);
        }
        if (filters.address) {
            query += ' AND address LIKE ?';
            values.push(`%${filters.address}%`);
        }
        if (filters.ownerId) {
            query += ' AND owner_id = ?';
            values.push(filters.ownerId);
        }

        if (sort.field) {
            const direction = sort.order === 'desc' ? 'DESC' : 'ASC';
            query += ` ORDER BY ${sort.field} ${direction}`;
        }

        console.log('Executing query:', query); // Added log

        try {
            const [rows] = await db.execute(query, values);
            console.log('Query results:', rows);   // Added log
            return rows;
        } catch (error) {
            console.error('Error fetching stores:', error); // Existing log
            throw error;
        }
    }

    static async update(id, name, address) {
        try {
            const [result] = await db.execute(
                'UPDATE stores SET name = ?, address = ? WHERE id = ?',
                [name, address, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating store:', error);
            throw error;
        }
    }

    static async getDetailsWithRatings(storeId) {
        try {
            const [store] = await db.execute('SELECT id, name, address, owner_id FROM stores WHERE id = ?', [storeId]);
            const [ratings] = await db.execute('SELECT u.name AS userName, r.rating FROM ratings r JOIN users u ON r.user_id = u.id WHERE r.store_id = ?', [storeId]);
            const averageRatingResult = await db.execute('SELECT AVG(rating) AS averageRating FROM ratings WHERE store_id = ?', [storeId]);
            const averageRating = averageRatingResult[0][0]?.averageRating || 0;
            return store[0] ? { ...store[0], ratings, averageRating } : null;
        } catch (error) {
            console.error('Error fetching store details with ratings:', error);
            throw error;
        }
    }
}

module.exports = Store;