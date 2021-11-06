import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Col, Row, FormGroup, Input, Button } from 'reactstrap';
import { Card } from 'react-bootstrap';
import 'animate.css';
import { withRouter } from "react-router-dom";
import { faArrowAltCircleDown, faArrowAltCircleUp, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';






class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            username: this.props.location.state.username,
            store: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.findSite = this.findSite.bind(this);

    };
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });

    }

    handleSubmit() {
    }

    findSite(site) {
        switch (site) {
            case 'Altoona23':
                return this.setState({ store: 'Plank-Rd' });
                break;
            case 'Duncansville34':
                return this.setState({ store: 'Duncansville' });
                break;
            case 'Cricketfield40':
                return this.setState({ store: 'Cricketfield' });
                break;
            case 'Bedford36':
                return this.setState({ store: 'Bedford' });
                break;
            case 'Scalp25':
                return this.setState({ store: 'Johnstown' });
                break;
            case 'Somerset20':
                return this.setState({ store: 'Somerset' });
                break;
            case 'Ebensburg30':
                return this.setState({ store: 'Ebensburg' });
                break;
            case 'Clarion37':
                return this.setState({ store: 'Clarion' });
                break;
            case 'Indiana22':
                return this.setState({ store: 'Indiana' });
                break;
            case 'StMarys32':
                return this.setState({ store: 'St-Marys' });
                break;
            case 'Punxy31':
                return this.setState({ store: 'Punxsutawney' });
                break;
            case 'Dubois21':
                return this.setState({ store: 'Dubois' });
                break;
            default:
                console.log('error');
        }
    }
    componentDidMount() {
        this.findSite(this.state.username);
    }




    render() {
        return (
            <div>
                <div className="text-end">
                <h5 className="text-right p-3 gray"><FontAwesomeIcon className="gray" icon={faUserCircle} /> {this.state.store}</h5>
                </div>
                <Col className="mx-auto text-center" xs="10" lg="6">
                    <img className="logoSmall p-3 text-center" alt="wendy" src="../images/wendysLogo.png" />
                </Col>
                <h1 className="display-3 text-center animate__animated animate__backInRight">Dashboard</h1>
                <hr className="display-3" />
                <h2 className="text-center animate__animated animate__backInLeft" >Borrow & Loan</h2>
                <hr className="display-3" />

                <Row className="p-10">
                    <Col className="p-5">
                        <Card className="bg-light shadow border p-5">
                            <Card.Body>
                                <Card.Title className="text-center">Borrow</Card.Title>
                                <Card.Text className="text-center">
                                    <FontAwesomeIcon className="mx-auto red" icon={faArrowAltCircleDown} />
                                </Card.Text>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col className="p-5">
                        <Card className="bg-light shadow border p-5">
                            <Card.Body>
                                <Card.Title className="text-center">Loan</Card.Title>
                                <Card.Text className="text-center">
                                    <FontAwesomeIcon className="mx-auto green" icon={faArrowAltCircleUp} />
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