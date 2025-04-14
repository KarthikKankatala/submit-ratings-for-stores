const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const validationMiddleware = require('../middlewares/validation');

router.post(
    '/signup',
    [
        body('name')
            .isLength({ min: 2, max: 60 })
            .withMessage('Name must be between 2 and 60 characters'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password')
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters'),
    ],
    validationMiddleware,
    authController.signup
);

router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
