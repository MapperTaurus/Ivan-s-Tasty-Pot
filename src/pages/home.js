// src/pages/Home.js
import React from 'react';
import '../styles/GlobalStyles.css'; 
import TopNav from '../components/topNav';


const Home = () => {
  return (
    <div>
          <TopNav />
      <h1>Welcome to Ivan's Tasty Pot!</h1>
      <p>Explore delicious recipes and satisfy your taste buds.</p>
      <div>
        <img
          src="https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Recipe 1"
        />
        {/* Add more images or content as needed */}
      </div>
      <div>
      </div>
    </div>
  );
};

export default Home;
