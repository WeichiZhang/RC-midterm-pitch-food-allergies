// AllerGenie Data Module
// This module handles loading, parsing, and filtering recipe data

// Global Variables
let recipeData = [];
let allergensList = [];
let dietTypesList = [];
let cuisineTypesList = [];

// Data loading and initialization
function loadRecipeData() {
    // In a real application, this would fetch from an API or JSON file
    // For this demo, we'll use a sample dataset based on the Kaggle dataset
    
    recipeData = [
        {
            id: 1,
            name: "Classic Beef Burger",
            cuisine: "American",
            ingredients: ["Ground beef", "Burger buns", "Lettuce", "Tomato", "Cheese", "Onion", "Pickles"],
            allergens: ["Gluten", "Dairy"],
            diet: ["Non-vegetarian"],
            prepTime: 20,
            cookTime: 15,
            instructions: "1. Form beef patties\n2. Grill patties to desired doneness\n3. Toast buns\n4. Assemble burger with toppings",
            image: "burger.jpg"
        },
        {
            id: 2,
            name: "Vegetable Stir Fry",
            cuisine: "Asian",
            ingredients: ["Broccoli", "Carrots", "Bell peppers", "Snow peas", "Soy sauce", "Ginger", "Garlic", "Sesame oil"],
            allergens: ["Soy"],
            diet: ["Vegan", "Vegetarian"],
            prepTime: 15,
            cookTime: 10,
            instructions: "1. Chop vegetables\n2. Heat oil in wok\n3. Stir-fry vegetables until crisp-tender\n4. Add sauce and cook for 1 minute",
            image: "stirfry.jpg"
        },
        {
            id: 3,
            name: "Gluten-Free Pancakes",
            cuisine: "American",
            ingredients: ["Gluten-free flour", "Eggs", "Milk", "Baking powder", "Sugar", "Butter"],
            allergens: ["Dairy", "Eggs"],
            diet: ["Vegetarian"],
            prepTime: 10,
            cookTime: 15,
            instructions: "1. Mix dry ingredients\n2. Add wet ingredients and mix\n3. Cook on griddle until bubbles form\n4. Flip and cook until golden",
            image: "pancakes.jpg"
        },
        {
            id: 4,
            name: "Quinoa Salad",
            cuisine: "Mediterranean",
            ingredients: ["Quinoa", "Cucumber", "Tomato", "Red onion", "Feta cheese", "Olive oil", "Lemon juice", "Herbs"],
            allergens: ["Dairy"],
            diet: ["Vegetarian"],
            prepTime: 15,
            cookTime: 20,
            instructions: "1. Cook quinoa according to package\n2. Chop vegetables\n3. Mix all ingredients with dressing\n4. Chill before serving",
            image: "quinoa.jpg"
        },
        {
            id: 5,
            name: "Grilled Salmon",
            cuisine: "Mediterranean",
            ingredients: ["Salmon fillets", "Lemon", "Olive oil", "Garlic", "Dill", "Salt", "Pepper"],
            allergens: ["Fish"],
            diet: ["Pescatarian", "Non-vegetarian"],
            prepTime: 10,
            cookTime: 15,
            instructions: "1. Season salmon with herbs and spices\n2. Grill for 4-6 minutes per side\n3. Squeeze lemon juice before serving",
            image: "salmon.jpg"
        },
        {
            id: 6,
            name: "Vegan Chocolate Cake",
            cuisine: "Dessert",
            ingredients: ["Flour", "Sugar", "Cocoa powder", "Baking soda", "Vegetable oil", "Vinegar", "Vanilla extract", "Water"],
            allergens: ["Gluten"],
            diet: ["Vegan"],
            prepTime: 15,
            cookTime: 30,
            instructions: "1. Mix dry ingredients\n2. Add wet ingredients and mix\n3. Bake at 350°F for 30 minutes\n4. Cool before serving",
            image: "cake.jpg"
        },
        {
            id: 7,
            name: "Chicken Curry",
            cuisine: "Indian",
            ingredients: ["Chicken", "Onion", "Garlic", "Ginger", "Tomatoes", "Coconut milk", "Spices"],
            allergens: ["Coconut"],
            diet: ["Non-vegetarian"],
            prepTime: 20,
            cookTime: 40,
            instructions: "1. Sauté onions, garlic, and ginger\n2. Add spices and cook until fragrant\n3. Add chicken and brown\n4. Add tomatoes and coconut milk, simmer until cooked",
            image: "curry.jpg"
        },
        {
            id: 8,
            name: "Fruit Smoothie",
            cuisine: "Beverage",
            ingredients: ["Banana", "Strawberries", "Almond milk", "Honey", "Ice"],
            allergens: [],
            diet: ["Vegan", "Vegetarian"],
            prepTime: 5,
            cookTime: 0,
            instructions: "1. Combine all ingredients in blender\n2. Blend until smooth\n3. Serve immediately",
            image: "smoothie.jpg"
        },
        {
            id: 9,
            name: "Asian Chicken Stir Fry",
            cuisine: "Asian",
            ingredients: ["Chicken breast", "Broccoli", "Carrots", "Bell peppers", "Ginger", "Garlic", "Soy sauce", "Sesame oil"],
            allergens: ["Soy"],
            diet: ["Non-vegetarian"],
            prepTime: 15,
            cookTime: 10,
            instructions: "1. Cut chicken into strips\n2. Stir-fry chicken until cooked\n3. Add vegetables and stir-fry until tender\n4. Add sauce and cook for 1 minute",
            image: "chicken-stirfry.jpg"
        },
        {
            id: 10,
            name: "Dairy-Free Pasta",
            cuisine: "Italian",
            ingredients: ["Pasta", "Tomato sauce", "Olive oil", "Garlic", "Basil", "Oregano"],
            allergens: ["Gluten"],
            diet: ["Vegan", "Vegetarian"],
            prepTime: 10,
            cookTime: 15,
            instructions: "1. Cook pasta according to package\n2. Sauté garlic in olive oil\n3. Add tomato sauce and herbs\n4. Combine with pasta and serve",
            image: "pasta.jpg"
        }
    ];

    // Extract unique values for filters
    extractFilterOptions();
}

