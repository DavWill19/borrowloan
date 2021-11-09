import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Col, FormGroup, Input, Button } from 'reactstrap';
import 'animate.css';
import { withRouter, Link } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
        }
    };


    render() {
        console.log(this.props.username);

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
                    <form name='login' className="text-center" onSubmit={this.props.handleSubmit} >
                        <FormGroup className="mx-auto animate__animated animate__fadeIn text-center form-group question contact">
                            <Input rows="1" type="text" id="username" name="username" placeholder="Username" className="mx-auto text-center contact"
                                onChange={this.props.handleChange}
                            />
                            <Input rows="1" type="password" id="password" name="password" placeholder="Password" className="mx-auto text-center contact"
                                onChange={this.props.handleChange}
                            />
                        </FormGroup>
                        <footer>
                            <Link to={"/dashboard"}>
                                <Button className="animate__animated animate__fadeIn" color="danger" type="submit" >Login</Button>
                            </Link>
                        </footer>
                    </form>
                </p>
                <p className="text-center">Login with your store name and password</p>
            </div>
        );
    };
}




export default withRouter(Login);