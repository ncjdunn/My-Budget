import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AutopayBudgetApp from './App';
import { register } from '../serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AutopayBudgetApp />);
register();
