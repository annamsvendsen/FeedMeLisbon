const pool = require('../config/db'); // Assuming you have this in your db.js

// Function for calculating average rating for a given restaurant 
async function calculateAverage(restaurantName) {
    const query = `
        SELECT RatingValue
        FROM Rating
        JOIN Restaurant USING (RestaurantID)
        WHERE Name = ?`; 

    try {
        const [rows] = await pool.query(query, [restaurantName]);
        console.log(rows);

        let sum = 0;
        let counter = 0;

        // Calculate the sum and count of ratings
        for (const row of rows) {
            counter += 1;
            sum += row.RatingValue; // Assuming RatingValue is the correct field name
        }

        const average = counter > 0 ? sum / counter : 0; // Handle division by zero
        console.log(`Average rating for ${restaurantName}: ${average.toFixed(1)}`);
        return average;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error; // Propagate the error
    }
}

// Function for adding a new rating (the restaurant must exist in order to add rating)
async function addNewRating(restaurantName, ratingValue) {
    const connection = await pool.getConnection(); // Get a connection from the pool

    try {
        // Step 1: Fetch restaurantID based on the restaurant name
        const selectQuery = `
          SELECT RestaurantID 
          FROM Restaurant 
          WHERE Name = ?`;
        const [rows] = await connection.query(selectQuery, [restaurantName]);
    
        // Check if restaurant exists
        if (rows.length === 0) {
            throw new Error(`Restaurant with name "${restaurantName}" not found.`);
        }
    
        const restaurantID = rows[0].RestaurantID;
    
        // Step 2: Insert the new rating using the fetched restaurantID
        const insertQuery = `
          INSERT INTO Rating (RatingValue, RestaurantID) 
          VALUES (?, ?)`;
        const [result] = await connection.query(insertQuery, [ratingValue, restaurantID]);
    
        console.log(`Rating inserted with ID: ${result.insertId} for restaurant: ${restaurantName}`);
    } catch (error) {
        console.error('Error inserting rating:', error.message);
        throw error; // Re-throw the error to be caught in the router
    } finally {
        // Release the connection back to the pool
        connection.release();
    }
}

module.exports = {
    calculateAverage,
    addNewRating,
};



// // Example usage
// async function main() {

//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'Noramviken123',
//         database: 'feedMe'
//     });

//     const restaurantName = 'RestaurantTwo'; // Replace with actual restaurant name
//     const ratingValue = 4
//     addNewRating(connection, restaurantName, ratingValue)
//     const averageRating = await calculateAverage(connection, restaurantName);
//     console.log(`Average Rating for ${restaurantName}:`, averageRating);

//     await connection.end(); // Close the connection
// }

// main().catch(console.error);

