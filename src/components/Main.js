import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
import Login from './Login';
// import Borrow from './Borrow'
// import Loan from './Loan'
import Dashboard from './Dashboard'


class Main extends Component {

    render() {

        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route exact path="/dashboard">
                            <Dashboard />
                        </Route>
                        {/* <Route exact path="/borrow">
                            <Borrow />
                        </Route>
                        <Route exact path="/loan">
                            <Loan />
                        </Route> */}
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;