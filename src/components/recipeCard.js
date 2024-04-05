// RecipeCard.js
import React from 'react';

const RecipeCard = ({ title, thumbnail }) => {
    return (
      <div className="recipe-card">
        <a className="recipe-link" href={`/recipe/${encodeURIComponent(title).replace(/\+/g, ' ')}`}>
          <img src={thumbnail} alt={`Thumbnail for ${title}`} />
          <h3>{title}</h3>
        </a>
      </div>
    );
  };
  
  export default RecipeCard;
