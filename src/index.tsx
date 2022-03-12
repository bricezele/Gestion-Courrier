import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './index.scss';
import App from './App';
import './lang/i18n';
import {persistor, store} from "./store";
import * as serviceWorker from "./serviceWorker";
import Loader from "./components/LoaderComponent";
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}
                         loading={<Loader />}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
serviceWorker.unregister();