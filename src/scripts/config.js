const Config = {
    ROSBRIDGE_SERVER_IP: "10.0.2.15",
    ROSBRIDGE_SERVER_PORT: "9090",
    RECONNECTION_TIMER: "5000",
    CMD_VEL_TOPIC: "/cmd_vel",
    CMD_MESSAGE_TYPE: "geometry_msgs\Twist",
    POSE_TOPIC: "/amcl_pose",
    POSE_MESSAGE_TYPE: "geometry_msgs/PoseWithCovarianceStamped",
    ODOM_TOPIC: "/odom",
    ODOM_MESSAGE_TYPE: "nav_msgs/Odometry",
}

export default Config;