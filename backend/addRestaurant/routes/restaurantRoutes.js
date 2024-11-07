const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Define your restaurant routes here
router.post('/restaurants', restaurantController.addNewRestaurant);

module.exports = router;

