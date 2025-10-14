// AllerGenie UI with EDA Charts
let selectedAllergens = [];
let selectedDiets = [];
let selectedCuisines = [];
let charts = {};

// Chart instances
let cuisineChart, allergenChart, dietChart;

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing app...");
    initializeApp();
});

function initializeApp() {
    // Get DOM elements
    const allergenFiltersContainer = document.getElementById('allergen-filters');
    const dietFiltersContainer = document.getElementById('diet-filters');
    const cuisineFiltersContainer = document.getElementById('cuisine-filters');
    const findRecipesButton = document.getElementById('find-recipes');
    const resetFiltersButton = document.getElementById('reset-filters');
    const recipesContainer = document.getElementById('recipes-container');
    const resultsCount = document.getElementById('results-count');
    
    // Set up event listeners
    findRecipesButton.addEventListener('click', handleFindRecipes);
    resetFiltersButton.addEventListener('click', handleResetFilters);
    
    // Initialize UI - wait for data to load
    const initInterval = setInterval(() => {
        if (recipeData && recipeData.length > 0) {
            clearInterval(initInterval);
            console.log("Data loaded, populating filters and charts...");
            populateFilterOptions();
            initializeCharts();
        }
    }, 100);
}

function populateFilterOptions() {
    console.log("Populating filter options...");
    populateFilterSection('allergen-filters', getAllergensList(), 'allergen');
    populateFilterSection('diet-filters', getDietTypesList(), 'diet');
    populateFilterSection('cuisine-filters', getCuisineTypesList(), 'cuisine');
}

function populateFilterSection(containerId, items, type) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("Container not found:", containerId);
        return;
    }
    
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
    
    console.log(`Selected ${type}:`, array);
}

function handleFindRecipes() {
    console.log("Finding recipes...");
    const filteredRecipes = filterRecipes(selectedAllergens, selectedDiets, selectedCuisines);
    displayRecipes(filteredRecipes);
    updateCharts(filteredRecipes);
}

function handleResetFilters() {
    console.log("Resetting filters...");
    selectedAllergens = [];
    selectedDiets = [];
    selectedCuisines = [];
    
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    const recipesContainer = document.getElementById('recipes-container');
    const resultsCount = document.getElementById('results-count');
    
    recipesContainer.innerHTML = '';
    resultsCount.textContent = 'Select your preferences and let the magic begin! ✨';
    initializeCharts(); // Reset charts to show full dataset
}

// Chart Functions
function initializeCharts() {
    console.log("Initializing charts with full dataset...");
    createCuisineChart();
    createAllergenChart();
    createDietChart();
}

function updateCharts(filteredRecipes) {
    console.log("Updating charts with filtered data:", filteredRecipes.length, "recipes");
    
    // Destroy existing charts if they exist
    if (cuisineChart) cuisineChart.destroy();
    if (allergenChart) allergenChart.destroy();
    if (dietChart) dietChart.destroy();
    
    createCuisineChart(filteredRecipes);
    createAllergenChart(filteredRecipes);
    createDietChart(filteredRecipes);
}

function createCuisineChart(recipes = recipeData) {
    const ctx = document.getElementById('cuisineChart');
    if (!ctx) {
        console.error("Cuisine chart canvas not found!");
        return;
    }
    
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
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#2D3748',
                        font: {
                            size: 12,
                            family: "'Poppins', sans-serif"
                        }
                    }
                },
                title: {
                    display: false
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

function createAllergenChart(recipes = recipeData) {
    const ctx = document.getElementById('allergenChart');
    if (!ctx) {
        console.error("Allergen chart canvas not found!");
        return;
    }
    
    const distribution = getAllergenDistribution(recipes);
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#A78BFA', '#FF85A1'];
    
    allergenChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(distribution),
            datasets: [{
                label: 'Number of Recipes',
                data: Object.values(distribution),
                backgroundColor: colors,
                borderColor: colors.map(color => color),
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#2D3748',
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#2D3748',
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1000
            }
        }
    });
}

function createDietChart(recipes = recipeData) {
    const ctx = document.getElementById('dietChart');
    if (!ctx) {
        console.error("Diet chart canvas not found!");
        return;
    }
    
    const distribution = getDietDistribution(recipes);
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#A78BFA'];
    
    dietChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(distribution),
            datasets: [{
                data: Object.values(distribution),
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#2D3748',
                        font: {
                            size: 12,
                            family: "'Poppins', sans-serif"
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

// Display Functions
function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container');
    const resultsCount = document.getElementById('results-count');
    
    if (!recipesContainer || !resultsCount) {
        console.error("Results containers not found!");
        return;
    }
    
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
