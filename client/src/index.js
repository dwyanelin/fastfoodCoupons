// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {register} from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
register();