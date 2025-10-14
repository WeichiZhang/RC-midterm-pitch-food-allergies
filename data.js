// AllerGenie Data Module with Enhanced Analytics
let recipeData = [];
let allergensList = [];
let dietTypesList = [];
let cuisineTypesList = [];

// Enhanced recipe dataset with more variety
function loadRecipeData() {
    recipeData = [
        {
            id: 1,
            name: "Classic Beef Burger 🍔",
            cuisine: "American",
            ingredients: ["Ground beef", "Burger buns", "Lettuce", "Tomato", "Cheese", "Onion", "Pickles"],
            allergens: ["Gluten", "Dairy"],
            diet: ["Non-vegetarian"],
            prepTime: 20,
            cookTime: 15,
            calories: 450,
            rating: 4.5
        },
        {
            id: 2,
            name: "Vegetable Stir Fry 🥘",
            cuisine: "Asian",
            ingredients: ["Broccoli", "Carrots", "Bell peppers", "Snow peas", "Soy sauce", "Ginger", "Garlic", "Sesame oil"],
            allergens: ["Soy"],
            diet: ["Vegan", "Vegetarian"],
            prepTime: 15,
            cookTime: 10,
            calories: 320,
            rating: 4.2
        },
        {
            id: 3,
            name: "Gluten-Free Pancakes 🥞",
            cuisine: "American",
            ingredients: ["Gluten-free flour", "Eggs", "Milk", "Baking powder", "Sugar", "Butter"],
            allergens: ["Dairy", "Eggs"],
            diet: ["Vegetarian"],
            prepTime: 10,
            cookTime: 15,
            calories: 280,
            rating: 4.3
        },
        {
            id: 4,
            name: "Quinoa Salad 🥗",
            cuisine: "Mediterranean",
            ingredients: ["Quinoa", "Cucumber", "Tomato", "Red onion", "Feta cheese", "Olive oil", "Lemon juice", "Herbs"],
            allergens: ["Dairy"],
            diet: ["Vegetarian"],
            prepTime: 15,
            cookTime: 20,
            calories: 380,
            rating: 4.6
        },
        {
            id: 5,
            name: "Grilled Salmon 🐟",
            cuisine: "Mediterranean",
            ingredients: ["Salmon fillets", "Lemon", "Olive oil", "Garlic", "Dill", "Salt", "Pepper"],
            allergens: ["Fish"],
            diet: ["Pescatarian", "Non-vegetarian"],
            prepTime: 10,
            cookTime: 15,
            calories: 420,
            rating: 4.7
        },
        {
            id: 6,
            name: "Vegan Chocolate Cake 🍰",
            cuisine: "Dessert",
            ingredients: ["Flour", "Sugar", "Cocoa powder", "Baking soda", "Vegetable oil", "Vinegar", "Vanilla extract", "Water"],
            allergens: ["Gluten"],
            diet: ["Vegan"],
            prepTime: 15,
            cookTime: 30,
            calories: 320,
            rating: 4.4
        },
        {
            id: 7,
            name: "Chicken Curry 🍛",
            cuisine: "Indian",
            ingredients: ["Chicken", "Onion", "Garlic", "Ginger", "Tomatoes", "Coconut milk", "Spices"],
            allergens: ["Coconut"],
            diet: ["Non-vegetarian"],
            prepTime: 20,
            cookTime: 40,
            calories: 380,
            rating: 4.5
        },
        {
            id: 8,
            name: "Fruit Smoothie 🥤",
            cuisine: "Beverage",
            ingredients: ["Banana", "Strawberries", "Almond milk", "Honey", "Ice"],
            allergens: [],
            diet: ["Vegan", "Vegetarian"],
            prepTime: 5,
            cookTime: 0,
            calories: 180,
            rating: 4.1
        },
        {
            id: 9,
            name: "Asian Chicken Stir Fry 🍲",
            cuisine: "Asian",
            ingredients: ["Chicken breast", "Broccoli", "Carrots", "Bell peppers", "Ginger", "Garlic", "Soy sauce", "Sesame oil"],
            allergens: ["Soy"],
            diet: ["Non-vegetarian"],
            prepTime: 15,
            cookTime: 10,
            calories: 350,
            rating: 4.6
        },
        {
            id: 10,
            name: "Dairy-Free Pasta 🍝",
            cuisine: "Italian",
            ingredients: ["Pasta", "Tomato sauce", "Olive oil", "Garlic", "Basil", "Oregano"],
            allergens: ["Gluten"],
            diet: ["Vegan", "Vegetarian"],
            prepTime: 10,
            cookTime: 15,
            calories: 420,
            rating: 4.3
        },
        {
            id: 11,
            name: "Avocado Toast 🥑",
            cuisine: "American",
            ingredients: ["Bread", "Avocado", "Lemon juice", "Salt", "Pepper", "Red pepper flakes"],
            allergens: ["Gluten"],
            diet: ["Vegan", "Vegetarian"],
            prepTime: 5,
            cookTime: 5,
            calories: 280,
            rating: 4.2
        },
        {
            id: 12,
            name: "Berry Parfait 🍨",
            cuisine: "Dessert",
            ingredients: ["Greek yogurt", "Mixed berries", "Granola", "Honey"],
            allergens: ["Dairy"],
            diet: ["Vegetarian"],
            prepTime: 10,
            cookTime: 0,
            calories: 240,
            rating: 4.4
        }
    ];

    extractFilterOptions();
}

