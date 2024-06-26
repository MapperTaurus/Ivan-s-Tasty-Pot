import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { Link } from 'react-router-dom';
import { tagMapping } from '../components/tagMapping';
import TopNav from '../components/topNav';
import '../styles/RecipeDetail.css';
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

  useEffect(() => {
    const handleClick = (event) => {
      const clickedListItem = event.target.closest('li');
      if (!clickedListItem) return; // If the clicked element is not an <li>, exit
  
      clickedListItem.classList.toggle('selected');
    };
  
    // Add event listener to the document to handle clicks on list items
    document.addEventListener('click', handleClick);
  
    // Cleanup function to remove event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      const clickedListItem = event.target.closest('.ingredient');
      if (!clickedListItem) return; // If the clicked element is not an ingredient, exit
  
      clickedListItem.classList.toggle('selected');
    };
  
    // Add event listener to the document to handle clicks on ingredients
    document.querySelectorAll('.ingredient').forEach((ingredient) => {
      ingredient.addEventListener('click', () => {
        ingredient.classList.toggle('selected');
      });
    });
  
    // Add event listener to the document to handle clicks on list items
    document.addEventListener('click', handleClick);
  
    // Cleanup function to remove event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  
  return (
    <div>
      <TopNav />
      {recipeDetails ? (
        <div>
          <h1>Recipe Detail: {recipeDetails.title}</h1>
            <div className="image_container">
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
            <div className="cards_container">
            <div className="content_top card">
                <div dangerouslySetInnerHTML={{ __html: recipeDetails.content_top }} />
              </div>
              <div className="ingredients card">
              <div className="details_heading">Ingredients</div>
                <div dangerouslySetInnerHTML={{ __html: recipeDetails.ingredients }} />
              </div>
              <div className="steps card">
              <div className="details_heading">Steps</div>
                <div dangerouslySetInnerHTML={{ __html: recipeDetails.steps }} />
              </div>
              <div className="content_bottom card">
                <div dangerouslySetInnerHTML={{ __html: recipeDetails.content_bottom }} />
              </div>
            </div>
          <p>
            Tags: {recipeDetails.tags &&
              recipeDetails.tags.map((tag) => {
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
            <span className="close_button" onClick={closeGallery}>
              <i className="far fa-circle-xmark"></i>
            </span>
            {/* Previous button */}
            <span className="prev_button" onClick={() => navigateGallery('prev')}>
              <i className="fas fa-circle-arrow-left"></i>
            </span>
            {/* Next button */}
            <span className="next_button" onClick={() => navigateGallery('next')}>
              <i className="fas fa-circle-arrow-right"></i>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
