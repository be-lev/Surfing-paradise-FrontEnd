import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import store from '../src/Redux/store'
import Layout from './Components/LayoutArea/Layout/Layout';
import { setAuthorizationToken } from './Components/Autharea/Auth/auth';

setAuthorizationToken(sessionStorage.jwtToken)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Layout />
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);
