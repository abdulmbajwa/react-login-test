import React from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./components/Login";

const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render={(props) => (
        rest.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
    )}/>;
};

const App = props => (
    <Switch>
        <Route exact path="/login" component={Login}/>
        <Layout>
            <Switch>
                <PrivateRoute exact path='/' component={Home}
                              isAuthenticated={props.userAuthentication.isAuthenticated}/>
                <PrivateRoute path='/counter' component={Counter}
                              isAuthenticated={props.userAuthentication.isAuthenticated}/>
            </Switch>
        </Layout>
    </Switch>

);

let mapStateToProps = function (state) {
    return {
        userAuthentication: state.userAuthentication
    }
};

export default withRouter(connect(mapStateToProps, null)(App));