import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/topNavigation.css';
import '../styles/colours.css';


const topNavigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/recipes" activeClassName="active">Recipes</NavLink>
        </li>
        <li>
          <NavLink to="/new-recipe" activeClassName="active">Add a Recipe</NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">About Me</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default topNavigation;