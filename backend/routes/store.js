const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store');
const { isAuthenticated, authorizeRole } = require('../middlewares/auth');

router.use(isAuthenticated);
router.use(authorizeRole(['owner']));

router.get('/dashboard', storeController.getOwnerDashboard);
router.post('/update-password', storeController.updatePassword);

module.exports = router;