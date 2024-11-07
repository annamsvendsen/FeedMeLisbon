const express = require('express');
const router = express.Router();
const displayController = require('../controllers/displayController');

router.get('/restaurants', displayController.getAllRestaurants); 
router.get('/breakfast', displayController.getBreakfastRestaurants);
router.get('/lunch', displayController.getLunchRestaurants);
router.get('/dinner', displayController.getDinnerRestaurants);
router.get('/dessert', displayController.getDessertRestaurants);

module.exports = router;
