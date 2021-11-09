import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Col, Row, FormGroup, Input, Button,Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Card } from 'react-bootstrap';
import 'animate.css';
import { withRouter } from "react-router-dom";
import { faArrowAltCircleDown, faArrowAltCircleUp, faUserCircle, faClipboardList, faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';






class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            isOpen: false
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

    handleSubmit() {
    }

    render() {
        return (
            <div>
                    <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Dashboard</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
                <div className="text-end">
                    <h5 className="text-right p-3 gray"><FontAwesomeIcon className="gray" icon={faUserCircle} /> {this.state.username}</h5>
                </div>
                <Col className="mx-auto text-center" xs="10" lg="6">
                    <img className="logoSmall text-center" alt="wendy" src="../images/wendysLogo.png" />
                </Col>
                <h1 className="display-3 p-1 text-center animate__animated animate__backInDown">Dashboard</h1>
                <hr className="display-3" />
                <h2 className="text-center animate__animated animate__backInLeft" >Borrow & Loan</h2>
                <hr className="display-3" />

                <Row className="p-2">
                    <Col onClick={() => {this.props.history.push('/borrow', { store: this.state.store })}}  className="p-2">
                        <Card className="bg-light shadow border p-2">
                            <Card.Body>
                                <Card.Title className="text-center">Borrow</Card.Title>
                                <Card.Text className="text-center">
                                    <FontAwesomeIcon className="mx-auto red" icon={faArrowAltCircleDown} />
                                </Card.Text>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col className="p-2">
                        <Card className="bg-light shadow border p-2">
                            <Card.Body>
                                <Card.Title className="text-center">Loan</Card.Title>
                                <Card.Text className="text-center">
                                    <FontAwesomeIcon className="mx-auto green" icon={faArrowAltCircleUp} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <hr className="display-3" />
                <h2 className="text-center animate__animated animate__backInRight" >My Reports</h2>
                <hr className="display-3" />
                <Row className="p-10">
                    <Col className="p-2">
                        <Card className="bg-light shadow border p-2">
                            <Card.Body>
                                <Card.Title className="text-center">My List</Card.Title>
                                <Card.Text className="text-center">
                                    <FontAwesomeIcon className="mx-auto icon" icon={faClipboardList} />
                                </Card.Text>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col className="p-2">
                        <Card className="bg-light shadow border p-2">
                            <Card.Body>
                                <Card.Title className="text-center">History</Card.Title>
                                <Card.Text className="text-center">
                                    <FontAwesomeIcon className="mx-auto icon" icon={faHistory} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <hr className="display-3" />
                <footer>
                    <p className="text-center">2021 &copy; DevWill Design. All rights reserved.</p>
                </footer>
            </div>
        );
    };
}









export default withRouter(Dashboard);