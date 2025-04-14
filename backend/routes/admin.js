const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { isAuthenticated, authorizeRole } = require('../middlewares/auth');
const { body } = require('express-validator');
const validationMiddleware = require('../middlewares/validation');

router.use(isAuthenticated);
router.use(authorizeRole(['admin']));

router.post(
    '/users',
    [
        body('name')
            .isLength({ min: 2, max: 60 })
            .withMessage('Name must be between 2 and 60 characters'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password')
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters'),
        body('role').optional().isIn(['admin', 'user', 'owner']).withMessage('Invalid role'),
    ],
    validationMiddleware,
    adminController.addUser
);

router.post(
    '/stores',
    [
        body('name')
            .isLength({ min: 2, max: 100 })
            .withMessage('Name must be between 2 and 100 characters'),
        body('address')
            .isLength({ max: 400 })
            .withMessage('Address must be at most 400 characters'),
        body('ownerId').isInt().withMessage('Owner ID must be an integer'),
    ],
    validationMiddleware,
    adminController.addStore
);

router.get('/dashboard', adminController.getDashboardOverview);
router.get('/users', adminController.getUsers);
router.get('/stores', adminController.getStoresAdmin);
router.get('/users/:id', adminController.getUserDetails);
router.get('/stores/:id', adminController.getStoreDetailsAdmin);

module.exports = router;