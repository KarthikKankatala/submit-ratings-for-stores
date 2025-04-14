const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    static async create(name, email, password, role = 'user') {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await db.execute(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                [name, email, hashedPassword, role]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        }
    }

    static async getAll(filters = {}, sort = {}) {
        let query = 'SELECT * FROM users WHERE 1=1';
        const values = [];

        if (filters.name) {
            query += ' AND name LIKE ?';
            values.push(`%${filters.name}%`);
        }
        if (filters.email) {
            query += ' AND email LIKE ?';
            values.push(`%${filters.email}%`);
        }
        if (filters.role) {
            query += ' AND role = ?';
            values.push(filters.role);
        }

        if (sort.field) {
            const direction = sort.order === 'desc' ? 'DESC' : 'ASC';
            query += ` ORDER BY ${sort.field} ${direction}`;
        }

        try {
            const [rows] = await db.execute(query, values);
            return rows;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async updatePassword(userId, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const [result] = await db.execute(
                'UPDATE users SET password = ? WHERE id = ?',
                [hashedPassword, userId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    }

    static async getDetailsWithRatings(userId) {
        try {
            const [user] = await db.execute('SELECT id, name, email, role FROM users WHERE id = ?', [userId]);
            const [ratings] = await db.execute('SELECT s.name AS storeName, r.rating FROM ratings r JOIN stores s ON r.store_id = s.id WHERE r.user_id = ?', [userId]);
            return user[0] ? { ...user[0], ratings } : null;
        } catch (error) {
            console.error('Error fetching user details with ratings:', error);
            throw error;
        }
    }
}

module.exports = User;
