import React, {Component} from "react";
import Config from "../scripts/config"


class Map extends Component {
    //state alllows to us to update the webui values
    state = {
       ros: null,
    };

    constructor(){
        super();
        this.view_map= this.view_map.bind(this);
    }

    init_connection(){
        //needs to windows since we are not importing it from the web
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);
        try { 
            this.state.ros.connect(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            );
        } catch (error) {
            console.log(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            );
            console.log("could not connnect with ws robot. Try again ");
        }   
    }

    componentDidMount(){
        this.init_connection();
        this.view_map();
    }

    view_map(){
        //creates a 2d map to display to the webi
        var viewer = new window.ROS2D.Viewer({
            divID: "nav_div",
            width:640,
            height:480,
        });

        //creates a nav client 
        var navClient = new window.NAV2D.OccupancyGridClientNav({
            ros: this.state.ros,
            rootObject: viewer.scene,
            viewer: viewer,
            serverName: "/move_base",
            widthOrientation: true,


        });
    }

    render() {
        return (
            <div>
                <div id="nav_div"></div> 
            </div> 
        );
    }
}

export default Map;