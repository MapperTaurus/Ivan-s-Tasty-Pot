import React from 'react';
import TopNavigation from './topNavigation';

const home = () => {
  return (
    <div>
      <h1>Welcome to Ivan's Tasty Pot!</h1>
      <p>Explore delicious recipes and satisfy your taste buds.</p>
      <div>
      <TopNavigation /> {/* Render the top navigation component */}
      {/* Rest of the page content */}
    </div>
      <div>
        <img src="https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Recipe 1" />
        <img src="https://images.pexels.com/photos/2454533/pexels-photo-2454533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Recipe 2" />
        <img src="https://images.pexels.com/photos/4827131/pexels-photo-4827131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Recipe 3" />
      </div>
    </div>
  );
};

export default home;
