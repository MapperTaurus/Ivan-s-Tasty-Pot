// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Recipes from './pages/recipes';
import AddRecipe from './components/addRecipe'; // Import the new component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/add-recipe" element={<AddRecipe />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
