// src/components/tagRecipes.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

const TagRecipes = ({ tag }) => {
  const [tagRecipes, setTagRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipesByTag = async () => {
      const recipesCollection = collection(firestore, 'recipes');
      const tagQuery = query(recipesCollection, where('tags', 'array-contains', tag));
      const recipesSnapshot = await getDocs(tagQuery);

      const recipesData = recipesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTagRecipes(recipesData);
    };

    fetchRecipesByTag();
  }, [tag]);

  return (
    <div>
      <h1>Recipes with Tag: {tag}</h1>
      {tagRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>
            <Link to={`/recipe/${encodeURIComponent(recipe.title).replace(/\+/g, ' ')}`}>
              {recipe.title}
            </Link>
          </h2>
          {/* Add other details if needed */}
          <img
            src={recipe.images}
            alt={`Recipe: ${recipe.title}`}
            style={{ maxWidth: '40%', height: 'auto' }}
          />
        </div>
      ))}
    </div>
  );
};

export default TagRecipes;