function extractFilterOptions() {
    // Extract allergens
    const allAllergens = new Set();
    recipeData.forEach(recipe => {
        recipe.allergens.forEach(allergen => {
            if (allergen) allAllergens.add(allergen);
        });
    });
    allergensList = Array.from(allAllergens).sort();

    // Extract diet types
    const allDiets = new Set();
    recipeData.forEach(recipe => {
        recipe.diet.forEach(diet => {
            allDiets.add(diet);
        });
    });
    dietTypesList = Array.from(allDiets).sort();

    // Extract cuisine types
    const allCuisines = new Set();
    recipeData.forEach(recipe => {
        if (recipe.cuisine) allCuisines.add(recipe.cuisine);
    });
    cuisineTypesList = Array.from(allCuisines).sort();
}

// Analytics Functions
function getCuisineDistribution(recipes = recipeData) {
    const distribution = {};
    recipes.forEach(recipe => {
        distribution[recipe.cuisine] = (distribution[recipe.cuisine] || 0) + 1;
    });
    return distribution;
}

function getAllergenDistribution(recipes = recipeData) {
    const distribution = {};
    recipes.forEach(recipe => {
        recipe.allergens.forEach(allergen => {
            if (allergen) {
                distribution[allergen] = (distribution[allergen] || 0) + 1;
            }
        });
    });
    return distribution;
}

function getDietDistribution(recipes = recipeData) {
    const distribution = {};
    recipes.forEach(recipe => {
        recipe.diet.forEach(diet => {
            distribution[diet] = (distribution[diet] || 0) + 1;
        });
    });
    return distribution;
}

function getAverageCalories(recipes = recipeData) {
    if (recipes.length === 0) return 0;
    const total = recipes.reduce((sum, recipe) => sum + recipe.calories, 0);
    return Math.round(total / recipes.length);
}

// Filtering function
function filterRecipes(selectedAllergens, selectedDiets, selectedCuisines) {
    return recipeData.filter(recipe => {
        // Check allergens
        if (selectedAllergens.length > 0) {
            const hasExcludedAllergen = recipe.allergens.some(allergen => 
                selectedAllergens.includes(allergen)
            );
            if (hasExcludedAllergen) return false;
        }

        // Check diets
        if (selectedDiets.length > 0) {
            const matchesDiet = recipe.diet.some(diet => 
                selectedDiets.includes(diet)
            );
            if (!matchesDiet) return false;
        }

        // Check cuisines
        if (selectedCuisines.length > 0) {
            if (!selectedCuisines.includes(recipe.cuisine)) return false;
        }

        return true;
    });
}

// Data access functions
function getAllergensList() { return allergensList; }
function getDietTypesList() { return dietTypesList; }
function getCuisineTypesList() { return cuisineTypesList; }
function getRecipeById(id) { return recipeData.find(recipe => recipe.id === id); }

// Initialize
document.addEventListener('DOMContentLoaded', loadRecipeData);
