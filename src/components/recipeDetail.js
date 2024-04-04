import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { Link } from 'react-router-dom';
import '../styles/RecipeDetail.css';
import { tagMapping } from '../components/tagMapping';
import '../styles/TagStyle.css';



const RecipeDetail = () => {
  const { recipeName } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

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

  const openGallery = useCallback((index) => {
    setSelectedImageIndex(index);
    setShowGallery(true);
  }, []);

  const closeGallery = useCallback(() => {
    setShowGallery(false);
  }, []);

  const navigateGallery = useCallback((direction) => {
    const newIndex =
      direction === 'next'
        ? (selectedImageIndex + 1) % recipeDetails.gallery.length
        : (selectedImageIndex - 1 + recipeDetails.gallery.length) % recipeDetails.gallery.length;
    setSelectedImageIndex(newIndex);
  }, [selectedImageIndex, recipeDetails]);

  const handleKeyboardNavigation = useCallback((event) => {
    if (!showGallery) return;
    switch (event.key) {
      case 'ArrowRight':
        navigateGallery('next');
        break;
      case 'ArrowLeft':
        navigateGallery('prev');
        break;
      case 'Escape':
        closeGallery();
        break;
      default:
        break;
    }
  }, [navigateGallery, closeGallery, showGallery]);

  const handleTouchStart = useCallback((event) => {
    setTouchStartX(event.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((event) => {
    setTouchEndX(event.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX && touchEndX) {
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          navigateGallery('prev');
        } else {
          navigateGallery('next');
        }
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  }, [touchStartX, touchEndX, navigateGallery]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardNavigation);
    return () => {
      document.removeEventListener('keydown', handleKeyboardNavigation);
    };
  }, [handleKeyboardNavigation]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

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
            Tags: {recipeDetails.tags && recipeDetails.tags.map((tag) => {
              const tagClassNames = tagMapping[tag] ? tagMapping[tag].join(' ') : 'tag_none';
              return (
                <Link key={tag} to={`/tag/${tag}`}>
                  <span className={`tag_all ${tagClassNames}`}>{tag}</span> {/* Apply the classes */}
                </Link>
              );
            })}
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
