import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import store from './redux/store';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <React.StrictMode>
    <App /> 
  </React.StrictMode></BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

/* Provider is a component which is a parent of everything in application, it provides access to all things related to store where we put all the code 
*/

