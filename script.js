// AllerGenie UI with EDA Charts
let selectedAllergens = [];
let selectedDiets = [];
let selectedCuisines = [];
let charts = {};

// DOM Elements
let allergenFiltersContainer, dietFiltersContainer, cuisineFiltersContainer;
let findRecipesButton, resetFiltersButton, recipesContainer, resultsCount;

// Chart instances
let cuisineChart, allergenChart, dietChart;

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
    setTimeout(() => {
        populateFilterOptions();
        initializeCharts(); // Initialize charts with full dataset
    }, 100);
}

function populateFilterOptions() {
    populateFilterSection(allergenFiltersContainer, getAllergensList(), 'allergen');
    populateFilterSection(dietFiltersContainer, getDietTypesList(), 'diet');
    populateFilterSection(cuisineFiltersContainer, getCuisineTypesList(), 'cuisine');
}

function populateFilterSection(container, items, type) {
    container.innerHTML = '';
    items.forEach(item => {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `${type}-${item.replace(/\s+/g, '-').toLowerCase()}`;
        checkbox.value = item;
        checkbox.addEventListener('change', (e) => handleFilterSelection(e, type));
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = item;
        
        checkboxItem.appendChild(checkbox);
        checkboxItem.appendChild(label);
        container.appendChild(checkboxItem);
    });
}

function handleFilterSelection(event, type) {
    const value = event.target.value;
    let array;
    
    switch(type) {
        case 'allergen': array = selectedAllergens; break;
        case 'diet': array = selectedDiets; break;
        case 'cuisine': array = selectedCuisines; break;
    }
    
    if (event.target.checked) {
        if (!array.includes(value)) array.push(value);
    } else {
        const index = array.indexOf(value);
        if (index > -1) array.splice(index, 1);
    }
}

function handleFindRecipes() {
    const filteredRecipes = filterRecipes(selectedAllergens, selectedDiets, selectedCuisines);
    displayRecipes(filteredRecipes);
    updateCharts(filteredRecipes);
}

function handleResetFilters() {
    selectedAllergens = [];
    selectedDiets = [];
    selectedCuisines = [];
    
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    recipesContainer.innerHTML = '';
    resultsCount.textContent = 'Select your preferences and let the magic begin! ✨';
    initializeCharts(); // Reset charts to show full dataset
}

// Chart Functions
function initializeCharts() {
    createCuisineChart();
    createAllergenChart();
    createDietChart();
}

function updateCharts(filteredRecipes) {
    if (cuisineChart) cuisineChart.destroy();
    if (allergenChart) allergenChart.destroy();
    if (dietChart) dietChart.destroy();
    
    createCuisineChart(filteredRecipes);
    createAllergenChart(filteredRecipes);
    createDietChart(filteredRecipes);
}

function createCuisineChart(recipes = recipeData) {
    const ctx = document.getElementById('cuisineChart').getContext('2d');
    const distribution = getCuisineDistribution(recipes);
    
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#A78BFA', '#FF85A1', '#118AB2'];
    
    cuisineChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(distribution),
            datasets: [{
                data: Object.values(distribution),
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

function createAllergenChart(recipes = recipeData) {
    const ctx = document.getElementById('allergenChart').getContext('2d');
    const distribution = getAllergenDistribution(recipes);
    
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#A78BFA', '#FF85A1'];
    
    allergenChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(distribution),
            datasets: [{
                label: 'Recipes',
                data: Object.values(distribution),
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#fff'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff'
                    }
                }
            }
        }
    });
}

function createDietChart(recipes = recipeData) {
    const ctx = document.getElementById('dietChart').getContext('2d');
    const distribution = getDietDistribution(recipes);
    
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#A78BFA'];
    
    dietChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: Object.keys(distribution),
            datasets: [{
                data: Object.values(distribution),
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// Display Functions
function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    
    if (recipes.length === 0) {
        resultsCount.textContent = 'No recipes found matching your criteria. Try adjusting your filters.';
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <h3>No recipes found! 🍳</h3>
            <p>Try adjusting your filters to discover more delicious options!</p>
        `;
        recipesContainer.appendChild(noResults);
        return;
    }
    
    resultsCount.textContent = `Found ${recipes.length} delicious recipe${recipes.length !== 1 ? 's' : ''} for you! 🎉`;
    
    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipesContainer.appendChild(recipeCard);
    });
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    const gradientColors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    
    const randomGradient = gradientColors[Math.floor(Math.random() * gradientColors.length)];
    
    card.innerHTML = `
        <div class="recipe-image" style="background: ${randomGradient};">
            <div class="recipe-badge">${recipe.cuisine}</div>
        </div>
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.name}</h3>
            <div class="recipe-meta">
                <div class="meta-item">⏱️ ${recipe.prepTime + recipe.cookTime}min</div>
                <div class="meta-item">🔥 ${recipe.calories} cal</div>
                <div class="meta-item">⭐ ${recipe.rating}</div>
            </div>
            <div class="recipe-ingredients">
                <div class="ingredients-title">📋 Ingredients</div>
                <div class="ingredients-list">
                    ${recipe.ingredients.map(ing => `<div>• ${ing}</div>`).join('')}
                </div>
            </div>
            ${recipe.allergens.length > 0 ? `
                <div class="recipe-allergens">
                    ${recipe.allergens.map(allergen => `<span class="allergen-tag">${allergen}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    return card;
}
