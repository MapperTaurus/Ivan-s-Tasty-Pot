// src/components/topNav.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/TopNav.css'; // Import CSS for styling

const TopNav = () => {
  const location = useLocation();

  return (
    <div className="top_nav">
  <div className="logo-container">
    <img src="https://cdn-icons-png.flaticon.com/512/0/465.png" alt="Logo" className="logo" />
  </div>
  <nav>
    <ul className="nav_list"> {/* Updated class name for the ul */}
      <li className="nav_item"> {/* Updated class name for the li */}
        <NavLink to="/" className={`nav_button nav_button_round_l ${location.pathname === '/' ? 'active' : ''}`}>
          Home
        </NavLink>
      </li>
      <li className="nav_item"> {/* Updated class name for the li */}
        <NavLink to="/recipes" className={`nav_button ${location.pathname === '/recipes' ? 'active' : ''}`}>
          Recipes
        </NavLink>
      </li>
      <li className="nav_item"> {/* Updated class name for the li */}
        <NavLink to="/add-recipe" className={`nav_button ${location.pathname === '/add-recipe' ? 'active' : ''}`}>
          Add a Recipe
        </NavLink>
      </li>
      <li className="nav_item"> {/* Updated class name for the li */}
        <NavLink to="/about" className={`nav_button nav_button_round_r ${location.pathname === '/about' ? 'active' : ''}`}>
          About Me
        </NavLink>
      </li>
    </ul>
  </nav>
</div>
  );
};

export default TopNav;
