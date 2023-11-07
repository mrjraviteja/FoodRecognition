// App.jsx
import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import RecipeSearch from './components/RecipeSearch';
import './App.css';

function App() {
  const [predictedIngredients, setPredictedIngredients] = useState([]);

  return (
    <>
      <h1>Automated Ingredient Recognition & Recipe Recommendation System</h1>
      <ImageUploader onPredictedIngredients={(ingredients) => setPredictedIngredients(ingredients)} />
      <RecipeSearch ingredients={predictedIngredients} />
      <h3>Created as an Academic Major Project. All Copyrights Reserved @ 2023</h3>
      <h4>Credits: M.R.J Ravi Teja, A. Dattasai, N. Vamshi</h4>
    </>
  );
}

export default App;
