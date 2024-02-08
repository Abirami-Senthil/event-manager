import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container);

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});