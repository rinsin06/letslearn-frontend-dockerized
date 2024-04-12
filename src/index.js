import React from 'react';
import ReactDOM from 'react-dom/client';

import { FirebaseContext } from './Context/firebaseContext';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import{Provider} from 'react-redux'
import store from './redux/Store'
import App from './App';
import Context, { AuthContext } from './Context/Context';
import { RecoilRoot } from 'recoil';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RecoilRoot>
     
    <Provider store={store}>
    <FirebaseContext.Provider >
      
    <Context>
    <App />
    </Context>
    </FirebaseContext.Provider>
    </Provider>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

