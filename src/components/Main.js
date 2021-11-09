import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Link

} from "react-router-dom";
import Login from './Login';
import Borrow from './Borrow'
// import Loan from './Loan'
// import History from './History'
// import MyList from './MyList'
import Dashboard from './Dashboard'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Wendys Employee",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });

    }
    handleSubmit() {
        console.log(JSON.stringify(this.state));
    }

    render() {

        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Login
                                username={this.state.username}
                                password={this.state.password}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                            />
                        </Route>
                        <Route exact path="/dashboard" render={() => <Dashboard username={this.state.username} />} />
                        <Route exact path="/borrow" render={() => <Borrow username={this.state.username} />} />
                        {/* <Route exact path="/loan">
                            <Loan />
                        </Route>
                        <Route exact path="/mylist">
                            <MyList />
                        </Route>
                        <Route exact path="/history">
                            <History />
                        </Route> */}
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;