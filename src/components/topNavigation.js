// src/components/topNavigation.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const TopNavigation = () => {
  const location = useLocation();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/recipes" className={location.pathname === '/recipes' ? 'active' : ''}>
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-recipe" className={location.pathname === '/add-recipe' ? 'active' : ''}>
            Add a Recipe
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About Me
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavigation;
