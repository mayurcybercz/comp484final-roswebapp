import React, { Component } from "react";
import {Row, Col, Container, Button} from "react-bootstrap";
import Teleoperation from "./Teleoperation";
import Config from "../scripts/config.js";
import * as Three from "three";
class RobotState extends Component {
    state = {
        ros: null,
        x:0,
        y:0,
        orientation:0,
        linear_velocity:0,
        angular_velocity:0
    };

    constructor() {
        super();
        this.init_connection();
    }

    init_connection(){
        //needs to windows since we are not importing it from the web
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);
        
        //changing the state value to true if ros is connected succesfully
        this.state.ros.on("connection", () => {
                console.log("Connection stablished");
                this.setState({ connected: true });
            }
        );

        this.state.ros.on("close", () => {
                console.log("Connection is closed!");
                this.setState({ connected: false });
                //try to reconnect every 5 seconds
                setTimeout(() => {
                    try { 
                        this.state.ros.connect(
                            "ws://" +
                            Config.ROSBRIDGE_SERVER_IP +
                            ":" +
                            Config.ROSBRIDGE_SERVER_PORT +
                            ""
                        );
                    } catch (error) {
                        console.log("connection problem");
                    }
                }, Config.RECONNECTION_TIMER);
        });
        
        try { 
            this.state.ros.connect(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            );
        } catch (error) {
            console.log("connection problem");
        }
    }

    componentDidMount(){
        this.getRobotState();
    }

    getRobotState(){
        //creates a pose subscriber
        var pose_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.POSE_TOPIC,
            messageType: Config.POSE_MESSAGE_TYPE,

        });

        //creates a pose callback
        pose_subscriber.subscribe((message) => {
            this.setState({x: message.pose.pose.position.x.toFixed(3)});
            this.setState({y: message.pose.pose.position.y.toFixed(3)});
            this.setState({orientation: this.getOrientationFromQuaternion(message.pose.pose.orientation).toFixed(2)});

        });

        //creates a subscriber to hold variables that are currently store in ros odom
        var velocity_subscriber =  new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.ODOM_TOPIC,
            messageType: Config.ODOM_MESSAGE_TYPE,
        });

        //creates a pose callback 
        velocity_subscriber.subscribe((message) => {
            this.setState({linear_velocity: message.twist.twist.linear.x.toFixed(3)});
            this.setState({angular_velocity: message.twist.twist.angular.z.toFixed(3)});
        });
    }

    getOrientationFromQuaternion(ros_orientation_quaternion){
        var quat = new Three.Quaternion(
            ros_orientation_quaternion.x,
            ros_orientation_quaternion.y,
            ros_orientation_quaternion.z,
            ros_orientation_quaternion.w
            );
        var RPY = new Three.Euler().setFromQuaternion(quat);

        return RPY["_z"] * (180/Math.PI);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h4 className="mt-4">Position</h4>
                        <p className="mt-0">x: {this.state.x} </p>
                        <p className="mt-0">y: {this.state.y} </p>
                        <p className="mt-0">Orientation: {this.state.orientation} </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 className="mt-4">Velocities</h4>
                        <p className="mt-0">Linear Velocity: {this.state.linear_velocity} </p>
                        <p className="mt-0">Angular Velocity: {this.state.angular_velocity}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RobotState;