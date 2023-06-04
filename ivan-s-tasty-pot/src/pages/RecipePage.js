import React from 'react';

const RecipePage = () => {
  const recipes = [
    { title: 'Recipe 1', description: 'This is a delicious recipe.' },
    { title: 'Recipe 2', description: 'Try this mouthwatering dish.' },
    { title: 'Recipe 3', description: 'A delightful treat for food lovers.' },
  ];

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipePage;
