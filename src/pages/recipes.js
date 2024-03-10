import React, { useEffect, useState } from 'react';
import TopNavigation from '../components/topNavigation';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesCollection = collection(firestore, 'recipes');
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipesData = recipesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesData);
    };

    fetchRecipes();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          <p>Ingredients: {recipe.ingredients}</p>
          <p>Steps: {recipe.steps}</p>
          <p>Tags: {recipe.tags && Object.values(recipe.tags).join(', ')}</p>
          <img
            src={recipe.images}
            alt={`Recipe: ${recipe.title}`}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      ))}

      <TopNavigation />
    </div>
  );
};

export default Recipes;
