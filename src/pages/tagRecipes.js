// src/pages/tagRecipes.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { Link } from 'react-router-dom';

const TagRecipes = () => {
  const { tag } = useParams();
  const [taggedRecipes, setTaggedRecipes] = useState([]);

  useEffect(() => {
    const fetchTaggedRecipes = async () => {
      const recipesCollection = collection(firestore, 'recipes');
      const taggedRecipesQuery = query(recipesCollection, where('tags', 'array-contains', tag));
      const taggedRecipesSnapshot = await getDocs(taggedRecipesQuery);
      const taggedRecipesData = taggedRecipesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTaggedRecipes(taggedRecipesData);
    };

    fetchTaggedRecipes();
  }, [tag]);

  return (
    <div>
      <h1>Recipes with Tag: {tag}</h1>
      {taggedRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>
            <Link to={`/recipe/${encodeURIComponent(recipe.title).replace(/\+/g, ' ')}`}>
              {recipe.title}
            </Link>
          </h2>
          <p>
            Tags: {recipe.tags && recipe.tags.map((tag) => (
              <Link key={tag} to={`/tag/${tag}`}>
                {tag}|
              </Link>
            ))}
          </p>
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
