import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App'


const rootElement = document.getElementById('root');
if (rootElement) {
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
); 
}
