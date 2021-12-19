import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import Config  from "../scripts/config";
class Connection extends Component {
    state = { 
        connected: false,
        ros: null
    };

    constructor(){
        super();
        this.init_connection();
    }

    init_connection(){
        //using window to have access to any script in the source code
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

    render() {
        return(
            <div>
                <Alert className="text-center m-3" variant={this.state.connected ? "success" : "danger"}>
                    {this.state.connected ? "Robot Connected" : "Robot Disconnected" }
                </Alert>
            </div>
        );
    }
}

export default Connection;