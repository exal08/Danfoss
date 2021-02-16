import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { CreateHome } from './components/CreateHome';
import { EditHome } from './components/EditHome';
import { Meter } from './components/Meter';
import { Statistician } from './components/Statistician';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home}  />
                <Route exact path='/CreateHome' component={CreateHome} />
                <Route exact path='/EditHome' component={EditHome} />
                <Route exact path='/Meter' component={Meter} />
                <Route exact path='/Statistician' component={Statistician} />
            </Layout>
        );
    }
}
