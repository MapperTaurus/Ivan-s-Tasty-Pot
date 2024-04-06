// src/pages/Home.js
import React from 'react';
import '../styles/GlobalStyles.css'; 
import TopNav from '../components/topNav';


const About = () => {
  return (
    <div>
          <TopNav />
      <h1>About Me Page Test</h1>
      <p>Test PLACEHOLDER</p>
      <div>
        <img
          src="https://images.pexels.com/photos/16681911/pexels-photo-16681911/free-photo-of-a-ring-tailed-lemur-in-the-zoo.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          alt="Recipe 1"
        />
        {/* Add more images or content as needed */}
      </div>
      <div>
      </div>
    </div>
  );
};

export default About;
