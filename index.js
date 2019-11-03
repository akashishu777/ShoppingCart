import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import App from './components/App.js';
import { Provider } from 'react-redux';

ReactDOM.render(<Provider store={store} >
                    <App />
                </Provider> , document.getElementById('App'));