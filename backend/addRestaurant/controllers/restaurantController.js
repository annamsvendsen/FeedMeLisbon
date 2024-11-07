const pool = require('../config/db'); 

// Add a new restaurant
const addNewRestaurant = async (req, res) => {
    const { Name, Location, Type } = req.body;
    try {
        const query = 'INSERT INTO Restaurant (Name, Location, Type) VALUES (?, ?, ?)';
        await pool.query(query, [Name, Location, Type]);
        res.status(201).json({ message: 'Restaurant added successfully' });
    } catch (error) {
        console.error('Error adding new restaurant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addNewRestaurant,
};
