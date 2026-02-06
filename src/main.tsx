import './style.css';

import App from './app/App';
import React from 'react';
import ReactDOM from 'react-dom/client';

document.addEventListener('click', () => {
    document.getElementById('app')!.requestFullscreen();
})

ReactDOM.createRoot(document.getElementById('app')!).render(
    <App />
)