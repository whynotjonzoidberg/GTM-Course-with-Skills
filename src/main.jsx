import React from 'react';
import { createRoot } from 'react-dom/client';
import GTMMastery from './GTMMastery.jsx';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GTMMastery />
  </React.StrictMode>
);
