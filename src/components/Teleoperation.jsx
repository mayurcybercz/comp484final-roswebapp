import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import Config  from "../scripts/config";

class Teleoperation extends Component {
    state = {
        ros: null,
        connected: false
    }
    constructor(){
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    init_connection(){
        //needs the windows since we are not importing it from the web
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);
        
        //changing the state value to true if ros is connected succesfully
        this.state.ros.on("connection", () => {
                console.log("Connection stablished in Teleoperation Component");
                this.setState({ connected: true });
            }
        );
        //otherwise try again
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

    //updates the position of the robot based on the jockstick movement by the user
    handleMove(event){

        //create ROS Publisher
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: Config.CMD_MESSAGE_TYPE
        });

        //create a twist message to be sent to rosbridge
        var twist = new window.ROSLIB.Message({
            linear: {
                x: event.y/120,
                y:0,
                z:0,
            },
            angular: {
                x:0,
                y:0,
                z: -event.x/120,
            }


        });
        //we need to publish the message on the cmd_vel topic
        cmd_vel.publish(twist);
    }
    //stops the robot as soon as the user stops using the joystick
    handleStop(event){
        //create ROS Publisher
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: Config.CMD_MESSAGE_TYPE
        });

        //create a twist message to be sent to rosbridge and set values to 0 
        var twist = new window.ROSLIB.Message({
            linear: {
                x:0,
                y:0,
                z:0,
            },
            angular: {
                x:0,
                y:0,
                z:0,
            }


        });
        
        //we need to publish the message on the cmd_vel topic to update the local machine
        cmd_vel.publish(twist);

    }

    

    render(){
        return(
            <div>
                <Joystick
                    size={100}
                    baseColor="white"
                    stickColor="gray"
                    move={ this.handleMove }
                    stop={ this.handleStop }
                ></Joystick>
                
                
            </div>
            
            
        );
    }
}

export default Teleoperation;