document.addEventListener('DOMContentLoaded', () => {
    // Function to display restaurants in the DOM
    function displayRestaurants(restaurants) {
        const container = document.getElementById('restaurants-container');
        container.innerHTML = '';

        // Loop through the restaurants and create restaurant cards
        restaurants.forEach(restaurant => {
            console.log(restaurant); // Log restaurant object for debugging
            const restaurantCard = `
                <div class="restaurant-card">
                    <h3>${restaurant.Name}</h3>
                    <div class="location-container">
                        <img src="img/map pin.png" class="location-image" alt="Map Pin">
                        <span>${restaurant.Location}</span>
                    </div>
                    <div class="rating-container">
                        <span id="avg-rating-${restaurant.Name}">Rating: </span>
                    </div>
                    <button class="rate-btn" data-restaurant="${restaurant.Name}">Rate</button>
                </div>
            `;
            container.innerHTML += restaurantCard;

            // Fetch the average rating for this restaurant
            fetchAverageRating(restaurant.Name);
        });
    }

    // Function to fetch average rating for a specific restaurant
    async function fetchAverageRating(restaurantName) {
        try {
            const response = await fetch(`http://localhost:3001/api/ratings/average/${restaurantName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(`Average Rating for ${data.restaurant}: ${data.averageRating}`);

            // Update the UI with the average rating
            const ratingElement = document.getElementById(`avg-rating-${restaurantName}`);
            if (ratingElement) {
                ratingElement.innerHTML = `Rating: ${data.averageRating.toFixed(1)}`; // Display with one decimal
            }
        } catch (error) {
            console.error('Error fetching average rating:', error);
        }
    }

    async function handleAddRating(restaurantName) {
        const ratingValue = prompt(`Enter your rating for ${restaurantName} (1-10):`);
        
        if (ratingValue && !isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 10) {
            try {
                const response = await fetch('http://localhost:3001/api/ratings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ restaurantName, ratingValue: Number(ratingValue) })
                });
                
                if (!response.ok) throw new Error('Failed to add rating');
    
                alert('Rating added successfully!');
                await fetchAverageRating(restaurantName); // Refresh the average rating display
    
            } catch (error) {
                console.error('Error adding rating:', error);
            }
        } else {
            alert('Please enter a valid rating between 1 and 10.');
        }
    }

    // Function to reset all buttons' active state
    function resetButtonActiveState() {
        const buttons = document.querySelectorAll('#meal-selection button');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
    }

    // Fetch all restaurants when the "Show All Restaurants" button is clicked
    document.getElementById('all-btn').addEventListener('click', () => {
        fetch('http://localhost:3002/api/restaurants')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('all-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching all restaurants:', err));
    });

    // Fetch breakfast restaurants when the "Breakfast" button is clicked
    document.getElementById('breakfast-btn').addEventListener('click', () => {
        fetch('http://localhost:3002/api/breakfast')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('breakfast-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching breakfast data:', err));
    });

    // Fetch lunch restaurants when the "Brunch" button is clicked
    document.getElementById('lunch-btn').addEventListener('click', () => {
        fetch('http://localhost:3002/api/lunch')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('lunch-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching brunch data:', err));
    });

    // Fetch dinner restaurants when the "Dinner" button is clicked
    document.getElementById('dinner-btn').addEventListener('click', () => {
        fetch('http://localhost:3002/api/dinner')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('dinner-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching dinner data:', err));
    });

    // Fetch dessert restaurants when the "Dessert" button is clicked
    document.getElementById('dessert-btn').addEventListener('click', () => {
        fetch('http://localhost:3002/api/dessert')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('dessert-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching dessert data:', err));
    });

    // Open the modal for adding a new restaurant
    document.getElementById('add-restaurant-btn').addEventListener('click', () => {
        document.getElementById('add-restaurant-modal').style.display = 'block';
    });

    // Close the modal when the close button is clicked
document.getElementById('close-btn').addEventListener('click', () => {
    closeModal();
});    

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('add-restaurant-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Function to close the modal
function closeModal() {
    document.getElementById('add-restaurant-modal').style.display = 'none';
}


    // Function to handle restaurant form submission
    const form = document.getElementById('add-restaurant-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission

            // Get the values from the form
            const name = document.getElementById('restaurant-name').value;
            const location = document.getElementById('restaurant-location').value;
            const type = document.getElementById('restaurant-type').value;

            // Make a POST request to your backend to add the restaurant
            fetch('http://localhost:3004/api/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: name,
                    Location: location,
                    Type: type
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                closeModal(); // Close the modal
                form.reset(); // Reset the form
                fetchAllRestaurants(); // Optionally refresh the restaurant list
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    } else {
        console.error('add-restaurant-form not found');
    }

// Function to open the rating modal
// Function to open the rating modal
function openRatingModal(restaurantName) {
    document.getElementById('restaurant-name2').value = restaurantName; // Set restaurant name in hidden input
    document.getElementById('rating-modal').style.display = 'block'; // Show modal
}

// Close the rating modal when the close button (X) is clicked
document.getElementById('close-rating-modal').addEventListener('click', closeRatingModal);

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('rating-modal');
    if (event.target === modal) {
        closeRatingModal();
    }
});

// Function to close the rating modal
function closeRatingModal() {
    document.getElementById('rating-modal').style.display = 'none'; // Hide modal
}

// Event listener for the rating form submission
document.getElementById('rating-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const restaurantName = document.getElementById('restaurant-name2').value; // Get the restaurant name
    const ratingValue = Number(document.getElementById('rating-value').value); // Get the selected rating value

    // Validate rating value
    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 10) {
        alert('Please enter a valid rating between 1 and 10.');
        return; // Exit if the rating is invalid
    }

    try {
        const response = await fetch('http://localhost:3001/api/ratings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ restaurantName, ratingValue }), // Send restaurant name and rating
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.message); // Log success message
        closeRatingModal(); // Close the modal after submission
        await fetchAverageRating(restaurantName); // Refresh the average rating display
    } catch (error) {
        console.error('Error adding rating:', error);
    }
});

// Example usage of opening the modal (make sure this is linked to your restaurant cards)
document.querySelectorAll('.rate-button').forEach(button => {
    button.addEventListener('click', () => {
        const restaurantName = button.getAttribute('data-restaurant-name');
        openRatingModal(restaurantName);
    });
});



// Example of how to open the modal from the restaurant card
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('rate-btn')) {
        const restaurantName = event.target.getAttribute('data-restaurant');
        openRatingModal(restaurantName); // Open modal with restaurant name
    }
});

// Function to fetch all restaurants (if you want to refresh the list)
function fetchAllRestaurants() {
    fetch('http://localhost:3002/api/restaurants')
        .then(response => response.json())
        .then(data => displayRestaurants(data))
        .catch(err => console.error('Error fetching all restaurants:', err));
}
});
