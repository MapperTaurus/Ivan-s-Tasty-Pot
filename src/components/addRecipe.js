import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore, collection, addDoc } from '../config/firebaseConfig';
import { parse } from 'marked';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebaseConfig';
import TopNav from '../components/topNav';
import TextEditor from '../components/textEditor';
import '../styles/AddRecipe.css';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    steps: '',
    tags: '',
    thumbnail: null,
    gallery: [],
    content_top: '',
    content_bottom: ''
  });

  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false); // New state for toggling content visibility

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
      setLoading(true);

      const tagsArray = recipe.tags.split(',').map((tag) => tag.trim());
      const updatedRecipe = { ...recipe, tags: tagsArray };

      if (recipe.thumbnail) {
        const storageRef = ref(storage, `RecipeThumbnails/${recipe.thumbnail.name}`);
        await uploadBytes(storageRef, recipe.thumbnail);
        const downloadURL = await getDownloadURL(storageRef);
        updatedRecipe.thumbnail = downloadURL;
      }

      const galleryURLs = [];
      for (const file of recipe.gallery) {
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
    } finally {
      setLoading(false);
    }
  };

  const insertText = (tag, target) => {
    const textarea = document.getElementById(target);
    if (!textarea) {
      console.error(`Textarea with ID '${target}' not found`);
      return;
    }

    const { selectionStart, selectionEnd } = textarea;
    const textBefore = textarea.value.substring(0, selectionStart);
    const textAfter = textarea.value.substring(selectionEnd);
    const newText = `${textBefore}${tag}${textAfter}`;

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [target]: newText,
    }));
  };

  const handleToggleChange = () => {
    setShowContent((prevShowContent) => !prevShowContent);
  };

  return (
    <div>
      <TopNav />
      <div className="add_recipe_container">
        <form className="add_recipe_form">
          <label>
            Title:
            <input type="text" name="title" value={recipe.title} onChange={handleInputChange} />
          </label>
          <label>
            Ingredients:
            <TextEditor insertText={insertText} target="ingredients" />
            <textarea
              id="ingredients"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleInputChange}
              rows={10}
            />
            <div dangerouslySetInnerHTML={{ __html: parse(recipe.ingredients) }} />
          </label>
          <label>
            Steps:
            <TextEditor insertText={insertText} target="steps" />
            <textarea
              id="steps"
              name="steps"
              value={recipe.steps}
              onChange={handleInputChange}
              rows={10}
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
            {recipe.gallery.length > 0 && (
              <div>
                {recipe.gallery.length} files uploaded:
                <ul>
                  {recipe.gallery.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </label>  
            <input type="checkbox" id="extra" onChange={handleToggleChange} />
          {showContent && (
            <>
              <label>
                Top Content (optional)
                <TextEditor insertText={insertText} target="content_top" />
                <textarea
                  id="content_top"
                  name="content_top"
                  value={recipe.content_top}
                  onChange={handleInputChange}
                  rows={10}
                />
                <div dangerouslySetInnerHTML={{ __html: parse(recipe.content_top) }} />
              </label>
              <label>
                Bottom Content (optional)
                <TextEditor insertText={insertText} target="content_bottom" />
                <textarea
                  id="content_bottom"
                  name="content_bottom"
                  value={recipe.content_bottom}
                  onChange={handleInputChange}
                  rows={10}
                />
                <div dangerouslySetInnerHTML={{ __html: parse(recipe.content_bottom) }} />
              </label>
            </>
          )}
          <button type="button" className="add_button" onClick={handleAddRecipe} disabled={loading}>
            {loading ? 'Adding...' : 'Add Recipe'}
          </button>
        </form>
        {loading && <div className="loading_spinner"></div>}
      </div>
    </div>
  );
};

export default AddRecipe;