function extractFilterOptions() {
    // Extract allergens
    const allAllergens = new Set();
    recipeData.forEach(recipe => {
        if (recipe.allergens && recipe.allergens.length > 0) {
            recipe.allergens.forEach(allergen => {
                if (allergen !== "None") {
                    allAllergens.add(allergen);
                }
            });
        }
    });
    allergensList = Array.from(allAllergens).sort();

    // Extract diet types
    const allDiets = new Set();
    recipeData.forEach(recipe => {
        if (recipe.diet && recipe.diet.length > 0) {
            recipe.diet.forEach(diet => {
                allDiets.add(diet);
            });
        }
    });
    dietTypesList = Array.from(allDiets).sort();

    // Extract cuisine types
    const allCuisines = new Set();
    recipeData.forEach(recipe => {
        if (recipe.cuisine) {
            allCuisines.add(recipe.cuisine);
        }
    });
    cuisineTypesList = Array.from(allCuisines).sort();
}

// Data filtering functions - FIXED VERSION
function filterRecipes(selectedAllergens, selectedDiets, selectedCuisines) {
    if (recipeData.length === 0) {
        console.error("No recipe data available");
        return [];
    }

    return recipeData.filter(recipe => {
        // Check allergens - exclude recipes with any selected allergen
        if (selectedAllergens.length > 0) {
            const hasExcludedAllergen = recipe.allergens.some(allergen => 
                selectedAllergens.includes(allergen)
            );
            if (hasExcludedAllergen) return false;
        }

        // Check diets - include only if matches at least one selected diet (if any selected)
        if (selectedDiets.length > 0) {
            const matchesDiet = recipe.diet.some(diet => 
                selectedDiets.includes(diet)
            );
            if (!matchesDiet) return false;
        }

        // Check cuisines - include only if matches at least one selected cuisine (if any selected)
        if (selectedCuisines.length > 0) {
            if (!selectedCuisines.includes(recipe.cuisine)) return false;
        }

        return true;
    });
}

// Data access functions
function getAllergensList() {
    return allergensList;
}

function getDietTypesList() {
    return dietTypesList;
}

function getCuisineTypesList() {
    return cuisineTypesList;
}

function getRecipeById(id) {
    return recipeData.find(recipe => recipe.id === id);
}

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    loadRecipeData();
});
