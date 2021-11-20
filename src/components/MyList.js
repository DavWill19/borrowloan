import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import {
    Col, Row, Button, Collapse,
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
import 'animate.css';
import { withRouter, Link } from "react-router-dom";
import { faUserCircle, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';





class MyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem('username'),
            isOpen: false,
            history: [],
            borrowed: [],
            loaned: [],
            historyOfBorrows: [],
            numberOfBorrows: 0,
            monthBorrow: [],

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
                const borrowed = history.filter(borrowed => borrowed.borrowStore === `${this.state.username}` && borrowed.repaid === false);
                this.setState({ borrowed: borrowed })
                const loaned = history.filter(loaned => loaned.loanStore === `${this.state.username}` && loaned.repaid === false);
                this.setState({ loaned: loaned })
                console.log('Borrowed:', this.state.borrowed);
                console.log('Loaned:', this.state.loaned);
                const historyOfBorrows = history.filter(borrowed => borrowed.borrowStore === `${this.state.username}`);
                this.setState({ historyOfBorrows: historyOfBorrows });
                const numberOfBorrows = historyOfBorrows.length;
                this.setState({ numberOfBorrows: numberOfBorrows })
                const monthBorrow = historyOfBorrows.filter(report =>
                    moment(new Date(report.createdAt)).isBefore(moment().subtract(30, 'days'))
                );
                this.setState({ monthBorrow: monthBorrow });

                for (let i = 0; i < this.state.borrowed.length; i++) {
                    window.fetch(`https://wenventurefeedback.herokuapp.com/borrow/${this.state.borrowed[i]._id}`,
                        {
                            method: "PUT",
                            headers: {
                                credentials: "same-origin",
                                Accept: "application/json, text/plain, */*",
                                "Content-Type": "application/json",
                                mode: "cors"
                            },
                            body: JSON.stringify({
                                acknowledged: true,

                            }),
                        }).then(console.log())
                        .then((result) => {
                            return result.json();
                        })
                        .then((result) => {
                            console.log('acknowledged!', result);
                        })
                        .catch((err) => {
                            console.error('An error happened', err);
                        })
                }

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
                        <ReactTooltip />
                        <Link to="/">
                            <h5 data-delay-show='500' data-background-color="#e64438" data-tip="Log Out" className="text-right p-3 user gray"><FontAwesomeIcon className="gray" icon={faUserCircle} /> {this.state.username}</h5>
                        </Link>
                    </div>
                </Navbar>
                <header>
                    <hr className="display-3" />

                    <h2 className="text-center animate__animated animate__fadeIn" ><FontAwesomeIcon className="mx-auto" icon={faClipboardList} /> My List</h2>
                    <hr className="display-3" />
                </header>
                <div className="container">
                    <Row className="animate__animated animate__fadeIn">
                        <Col>
                            <h3 className="text-center">Borrowed</h3>
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
                    <hr />
                    <h4 className="text-center gray">Number of borrows in past 30 days: {this.state.monthBorrow.length}</h4>
                    <hr />
                    <p className="text-center mt-5 gray">2021 &copy; DevWilliams Software. All rights reserved.</p>
                </footer>
            </div>
        );
    };
}

function Borrow(props) {
    function payback(id) {
        window.fetch(`https://wenventurefeedback.herokuapp.com/borrow/${id}`,
            {
                method: "PUT",
                headers: {
                    credentials: "same-origin",
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    mode: "cors"
                },
                body: JSON.stringify({
                    repaid: true,

                }),
            }).then(console.log())
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                console.log('Item repaid!', result);
            })
            .catch((err) => {
                console.error('An error happened', err);
            });
        alert("Item was returned!");
        window.location.reload();
    }

    if (props.borrowed) {
        return (
            <div className="container">
                {props.borrowed.slice(0).reverse().map(report => (
                    <div className="p-1">
                        <div className="card" key={report.createdAt}>
                            <div className="card-body">
                                {newIcon(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(Date.parse(report.createdAt))))}
                                <h5 className="card-title">{report.store}</h5>
                                <h5 className="card-subtitle text-center text-danger">I owe {report.item} to {report.loanStore}</h5>
                                <h6> Quantity: </h6>
                                <p className="card-text">Case: {report.case}</p>
                                <p className="card-text">Bag: {report.bag}</p>
                                <p className="card-text">Individual: {report.individual}</p>
                                <hr></hr>
                                <h6 className="card-text">Acknowledged: {JSON.stringify(report.acknowledged)}</h6>
                                <hr></hr>
                                <p className="card-text">Borrowed by {report.name} on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(Date.parse(report.createdAt)))}</p>
                                {Outstanding(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(Date.parse(report.createdAt))))}
                                <Button className="mx-auto" onClick={() => payback(report._id)}>Item Was Returned</Button>
                            </div>
                        </div>
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
    function payback(id) {
        window.fetch(`https://wenventurefeedback.herokuapp.com/borrow/${id}`,
            {
                method: "PUT",
                headers: {
                    credentials: "same-origin",
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    mode: "cors"
                },
                body: JSON.stringify({
                    repaid: true,

                }),
            }).then(console.log())
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                console.log('Item repaid!', result);
            })
            .catch((err) => {
                console.error('An error happened', err);
            });
        alert("Repaid!");
        window.location.reload();
    }
    if (props.loaned) {
        return (
            <div className="container">
                {props.loaned.slice(0).reverse().map(report => (
                    <div className="p-1">
                        <div className="card" key={report.createdAt}>
                            <div className="card-body">
                                {newIcon(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(Date.parse(report.createdAt))))}
                                <h5 className="card-title">{report.store}</h5>
                                <h5 className="card-subtitle text-center text-danger">{report.borrowStore} owes me {report.item}</h5>
                                <h6> Quantity: </h6>
                                <p className="card-text">Case: {report.case}</p>
                                <p className="card-text">Bag: {report.bag}</p>
                                <p className="card-text">Individual: {report.individual}</p>
                                <hr></hr>
                                <h6 className="card-text">Acknowledged: {JSON.stringify(report.acknowledged)}</h6>
                                <hr></hr>
                                <p className="card-text">Loaned by {report.name} on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(Date.parse(report.createdAt)))}</p>
                                {Outstanding(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(Date.parse(report.createdAt))))}
                                <Button onClick={() => payback(report._id)}>Item Was Returned</Button>
                            </div>
                        </div>
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

function newIcon(date) {
    const datesAreOnSameDay = (first, second) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() - second.getDate() <= 3;
    if (datesAreOnSameDay(new Date(), new Date(date)) === true) {
        return <img src='../images/new.png' alt="new" className="newIcon" />
    }
}

// function Outstanding(date) {
//     const datesAreOnSameDay = (first, second) =>
//         first.getFullYear() === second.getFullYear() &&
//         first.getMonth() === second.getMonth() &&
//         first.getDate() - second.getDate() < 13;
//     if (datesAreOnSameDay(new Date(), new Date(date)) === true) {
//         return <p className="text-danger text-center bold yellowHighlight">Return Time exceeded 2 weeks!</p>
//     }
// }

function Outstanding(date) {

    if (moment(new Date(date)) < moment().subtract(2, 'weeks')) {
        return <p className="text-danger text-center bold yellowHighlight">Return time has exceeded 2 weeks!</p>
    }
}



export default withRouter(MyList);