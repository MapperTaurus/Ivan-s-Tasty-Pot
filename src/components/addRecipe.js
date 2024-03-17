import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore, collection, addDoc } from '../config/firebaseConfig';
import { parse } from 'marked'; // Importing specific function from marked
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage-related functions
import { storage } from '../config/firebaseConfig'; // Import storage from firebaseConfig

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    steps: '',
    tags: '',
    thumbnail: null, // New field for thumbnail
    gallery: [], // New field for gallery
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    setRecipe((prevRecipe) => ({ ...prevRecipe, thumbnail: file }));
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    setRecipe((prevRecipe) => ({ ...prevRecipe, gallery: files }));
  };
  

  const handleAddRecipe = async () => {
    try {
      const tagsArray = recipe.tags.split(',').map((tag) => tag.trim());
      const updatedRecipe = { ...recipe, tags: tagsArray };
  
      // Upload thumbnail
      if (recipe.thumbnail) {
        const storageRef = ref(storage, `RecipeThumbnails/${recipe.thumbnail.name}`);
        await uploadBytes(storageRef, recipe.thumbnail);
  
        // Get download URL for thumbnail
        const downloadURL = await getDownloadURL(storageRef);
        updatedRecipe.thumbnail = downloadURL;
      }
  
      // Upload gallery images
      const galleryURLs = [];
      for (const file of recipe.gallery) { // Change galleryFiles to gallery here
        const galleryStorageRef = ref(storage, `RecipeGallery/${file.name}`);
        await uploadBytes(galleryStorageRef, file);
        const galleryDownloadURL = await getDownloadURL(galleryStorageRef);
        galleryURLs.push(galleryDownloadURL);
      }
      updatedRecipe.gallery = galleryURLs;
  
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
          Thumbnail:
          <input type="file" accept="image/*" onChange={handleThumbnailUpload} />
        </label>
        <label>
          Gallery:
          <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
        </label>
        <button type="button" onClick={handleAddRecipe}>
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
