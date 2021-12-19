import React,{ Component} from "react";
import { Container } from "react-bootstrap";
class Footer extends Component {
    state = {};
    render(){
        return( 
            <Container className="text-center">
                <p>&copy; COMP 484 - Group 3</p>
            </Container>
        );
    }
} 


export default Footer;