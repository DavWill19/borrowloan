import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import {
    Col, Row, FormGroup, Input, Button, Collapse,
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
import { faArrowAltCircleDown, faArrowAltCircleUp, faUserCircle, faClipboardList, faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: localStorage.getItem('username'),

        }

    };
    componentDidMount(e) {
        window.fetch('https://wenventurefeedback.herokuapp.com/borrow', {
            method: 'GET',
            headers: {
                credentials: 'same-origin',
                Accept: "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                mode: 'no-cors',
            },
        })
            .then((result) => {
                return result.json();
            })
            .then((result) => {

                const history = result.filter(history => history.borrowStore === `${this.state.username}` || history.loanStore === `${this.state.username}`);
                this.setState({ history: history })
                const borrowed = history.filter(borrowed => borrowed.borrowStore === `${this.state.username}`);
                this.setState({ borrowed: borrowed })
                const loaned = history.filter(loaned => loaned.loanStore === `${this.state.username}`);
                this.setState({ loaned: loaned })
                console.log('Borrowed:', this.state.borrowed);
                console.log('Loaned:', this.state.loaned);

            })
            .catch((err) => {
                console.error('An error happened', err);
            });
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
                                <Link to="/loan"><NavLink>Loan</NavLink></Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className="activeUnderline" nav caret>
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
                    <h2 className="text-center animate__animated animate__fadeIn" ><FontAwesomeIcon className="mx-auto" icon={faHistory} /> My History</h2>
                    <hr className="display-3" />
                </header>
                <div className="container">
                <Row className="animate__animated animate__fadeIn">
                        <Col>
                        <h3 className="text-center"> Borrowed</h3>
                        <hr />
                            <Borrow borrowed={this.state.borrowed} />
                        </Col>
                        <Col>
                        <h3 className="text-center">Loaned</h3>
                        <hr />
                            <Loan loaned={this.state.loaned} />
                        </Col>
                    </Row>
                </div>
                <footer>
                <p className="text-center mt-5 gray">2021 &copy; DevWilliams Software. All rights reserved.</p>
                </footer>
            </div>
        );
    };
}

function Borrow(props) {
    function returnedItem(time, repaid) {
        if (repaid) {
             { new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(Date.parse(time))) }
        
        } else {
            return null;
        }
    }
    if (props.borrowed) {
        return (
            <div className="container">
                {props.borrowed.slice(0).reverse().map(report => (
                    <div className="p-1">
                    <div  key={report.createdAt}>
                        <div >
                            <h6>{report.store}</h6>
                            <p className="mb-2 text-center text-danger">{report.item} from {report.loanStore}</p>
                            <p className="text-center"> Quantity: </p>
                            <p className="text-center">Case: {report.case}</p>
                            <p className="text-center">Bag: {report.bag}</p>
                            <p className="text-center">Individual: {report.individual}</p>
                            <hr></hr>
                            <p className="text-center redcolor">Acknowledged: {JSON.stringify(report.acknowledged)}</p>
                            <p className="text-center redcolor">Returned: {JSON.stringify(report.repaid)}</p>
                            <p className="text-center">Updated: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit', hour: '2-digit', minute:'2-digit' }).format(new Date(Date.parse(report.updatedAt)))}</p>
                            <hr></hr>
                            <p className="text-center">Borrowed by {report.name} on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit', hour: '2-digit', minute:'2-digit' }).format(new Date(Date.parse(report.createdAt)))}</p>
                        </div>
                    </div>
                    <hr></hr>
                    </div>)
                )}
            </div>
        )
    }
    else {
        return (
            null
        )
    }
}

function Loan(props) {
    function returnedItem(time, repaid) {
        if (repaid) {
           return(time)
        
        } else {
            return null;
        }
    }
    if (props.loaned) {
        return (
            <div className="container">
                {props.loaned.slice(0).reverse().map(report => (

                    <div className="p-1">
                    <div  key={report.createdAt}>
                        <div >
                            <h6>{report.store}</h6>
                            <p className="mb-2 text-center text-danger">{report.item} to {report.borrowStore}</p>
                            <p className="text-center"> Quantity: </p>
                            <p className="text-center">Case: {report.case}</p>
                            <p className="text-center">Bag: {report.bag}</p>
                            <p className="text-center">Individual: {report.individual}</p>
                            <hr></hr>
                            <p className="text-center redcolor">Acknowledged: {JSON.stringify(report.acknowledged)}</p>
                            <p className="text-center redcolor">Returned: {JSON.stringify(report.repaid)}</p>
                            <p className="text-center">Repaid:  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit', hour: '2-digit', minute:'2-digit' }).format(new Date(Date.parse(report.createdAt)))}</p>
                            <hr></hr>
                            <p className="text-center">Loaned by {report.name} on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit', hour: '2-digit', minute:'2-digit' }).format(new Date(Date.parse(report.createdAt)))}</p>
                        </div>
                    </div>
                    <hr></hr>
                    </div>)
                )}
            </div>
        )
    }
    else {
        return (
            null
        )
    }
}



export default withRouter(History);