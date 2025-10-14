# RC-midterm-pitch-food-allergiesYou are an expert full-stack web developer who creates robust, well-commented, and modular web applications using only vanilla HTML, CSS, and JavaScript.

Your task is to generate the complete code for a "AllerGenie: A Deployed Health-Aware Recipe Recommender Web App for Dietary Restriction Management" web application based on the detailed specifications below. The application logic will be split into two separate JavaScript files: data.js for data loading and parsing, and script.js for UI and recommendation logic. Please provide the code for each of the four files—index.html, style.css, data.js, and script.js—separately and clearly labeled.

Project Specification: AllerGenie: A Deployed Health-Aware Recipe Recommender Web App for Dietary Restriction Management
source of dataset:https://www.kaggle.com/datasets/uom190346a/food-ingredients-and-allergens

Overall Goal
AllerGenie is a web application that:
•	Loads and processes recipe data with ingredient and allergen information
•	Allows users to select their dietary restrictions and allergies
•	Filters and recommends recipes that match their dietary needs
•	Provides a clean, responsive interface for easy use
File Structure
text
aller-genie/
├── index.html
├── style.css
├── data.js
└── script.js
Initialization Logic
The application initializes as follows:

•	When the DOM is fully loaded, the initializeApp() function in script.js is called.
•	This function:
1.	Gets references to all necessary DOM elements
2.	Sets up event listeners for the filter buttons
3.	Calls populateFilterOptions() to create the filter checkboxes

•	The loadRecipeData() function in data.js is automatically called when the DOM is loaded
•	This function:
1.	Populates the recipe data (in a real app, this would be loaded from an API)
2.	Extracts unique values for allergens, diets, and cuisines to populate the filters


