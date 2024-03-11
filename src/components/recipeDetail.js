// src/components/RecipeDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { recipeName } = useParams();

  // Fetch and display details for the selected recipe
  // ...

  return (
    <div>
      <h1>Recipe Detail: {recipeName}</h1>
      {/* ... (display recipe details) */}
    </div>
  );
};

export default RecipeDetail;
