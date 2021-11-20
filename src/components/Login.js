import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Col, FormGroup, Input, Button, Label } from 'reactstrap';
import 'animate.css';
import { withRouter, Redirect } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            password: this.props.password,
            isLoggedIn: false,
        }
    };


    render() {     
        return (
            <div>
                <Col className="mx-auto text-center" xs="10" lg="6">
                    <img className="logo animate__animated animate__pulse animate__infinite infinite" alt="wendy" src="../images/wendysLogo.jpg" />
                </Col>
                <h1 className="display-3 text-center animate__animated animate__backInRight">Borrow & Loan</h1>
                <hr className="display-3" />
                <h2 className="text-center animate__animated animate__backInLeft" >Login</h2>
                    <hr className="display-3" />
                    <form name='login' className="text-center" onSubmit={this.props.handleSubmit} >
                        <FormGroup className="mx-auto animate__animated animate__fadeIn text-center form-group question contact">
                            <Input rows="1" type="text" id="username" name="username" placeholder="Username" className="mx-auto text-center contact"
                                onChange={this.props.handleChange}
                            />
                            <Input rows="1" type="password" id="password" name="password" placeholder="Password" className="mx-auto text-center contact"
                                onChange={this.props.handleChange}
                            />
                        </FormGroup>
                        
                            <Button className="animate__animated animate__fadeIn" color="danger" type="submit" >Login</Button>
                        
                    </form>
                <h5 className="text-center mb-5">Login with your store name and password</h5>
                <hr className="display-3" />
                <footer className="mt-5">
                    <p className="text-center mt-5 gray">2021 &copy; DevWilliams Software. All rights reserved.</p>
                </footer>
            </div>
        );
    };
}




export default withRouter(Login);