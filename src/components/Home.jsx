import React, {Component} from "react";
import { Button } from "react-bootstrap";
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";
import{Row, Col, Container } from "react-bootstrap";
import RobotState from "./RobotState";
import Map from "./Map";

class Home extends Component {
    //state alllows to us to update the webui values
    state = {
       
    };
    
    render() {
        return (
            <div>
                <Container>
                    <h1 className="text-center mt-3">Robot Control Page</h1>
                    <Row>
                        <Col>
                            <Connection/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Teleoperation/>
                        </Col>
                    </Row>
                    <Row>    
                        <Col>
                            <RobotState/>
                        </Col>
                        <Col>
                            <h1>MAP</h1>
                            <Map/>
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        );
    }
}

export default Home;