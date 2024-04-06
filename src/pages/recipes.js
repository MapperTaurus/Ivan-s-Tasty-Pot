// src/pages/recipes.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import TopNav from '../components/topNav';
import RecipeCard from '../components/recipeCard'; // Import the RecipeCard component
import '../styles/RecipeCard.css'; // Import the Recipes.css file

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
  }, []);

  return (
    <div>
      <TopNav />
      <div className="recipes_container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            thumbnail={recipe.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;