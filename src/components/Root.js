import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Loadable from 'react-loadable';

import Loader from 'Common/Loader/Loader';
import Header from 'Common/Header/Header';
import Footer from 'Common/Footer/Footer';
import APP_ROUTES from 'Config/appRoutes';


const Genre = Loadable.Map({
    loader: {
        Genre: () => import('./Genre/Genre'),
    },
    render(loaded, props) {
        const Genre = loaded.Genre.default;
        return <Genre {...props} />;
    },
    loading: Loader,
});

const Subgenre = Loadable.Map({
    loader: {
        Subgenre: () => import('./Subgenre/Subgenre'),
    },
    render(loaded, props) {
        const Subgenre = loaded.Subgenre.default;
        return <Subgenre {...props} />;
    },
    loading: Loader,
});

const AddSubgenre = Loadable.Map({
    loader: {
        AddSubgenre: () => import('./AddSubgenre/AddSubgenre'),
    },
    render(loaded, props) {
        const AddSubgenre = loaded.AddSubgenre.default;
        return <AddSubgenre {...props} />;
    },
    loading: Loader,
});

const Information = Loadable.Map({
    loader: {
        Information: () => import('./Information/Information'),
    },
    render(loaded, props) {
        const Information = loaded.Information.default;
        return <Information {...props} />;
    },
    loading: Loader,
});

class Root extends Component {
    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={APP_ROUTES.GENRE} component={Genre} />
                        <Route exact path={APP_ROUTES.SUBGENRE} component={Subgenre} />
                        <Route exact path={APP_ROUTES.ADD_SUBGENRE} component={AddSubgenre} />
                        <Route exact path={APP_ROUTES.INFORMATION} component={Information} />
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default Root;
