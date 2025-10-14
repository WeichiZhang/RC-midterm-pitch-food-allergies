// AllerGenie UI and Recommendation Logic
// This module handles user interface interactions and recipe recommendations

// Global Variables
let selectedAllergens = [];
let selectedDiets = [];
let selectedCuisines = [];

// DOM Elements
let allergenFiltersContainer;
let dietFiltersContainer;
let cuisineFiltersContainer;
let findRecipesButton;
let resetFiltersButton;
let recipesContainer;
let resultsCount;

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Get DOM elements
    allergenFiltersContainer = document.getElementById('allergen-filters');
    dietFiltersContainer = document.getElementById('diet-filters');
    cuisineFiltersContainer = document.getElementById('cuisine-filters');
    findRecipesButton = document.getElementById('find-recipes');
    resetFiltersButton = document.getElementById('reset-filters');
    recipesContainer = document.getElementById('recipes-container');
    resultsCount = document.getElementById('results-count');
    
    // Set up event listeners
    findRecipesButton.addEventListener('click', handleFindRecipes);
    resetFiltersButton.addEventListener('click', handleResetFilters);
    
    // Initialize UI
    populateFilterOptions();
}

function populateFilterOptions() {
    // Populate allergen filters
    const allergens = getAllergensList();
    allergenFiltersContainer.innerHTML = '';
    
    allergens.forEach(allergen => {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `allergen-${allergen.replace(/\s+/g, '-').toLowerCase()}`;
        checkbox.value = allergen;
        checkbox.addEventListener('change', handleAllergenSelection);
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = allergen;
        
        checkboxItem.appendChild(checkbox);
        checkboxItem.appendChild(label);
        allergenFiltersContainer.appendChild(checkboxItem);
    });
    
    // Populate diet filters
    const diets = getDietTypesList();
    dietFiltersContainer.innerHTML = '';
    
    diets.forEach(diet => {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `diet-${diet.replace(/\s+/g, '-').toLowerCase()}`;
        checkbox.value = diet;
        checkbox.addEventListener('change', handleDietSelection);
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = diet;
        
        checkboxItem.appendChild(checkbox);
        checkboxItem.appendChild(label);
        dietFiltersContainer.appendChild(checkboxItem);
    });
    
    // Populate cuisine filters
    const cuisines = getCuisineTypesList();
    cuisineFiltersContainer.innerHTML = '';
    
    cuisines.forEach(cuisine => {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `cuisine-${cuisine.replace(/\s+/g, '-').toLowerCase()}`;
        checkbox.value = cuisine;
        checkbox.addEventListener('change', handleCuisineSelection);
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = cuisine;
        
        checkboxItem.appendChild(checkbox);
        checkboxItem.appendChild(label);
        cuisineFiltersContainer.appendChild(checkboxItem);
    });
}

// Event Handlers
function handleAllergenSelection(event) {
    const allergen = event.target.value;
    
    if (event.target.checked) {
        if (!selectedAllergens.includes(allergen)) {
            selectedAllergens.push(allergen);
        }
    } else {
        selectedAllergens = selectedAllergens.filter(a => a !== allergen);
    }
}

function handleDietSelection(event) {
    const diet = event.target.value;
    
    if (event.target.checked) {
        if (!selectedDiets.includes(diet)) {
            selectedDiets.push(diet);
        }
    } else {
        selectedDiets = selectedDiets.filter(d => d !== diet);
    }
}

function handleCuisineSelection(event) {
    const cuisine = event.target.value;
    
    if (event.target.checked) {
        if (!selectedCuisines.includes(cuisine)) {
            selectedCuisines.push(cuisine);
        }
    } else {
        selectedCuisines = selectedCuisines.filter(c => c !== cuisine);
    }
}

function handleFindRecipes() {
    const filteredRecipes = filterRecipes(selectedAllergens, selectedDiets, selectedCuisines);
    displayRecipes(filteredRecipes);
}

function handleResetFilters() {
    // Clear selected arrays
    selectedAllergens = [];
    selectedDiets = [];
    selectedCuisines = [];
    
    // Uncheck all checkboxes
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset display
    recipesContainer.innerHTML = '';
    resultsCount.textContent = 'Select your preferences and click "Find Recipes"';
}

// Display Functions
function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    
    if (recipes.length === 0) {
        resultsCount.textContent = 'No recipes found matching your criteria. Try adjusting your filters.';
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No matching recipes found. Please try different filter options.';
        recipesContainer.appendChild(noResults);
        return;
    }
    
    resultsCount.textContent = `Found ${recipes.length} recipe${recipes.length !== 1 ? 's' : ''} matching your criteria`;
    
    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipesContainer.appendChild(recipeCard);
    });
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    // Recipe image (placeholder in this implementation)
    const imageDiv = document.createElement('div');
    imageDiv.className = 'recipe-image';
    imageDiv.style.backgroundColor = getRandomColor();
    card.appendChild(imageDiv);
    
    // Recipe content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'recipe-content';
    
    // Recipe title
    const title = document.createElement('h3');
    title.className = 'recipe-title';
    title.textContent = recipe.name;
    contentDiv.appendChild(title);
    
    // Recipe cuisine
    const cuisine = document.createElement('div');
    cuisine.className = 'recipe-cuisine';
    cuisine.textContent = recipe.cuisine;
    contentDiv.appendChild(cuisine);
    
    // Recipe ingredients
    const ingredientsDiv = document.createElement('div');
    ingredientsDiv.className = 'recipe-ingredients';
    
    const ingredientsTitle = document.createElement('h4');
    ingredientsTitle.textContent = 'Ingredients:';
    ingredientsDiv.appendChild(ingredientsTitle);
    
    const ingredientsList = document.createElement('ul');
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    ingredientsDiv.appendChild(ingredientsList);
    contentDiv.appendChild(ingredientsDiv);
    
    // Recipe allergens (if any)
    if (recipe.allergens && recipe.allergens.length > 0 && recipe.allergens[0] !== "None") {
        const allergensDiv = document.createElement('div');
        allergensDiv.className = 'recipe-allergens';
        
        recipe.allergens.forEach(allergen => {
            const tag = document.createElement('span');
            tag.className = 'allergen-tag';
            tag.textContent = allergen;
            allergensDiv.appendChild(tag);
        });
        
        contentDiv.appendChild(allergensDiv);
    }
    
    card.appendChild(contentDiv);
    return card;
}

// Utility Functions
function getRandomColor() {
    const colors = [
        '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', 
        '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
