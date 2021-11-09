import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Col, Row, FormGroup, Input, Button } from 'reactstrap';
import { Card } from 'react-bootstrap';
import 'animate.css';
import { withRouter } from "react-router-dom";
import { faArrowAltCircleDown, faArrowAltCircleUp, faUserCircle, faClipboardList, faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';






class Borrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: this.props.username,
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
                <div className="text-end">
                    <h5 className="text-right p-3 gray"><FontAwesomeIcon className="gray" icon={faUserCircle} /> {this.state.username}</h5>
                </div>
                <Col onClick={() => {this.props.history.push('/dashboard', { store: this.state.store })}} className="mx-auto text-center" xs="10" lg="6">
                    <img className="logoSmall text-center" alt="wendy" src="../images/wendysLogo.png" />
                </Col>
                <h1 className="display-3 p-1 text-center animate__animated animate__backInDown">Borrow</h1>
                <hr className="display-3" />
                
                <hr className="display-3" />
                <footer>
                    <p className="text-center">2021 &copy; DevWill Design. All rights reserved.</p>
                </footer>
            </div>
        );
    };
}

export default withRouter(Borrow);






{/* <FormGroup className="mx-auto animate__animated animate__fadeIn text-center form-group question contact">
<h5>Contact Information:</h5>
<Input rows="1" type="textarea" id="name" name="name" placeholder="First and Last Name" className="mx-auto text-center contact"
  onChange={props.handleChange}
/>
<Input rows="1" type="textarea" id="phoneEmail" name="phoneEmail" placeholder="Phone or Email" className="mx-auto text-center contact"
  onChange={props.handleChange}
/>
</FormGroup> */}