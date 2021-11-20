import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, withRouter

} from "react-router-dom";
import Login from './Login';
import Borrow from './Borrow';
import Loan from './Loan';
import History from './History';
import MyList from './MyList';
import Dashboard from './Dashboard';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Wendys Employee",
            password: "",
            isLoggedIn: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(this.state);
        localStorage.setItem("username", this.state.username);
    }

    handleSubmit(e) {
        e.preventDefault();
        window.fetch("https://wenventurefeedback.herokuapp.com/users/login", {
            method: "POST",
            headers: {
                credentials: "same-origin",
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                mode: "cors"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.log(res);
                    console.log("logged in");
                    this.setState({
                        isLoggedIn: true,
                    });
                    this.props.history.push("/dashboard");
                    window.location.reload();
                } else {
                    console.log("Invalid username or password");

                }
            })
            .catch(err => alert("Invalid username or password"),
                console.log(this.err),
                this.props.history.push("/")
            )
    }

    render() {

        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" >
                            <Login
                                username={this.state.username}
                                password={this.state.password}
                                isLoggedIn={this.state.isLoggedIn}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                            />
                        </Route>
                        <Route exact path="/dashboard" render={() => <Dashboard username={this.state.username} />} />
                        <Route exact path="/borrow" render={() => <Borrow username={this.state.username} />} />
                        <Route exact path="/mylist" render={() => <MyList username={this.state.username} />} />
                        <Route exact path="/history" render={() => <History username={this.state.username} />} />
                        <Route exact path="/loan" render={() => <Loan username={this.state.username} />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default withRouter(Main);