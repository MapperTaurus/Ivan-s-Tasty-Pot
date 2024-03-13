import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore, collection, addDoc } from '../config/firebaseConfig';
import { parse } from 'marked'; // Importing specific function from marked

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    steps: '',
    tags: '',
    images: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleAddRecipe = async () => {
    try {
      const tagsArray = recipe.tags.split(',').map((tag) => tag.trim());
      const updatedRecipe = { ...recipe, tags: tagsArray };

      const recipesCollection = collection(firestore, 'recipes');
      await addDoc(recipesCollection, updatedRecipe);

      navigate('/');
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div>
      <form>
        <label>
          Title:
          <input type="text" name="title" value={recipe.title} onChange={handleInputChange} />
        </label>
        <label>
          Ingredients:
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleInputChange}
          />
          <div dangerouslySetInnerHTML={{ __html: parse(recipe.ingredients) }} />
        </label>
        <label>
          Steps:
          <textarea
            name="steps"
            value={recipe.steps}
            onChange={handleInputChange}
          />
          <div dangerouslySetInnerHTML={{ __html: parse(recipe.steps) }} />
        </label>
        <label>
          Tags:
          <input type="text" name="tags" value={recipe.tags} onChange={handleInputChange} />
        </label>
        <label>
          Images:
          <input type="text" name="images" value={recipe.images} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleAddRecipe}>
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
