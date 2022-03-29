import React, { Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom'
import ErrorBoundary from './Core/Components/ErrorBoundry';

import './Core/Contexts/Translate/i18nextInit'
ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
    <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </BrowserRouter>


  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
