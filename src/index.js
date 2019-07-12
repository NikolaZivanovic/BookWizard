import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import configureStore, {history} from './store/configureStore';
import { initializeEnv } from './config/environment.config';
import {ConnectedRouter} from "react-router-redux";
import Root from "./components/Root";
import Provider from "react-redux/es/components/Provider";
import './styles/styles.scss';
import ajax from 'Util/ajax';


const store = configureStore();

initializeEnv();
ajax.initialize(store.dispatch);
initReactApp();


function initReactApp () {
    render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Root />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );

    if (module.hot) {
        module.hot.accept('./components/Root', () => {
            const NewRoot = require('./components/Root').default;
            render(
                <AppContainer>
                    <Provider store={store}>
                        <ConnectedRouter history={history}>
                            <NewRoot />
                        </ConnectedRouter>
                    </Provider>
                </AppContainer>,
                document.getElementById('app')
            );
        });
    }
}

