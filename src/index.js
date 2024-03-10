import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
import { firestore } from './config/firebaseConfig';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App firestore={firestore} />
  </React.StrictMode>
);
