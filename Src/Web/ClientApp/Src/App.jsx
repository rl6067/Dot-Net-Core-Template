import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Components/Layout.jsx';
import { Home } from './Components/Home.jsx';
import { FetchData } from './Components/FetchData.jsx';
import { Counter } from './Components/Counter.jsx';

export default class App extends Component {

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetchdata' component={FetchData} />
            </Layout>
        );
    }
}
