import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { Link } from 'react-router-dom';
import '../styles/RecipeDetail.css';

const RecipeDetail = () => {
  const { recipeName } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

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

  const openGallery = (index) => {
    setSelectedImageIndex(index);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  const navigateGallery = (direction) => {
    const newIndex =
      direction === 'next'
        ? (selectedImageIndex + 1) % recipeDetails.gallery.length
        : (selectedImageIndex - 1 + recipeDetails.gallery.length) % recipeDetails.gallery.length;
    setSelectedImageIndex(newIndex);
  };

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
                style={{ maxWidth: '20%', height: 'auto', cursor: 'pointer' }}
                onClick={() => openGallery(0)}
              />
            )}
            {recipeDetails.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${index + 1}`}
                style={{ display: 'none' }} // Hide gallery images initially
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

      {showGallery && (
        <div className="gallery-overlay" onClick={closeGallery}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={recipeDetails.gallery[selectedImageIndex]}
              alt={`${selectedImageIndex + 1}`}
            />
            {/* Close button */}
            <span className="close-button" onClick={closeGallery}>
              <i className="far fa-circle-xmark"></i>
            </span>
            {/* Previous button */}
            <span className="prev-button" onClick={() => navigateGallery('prev')}>
              <i className="fas fa-circle-arrow-left"></i>
            </span>
            {/* Next button */}
            <span className="next-button" onClick={() => navigateGallery('next')}>
              <i className="fas fa-circle-arrow-right"></i>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
