import React, {Component} from "react";
import { BlendingEquation } from "three";
import Config from "../scripts/config"


class Map extends Component {
    
    //state alllows to us to update the webui values of ROS across the entire class
    state = {
       ros: null,
    };

    constructor(){
        super();
        this.view_map= this.view_map.bind(this);
    }

    init_connection(){
        //we need to use window  since we are not importing it from the web
        this.state.ros = new window.ROSLIB.Ros();
        
        //ensure we are connected to the local machine through websocket
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

    //it initializes the map canvas and map
    componentDidMount(){
        this.init_connection();
        this.view_map();
    }

    view_map(){
        //creates a 2d map to display to the webi
        var viewer = new window.ROS2D.Viewer({
            divID: "map",
            width: 640,
            height: 480,
            
        });
      
        //use for setting up the map client in the webi
        var mapClient =  new window.ROS2D.OccupancyGridClient({
            ros: this.state.ros,
            rootObject: viewer.scene,
            continuous: true
        });

       //creates a navegation client 
        var navClient = new window.NAV2D.OccupancyGridClientNav({
            ros: this.state.ros,
            rootObject: viewer.scene,
            viewer: viewer,
            serverName: "/move_base",
            robot_pose: "/robot_pose",
            actionName: "move_base_msgs/MoveBaseAction",
            continuous: true,
            withOrientation: true

        });


        var zoomView = new window.ROS2D.ZoomView({
            rootObject: viewer.scene,
        });

        // //scaling the map to fit in the whole canvas
        // mapClient.on('change', function(){
        //     viewer.scaleToDimensions(mapClient.currentGrid.width, mapClient.currentGrid.height);
        //     viewer.shift(mapClient.currentGrid.pose.position.x, mapClient.currentGrid.pose.position.y);
        // });

    }

    render() {
        return (
            <div>
                <div id="map"></div> 
            </div> 
        );
    }
}

export default Map;