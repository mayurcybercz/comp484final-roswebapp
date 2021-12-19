import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
class Body extends Component{
   render(){
      
        return ( 
        <Container>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                </Routes>
            </Router>
        </Container>);
       
   } 
}

export default Body;