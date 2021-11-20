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
import { withRouter, Link, } from "react-router-dom";
import { faArrowAltCircleDown, faArrowAltCircleUp, faUserCircle, faClipboardList, faHistory, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';








class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem('username'),
            isOpen: false,
            borrowed: [],
            loaned: [],
            history: [],
            newBorrow: [],
            newLoan: [],
        }
        this.handleChange = this.handleChange.bind(this);
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

    componentDidMount() {

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
                // console.log('Borrowed:', this.state.borrowed);
                // console.log('Loaned:', this.state.loaned);
                let newLoan = loaned.filter(newLoan => newLoan.acknowledged === false);
                let newBorrow = borrowed.filter(newBorrow => newBorrow.acknowledged === false);
                this.setState({ newLoan: newLoan });
                this.setState({ newBorrow: newBorrow });
                console.log('NewBorrow:', this.state.newBorrow);
                console.log('NewLoan:', this.state.newLoan);

            })
            .catch((err) => {
                console.error('An error happened', err);
            });
        //.map(report => (




        let myLoanNotification = () => {
            if (this.state.newLoan.length > -1 || this.state.newBorrow.length > -1) {
                new window.Notification(`New Borrow or Loan!`, {
                    body: `Click to see your list!`,
                    icon: ('../images/favicon.ico')
                }
                ).onclick = () => {
                    this.props.history.push('/mylist');
                }
            } else {
                console.log("no new loan")
            }
        }
        myLoanNotification();
    


    }


    render() {
        return (
            <div className="container">
                <Navbar sticky-top color="light" light expand="sm" fixed="top">
                    <NavbarBrand >
                        <img className="logoSmall text-center animate__animated animate__pulse animate__infinite infinite" alt="wendy" src="../images/wendysLogo.png" />
                    </NavbarBrand>
                    {/* <NavbarBrand><Link to="/dashboard">Dashboard </Link></NavbarBrand> */}
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/dashboard"><NavLink className="activeUnderline">Dashboard</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/borrow"><NavLink>Borrow</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/loan"><NavLink>Loan</NavLink></Link>
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
                    <h2 className="text-center animate__animated animate__fadeIn" ><FontAwesomeIcon className="gray" icon={faBars} /> Dashboard</h2>
                    <hr className="display-3" />
                </header>
                <Row className="p-2 animate__animated animate__fadeIn">
                    <Col className="p-2">
                        <Card onClick={() => { this.props.history.push('/borrow') }} className="bg-light shadow border p-2">
                            <Card.Body>
                                <Card.Title className="text-center">Borrow</Card.Title>
                                <Card.Text className="text-center">
                                    <FontAwesomeIcon className="mx-auto red animate__animated animate__flipInY" icon={faArrowAltCircleDown} />
                                </Card.Text>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col className="p-2">
                        <Card onClick={() => { this.props.history.push('/loan') }} className="bg-light shadow border p-2">
                            <Card.Body>
                                <Card.Title className="text-center">Loan</Card.Title>
                                <Card.Text className="text-center">
                                    <FontAwesomeIcon className="mx-auto green animate__animated animate__flipInY" icon={faArrowAltCircleUp} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <hr className="display-3" />
                <Row className="p-10">
                    <Col className="p-2">
                        <Card onClick={() => { this.props.history.push('/mylist') }} className="bg-light shadow border p-2">
                            <Card.Body>
                                <Card.Title className="text-center">My List</Card.Title>
                                <Card.Text className="text-center">
                                    <FontAwesomeIcon className="mx-auto icon animate__animated animate__flipInY" icon={faClipboardList} />
                                </Card.Text>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col className="p-2">
                        <Card onClick={() => { this.props.history.push('/history') }} className="bg-light shadow border p-2">
                            <Card.Body>
                                <Card.Title className="text-center">History</Card.Title>
                                <Card.Text className="text-center">
                                    <FontAwesomeIcon className="mx-auto icon animate__animated animate__flipInY" icon={faHistory} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <hr className="display-3" />
                <footer className="mt-4">
                    <p className="text-center mt-5 gray">2021 &copy; DevWilliams Software. All rights reserved.</p>
                </footer>
            </div>
        );
    };
}









export default withRouter(Dashboard);