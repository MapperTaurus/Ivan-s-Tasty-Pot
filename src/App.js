import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Recipes from './pages/recipes';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

function App() {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBG30tC0h9ImUZVGIwJHuYAVDyvJS2O4BQ",
    authDomain: "ivan-s-tasty-pot.firebaseapp.com",
    databaseURL: "https://ivan-s-tasty-pot.firebaseio.com",
    projectId: "ivan-s-tasty-pot",
    storageBucket: "ivan-s-tasty-pot.appspot.com",
    messagingSenderId: "957778989336",
    appId: "1:957778989336:web:d371020b2b5e82d5fa4e6d",
    measurementId: "G-7JYHE0XY27"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
      </div>
    </Router>
  );
}

//
export default App;
