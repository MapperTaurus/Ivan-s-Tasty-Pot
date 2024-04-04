// src/pages/recipes.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import TopNav from '../components/topNav';

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
          <TopNav />
      <h1>Recipes</h1>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>
            <Link
              to={`/recipe/${encodeURIComponent(recipe.title).replace(/\+/g, ' ')}`}
              onClick={() => console.log('Clicked on:', recipe.title)}
            >
              {recipe.title}
            </Link>
          </h2>
          {recipe.thumbnail && (
            <img
              src={recipe.thumbnail}
              alt={`Recipe: ${recipe.title}`}
              style={{ maxWidth: '40%', height: 'auto' }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Recipes;
