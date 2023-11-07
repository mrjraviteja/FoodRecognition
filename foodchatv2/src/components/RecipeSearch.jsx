// Create a new component for RecipeSearch.jsx

// RecipeSearch.jsx
import { useState } from 'react';
import './RecipeSearch.css';

function RecipeSearch({ ingredients }) {
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearchRecipes = async () => {
    // Use the Edamam API to search for recipes based on ingredients
    // Replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your Edamam API credentials
    const edamamAppId = 'f1ff9839';
    const edamamAppKey = 'f5c7415dde7c3ea0d02aca34d213135c';
    const ingredientsQuery = ingredients.join(',');
    console.log(ingredientsQuery);

    const response = await fetch(
      `https://api.edamam.com/search?q=${ingredientsQuery}&app_id=${edamamAppId}&app_key=${edamamAppKey}`
    );
    const data = await response.json();

    // Retrieve and set the recipes
    const newRecipes = data.hits.slice(0, 4); // Limit to 4 recipes for display
    setRecipes(newRecipes);
    setSearched(true);
  };

  return (
    <div>
      {ingredients.length > 0 && (
        <button onClick={handleSearchRecipes}>Search Recipes</button>
      )}
      {searched && (
        <div className="recipe-card-container">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h3>{recipe.recipe.label}</h3>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                Get the full recipe
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeSearch;
