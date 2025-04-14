// backend/controllers/rating.js
const Rating = require('../models/rating');

exports.getAllRatings = async (req, res) => {
    try {
        // Implement logic to fetch all ratings from the database
        // You might want to add filtering, sorting, and pagination options
        const ratings = await Rating.getAll(); // Assuming you add a static getAll method to the Rating model
        res.status(200).json(ratings);
    } catch (error) {
        console.error('Error fetching all ratings:', error);
        res.status(500).json({ message: 'Failed to fetch ratings' });
    }
};

exports.getRatingById = async (req, res) => {
    const { id } = req.params;
    try {
        // Implement logic to fetch a specific rating by its ID
        const rating = await Rating.findById(id); // Assuming you add a static findById method to the Rating model
        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        res.status(200).json(rating);
    } catch (error) {
        console.error(`Error fetching rating with ID ${id}:`, error);
        res.status(500).json({ message: 'Failed to fetch rating' });
    }
};

exports.deleteRating = async (req, res) => {
    const { id } = req.params;
    try {
        // Implement logic to delete a specific rating by its ID
        const deleted = await Rating.deleteById(id); // Assuming you add a static deleteById method to the Rating model
        if (deleted) {
            res.status(200).json({ message: 'Rating deleted successfully' });
        } else {
            res.status(404).json({ message: 'Rating not found' });
        }
    } catch (error) {
        console.error(`Error deleting rating with ID ${id}:`, error);
        res.status(500).json({ message: 'Failed to delete rating' });
    }
};

// You might not need create and update here as those are handled in the user controller
// for regular users. However, an admin might have different needs.

// Example for admin to update a rating (if needed)
// exports.updateRating = async (req, res) => {
//     const { id } = req.params;
//     const { ratingValue } = req.body;
//     try {
//         const updated = await Rating.update(id, ratingValue); // Assuming you add a static update method to the Rating model
//         if (updated) {
//             res.status(200).json({ message: 'Rating updated successfully' });
//         } else {
//             res.status(404).json({ message: 'Rating not found' });
//         }
//     } catch (error) {
//         console.error(`Error updating rating with ID ${id}:`, error);
//         res.status(500).json({ message: 'Failed to update rating' });
//     }
// };