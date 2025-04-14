const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRole } = require('../middlewares/auth');
const ratingController = require('../controllers/rating'); // Import if you add functions here

router.use(isAuthenticated);
router.use(authorizeRole(['admin']));

// Example: Route to get all ratings (admin only) - Implement in controller if needed
// router.get('/', ratingController.getAllRatings);

module.exports = router;