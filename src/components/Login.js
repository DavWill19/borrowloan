import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Col, FormGroup, Input, Button } from 'reactstrap';
import 'animate.css';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState } from 'react';




class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: "Wendys Employee",
            password: "",
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

    //     fetch("https://wenventurefeedback.herokuapp.com/users/login", {
    //         method: "POST",
    //         headers: {
    //             credentials: 'same-origin',
    //             Accept: "application/json, text/plain, */*",
    //             'Content-Type': 'application/json',
    //             mode: "cors"
    //         },
    //         body: JSON.stringify({
    //             username: this.state.username,
    //             password: this.state.password,
    //         }),
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //             let inMemoryToken = res.token;
    //             if (res.success) {
    //                 localStorage.setItem('token', res.token);
    //                 localStorage.setItem('user', JSON.stringify(res.user));
    //                 console.log(res);
    //                 this.props.history.push('/dashboard');
    //             } else {
    //                 alert("Invalid username or password");
    //             }
    //             console.log(inMemoryToken);
    //             // { Authorization: `Bearer  ${ inMemoryToken }`; }
    //             return inMemoryToken;
    //         })
    //         .catch(err => alert("Invalid username or password"));


    //     console.log(JSON.stringify(this.state));
    this.props.history.push('/dashboard', { username: this.state.username });
    console.log(JSON.stringify(this.state));
    }


    render() {

        return (
            <div>
                <Col className="mx-auto text-center" xs="10" lg="6">
                    <img className="logo animate__animated animate__pulse animate__infinite infinite" alt="wendy" src="../images/wendysLogo.jpg" />
                </Col>
                <h1 className="display-3 text-center animate__animated animate__backInRight">Borrow & Loan</h1>
                <hr className="display-3" />
                <h2 className="text-center animate__animated animate__backInLeft" >Login</h2>
                <p className="lead">
                    <hr className="display-3" />
                    <form name='login' className="text-center" onSubmit={this.handleSubmit} >
                        <FormGroup className="mx-auto animate__animated animate__fadeIn text-center form-group question contact">
                            <Input rows="1" type="text" id="username" name="username" placeholder="Username" className="mx-auto text-center contact"
                                onChange={this.handleChange}
                            />
                            <Input rows="1" type="password" id="password" name="password" placeholder="Password" className="mx-auto text-center contact"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <footer>
                            <Button className="animate__animated animate__fadeIn" color="danger" type="submit" >Login</Button>
                        </footer>
                    </form>
                </p>
                <p className="text-center">Login with your store name and password</p>

            </div>
        );
    };
}




export default withRouter (Login);