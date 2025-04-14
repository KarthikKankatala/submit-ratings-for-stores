const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/stores', userController.getStores);





router.post('/update-password', userController.updatePassword);
router.get('/stores/:id', userController.getStoreDetails);
router.post('/stores/:id/rate', userController.submitRating);

module.exports = router;