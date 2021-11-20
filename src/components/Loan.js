import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import {
    Col, Row, FormGroup, Input, Button, Collapse, Form,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Card } from 'react-bootstrap';
import 'animate.css';
import { withRouter, Link } from "react-router-dom";
import { faArrowAltCircleDown, faArrowCircleUp, faUserCircle, faClipboardList, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';






class Loan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: localStorage.getItem('username'),
            isOpen: false,
            store: '',
            item: '',
            name: '',
            case: '',
            bag: '',
            individual: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);


    };
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });

    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleSubmit(e) {

        var templateParams = {
            message: `${this.state.username} loaned ${this.state.item} to ${this.state.store}`,
            borrowStore: `${this.state.store}`,
            name: `${this.state.name}`,
            loanStore: `${this.state.username}`,
            acknowledged: false,
            item: `${this.state.item}`,
            case: `${this.state.case}`,
            bag: `${this.state.bag}`,
            individual: `${this.state.individual}`,
            isVisible: false,

        }

        //   emailjs.send('service_qtwvw1r', 'template_lsafe65', templateParams, api_key)
        //     .then(function (response) {
        //       console.log('SUCCESS!', response.status, response.text);
        //     }, function (error) {
        //       console.log('FAILED...', error);
        //     });

        if (this.state.store && this.state.name && this.state.item) {
            this.setState({
                visible: true,
            });
            setTimeout(() => {
                e.preventDefault();
                window.fetch('https://wenventurefeedback.herokuapp.com/borrow', {
                    method: "POST",
                    headers: {
                        credentials: "same-origin",
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        mode: "cors"
                    },
                    body: JSON.stringify({
                        borrowStore: `${this.state.store}`,
                        name: `${this.state.name}`,
                        loanStore: `${this.state.username}`,
                        acknowledged: false,
                        item: `${this.state.item}`,
                        case: `${this.state.case}`,
                        bag: `${this.state.bag}`,
                        individual: `${this.state.individual}`

                    }),
                }).then(console.log())
                    .then((result) => {
                        return result.json();
                    })
                    .then((result) => {
                        console.log('Form created successfully!', result);
                    })
                    .catch((err) => {
                        console.error('An error happened', err);
                    });
                alert(`You loaned ${this.state.item} to ${this.state.store}`);
                this.props.history.push('/loan');
                window.location.reload();
            }, 650);
        } else {
            alert('Please fill in all fields');
        }
    }

    render() {
        return (
            <div className="container">
                <Navbar sticky-top color="light" light expand="sm" fixed="top">
                    <NavbarBrand >
                        <Link to="/dashboard">
                            <img className="logoSmall text-center animate__animated animate__pulse animate__infinite infinite" alt="wendy" src="../images/wendysLogo.png" />
                        </Link>
                    </NavbarBrand>
                    {/* <NavbarBrand><Link to="/dashboard">Dashboard </Link></NavbarBrand> */}
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/dashboard"><NavLink>Dashboard</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/borrow"><NavLink>Borrow</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/loan"><NavLink className="activeUnderline">Loan</NavLink></Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    My Reports
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <Link to="/mylist">
                                        <DropdownItem>
                                            My List
                                        </DropdownItem>
                                    </Link>
                                    <Link to="/history">
                                        <DropdownItem>
                                            My History
                                        </DropdownItem>
                                    </Link>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <Link to="/">
                                <NavItem>
                                    <NavLink>Logout</NavLink>
                                </NavItem>
                            </Link>
                        </Nav>
                    </Collapse>
                    <div className="text-end">
                        <h5 className="text-right p-3 user gray"><FontAwesomeIcon className="gray" icon={faUserCircle} /> {this.state.username}</h5>
                    </div>
                </Navbar>
                <header>
                    <hr className="display-3" />
                    <h2 className="text-center animate__animated animate__fadeIn" ><FontAwesomeIcon className="gray" icon={faArrowCircleUp} /> Loan</h2>
                    <hr className="display-3" />
                </header>
                <Col className="halfWidth mx-auto shadow animate__animated animate__fadeIn">
                    <FormGroup className="p-2">
                        <Form>
                            <h3 className="text-center">Select location to loan to:</h3>
                            <Col className="mx-auto" xs="12">
                                <Input required onChange={this.handleChange} className="text-center" type="select" name="store" id="Select">
                                    <option value="" disabled selected>Choose a location</option>
                                    <option name="Johnstown" value="Johnstown25">Johnstown</option>
                                    <option name="Somerset" value="Somerset20">Somerset</option>
                                    <option name="Bedford" value="Bedford36">Bedford</option>
                                    <option name="Hollidaysburg" value="Hollidaysburg34">Hollidaysburg</option>
                                    <option name="Altoona-Plank Rd" value="Altoona23">Altoona-Plank Rd</option>
                                    <option name="Altoona-Cricketfield" value="Cricketfield40">Altoona-Cricketfield</option>
                                    <option name="Ebensburg" value="Ebensburg30">Ebensburg</option>
                                    <option name="Clarion" value="Clarion37">Clarion</option>
                                    <option name="Indiana" value="Indiana22">Indiana</option>
                                    <option name="Dubois" value="Dubois21">Dubois</option>
                                    <option name="St-Marys" value="StMarys32">St-Marys</option>
                                    <option name="Punxsutawney" value="Punxy31">Punxsutawney</option>
                                </Input>
                            </Col>
                            <h3 className="text-center">Item being loaned:</h3>
                            <Input required rows="1" type="text" id="item" name="item" placeholder="Enter Item" className="mx-auto text-center"
                                onChange={this.handleChange}
                            />
                            <h3 className="text-center">Enter quantity:</h3>
                            <div className="column">
                                <Row>
                                    <Col>
                                        <Input rows="1" type="text" id="case" name="case" placeholder="Case" className="mx-auto text-center contact"
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                    <Col>
                                        <Input rows="1" type="text" id="case" name="case" placeholder="Bag" className="mx-auto text-center contact"
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                    <Col>
                                        <Input rows="1" type="text" id="case" name="case" placeholder="Individual" className="mx-auto text-center contact"
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Row>
                                <div className="text-center">
                                    <PopUpBox visible={this.state.visible} />
                                </div>
                            </div>
                            <h3 className="text-center">Your name:</h3>
                            <Input required rows="1" type="text" id="name" name="name" placeholder="Please enter your name" className="mx-auto text-center"
                                onChange={this.handleChange}
                            />
                            <div className="text-center p-4">
                                <Button className="mx-auto shadow" color="success" onClick={this.handleSubmit}>Loan Item</Button>
                            </div>
                        </Form>
                    </FormGroup>
                </Col>
                <hr className="display-3" />
                <footer className="mt-5">
                    <p className="text-center mt-5 gray">2021 &copy; DevWilliams Software. All rights reserved.</p>
                </footer>
            </div>
        );
    };
}

function PopUpBox(props) {
    if (!props.visible) {
        return null;
    }

    return (
        <div className="text-center">
            <FontAwesomeIcon className="box animate__animated animate__backOutUp" icon={faBoxOpen} />
        </div>
    )
}

export default withRouter(Loan);