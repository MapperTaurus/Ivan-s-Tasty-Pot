import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { recipeName } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const decodedRecipeName = decodeURIComponent(recipeName).replace(/\+/g, ' ');
      const recipesCollection = collection(firestore, 'recipes');
      const recipeQuery = query(recipesCollection, where('title', '==', decodedRecipeName));
      const recipesSnapshot = await getDocs(recipeQuery);

      if (!recipesSnapshot.empty) {
        const recipeDoc = recipesSnapshot.docs[0];
        setRecipeDetails({
          id: recipeDoc.id,
          ...recipeDoc.data(),
        });
      } else {
        console.error(`Recipe not found for name: ${decodedRecipeName}`);
      }
    };

    fetchRecipeDetails();
  }, [recipeName]);

  return (
    <div>
      {recipeDetails ? (
        <div>
          <h1>Recipe Detail: {recipeDetails.title}</h1>
          <div>
            {recipeDetails.thumbnail && (
              <img
                src={recipeDetails.thumbnail}
                alt={`${recipeDetails.title}`}
                style={{ maxWidth: '60%', height: 'auto' }}
              />
            )}
            {recipeDetails.gallery?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${index + 1}`}
                style={{ maxWidth: '60%', height: 'auto' }}
              />
            ))}
          </div>
          <div dangerouslySetInnerHTML={{ __html: recipeDetails.ingredients }} />
          <div dangerouslySetInnerHTML={{ __html: recipeDetails.steps }} />
          <p>
            Tags: {recipeDetails.tags && recipeDetails.tags.map((tag) => (
              <Link key={tag} to={`/tag/${tag}`}>
                {tag}|
              </Link>
            ))}
          </p>
        </div>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetail;
