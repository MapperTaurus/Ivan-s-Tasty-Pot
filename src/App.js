// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Recipes from './pages/recipes';
import AddRecipe from './components/addRecipe';
import RecipeDetail from './components/recipeDetail'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipe/:recipeName" element={<RecipeDetail />} /> {/* New route */}
      </Routes>
    </Router>
  );
};

export default App;
