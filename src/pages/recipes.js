// src/pages/Recipes.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
          <h2>
            <Link
              to={`/recipe/${encodeURIComponent(recipe.title).replace(/\+/g, ' ')}`}
              onClick={() => console.log('Clicked on:', recipe.title)}
            >
              {recipe.title}
            </Link>
          </h2>
          <img
            src={recipe.images}
            alt={`Recipe: ${recipe.title}`}
            style={{ maxWidth: '40%', height: 'auto' }}
          />
        </div>
      ))}

      <TopNavigation />
    </div>
  );
};

export default Recipes;
