import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Col, Row, FormGroup, Input, Button } from 'reactstrap';
import { Card } from 'react-bootstrap';
import 'animate.css';
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: this.props.location.state.username,
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

    }


    render() {

        return (
            <div>

                <img className="logoSmall p-3" alt="wendy" src="../images/wendysLogo.png" />
                <p>Welcome {this.state.username}!</p>

                <h1 className="display-3 text-center animate__animated animate__backInRight">Borrow & Loan</h1>
                <hr className="display-3" />
                <h2 className="text-center animate__animated animate__backInLeft" >Dashboard</h2>
                <hr className="display-3" />

                <Row className="p-10">
                    <Col className="p-5">
                        <Card className="bg-light border p-5">
                            <Card.Body>
                                <Card.Title className="text-center">Borrow</Card.Title>
                                <Card.Text>
                                <i className="fal fa-arrow-alt-from-bottom"></i>
                                </Card.Text>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col className="p-5">
                        <Card className="bg-light border p-5">
                            <Card.Body>
                                <Card.Title  className="text-center">Loan</Card.Title>
                                <Card.Text>
                                <i className="fal fa-arrow-alt-from-bottom"></i>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>

                </Row>
            </div>
        );
    };
}




export default withRouter(Dashboard);