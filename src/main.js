// Entry for Vite dev server. This file is intentionally minimal — import your application's modules here.

import './styles/global.css';

// Dynamically load legacy script (keeps compatibility until refactor)
const legacyScript = document.createElement('script');
legacyScript.src = '/script.js';
legacyScript.defer = true;
document.head.appendChild(legacyScript);

// Placeholder: initialize component wiring when DOM ready
window.addEventListener('DOMContentLoaded', () => {
  // Mount header web component if present
  // future: import('./components/Header.js')
});
