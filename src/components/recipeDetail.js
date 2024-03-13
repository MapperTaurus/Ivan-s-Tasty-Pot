import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { recipeName } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  console.log('Recipe Name:', recipeName); // Log the recipe name

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      console.log('Decoded Recipe Name:', decodeURIComponent(recipeName).replace(/\+/g, ' '));

      const recipesCollection = collection(firestore, 'recipes');
      const recipeQuery = query(recipesCollection, where('title', '==', decodeURIComponent(recipeName).replace(/\+/g, ' ')));
      const recipesSnapshot = await getDocs(recipeQuery);

      if (!recipesSnapshot.empty) {
        const recipeDoc = recipesSnapshot.docs[0];
        setRecipeDetails({
          id: recipeDoc.id,
          ...recipeDoc.data(),
        });
      } else {
        console.error(`Recipe not found for name: ${decodeURIComponent(recipeName)}`);
      }
    };

    fetchRecipeDetails();
  }, [recipeName]);

  return (
    <div>
      {recipeDetails ? (
        <div>
          <h1>Recipe Detail: {recipeDetails.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: recipeDetails.ingredients }} />
          <div dangerouslySetInnerHTML={{ __html: recipeDetails.steps }} />
          <p>
            Tags: {recipeDetails.tags && recipeDetails.tags.map((tag) => (
              <Link key={tag} to={`/tag/${tag}`}>
                {tag}|
              </Link>
            ))}
          </p>
          <img
            src={recipeDetails.images}
            alt={`Recipe: ${recipeDetails.title}`}
            style={{ maxWidth: '60%', height: 'auto' }}
          />
        </div>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetail;
