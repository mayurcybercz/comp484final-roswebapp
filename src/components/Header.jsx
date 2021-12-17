import React,{ Component} from "react";
import {Container , Navbar, Nav } from "react-bootstrap";
class Header extends Component {
    render(){
        return(
        <Container>
            <Navbar bg="dark" variant = "dark" expand="lg" collapseOnSelect>
            <Navbar.Brand href="http://robotwebtools.org/">Robot Web Tools </Navbar.Brand>
            <Navbar.Brand href="http://wiki.ros.org/roslibjs/Tutorials/BasicRosFunctionality"> Rosjs Intro</Navbar.Brand>

            </Navbar>
        </Container>);
        
    }
} 

export default Header;