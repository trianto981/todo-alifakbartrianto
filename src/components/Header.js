import { Navbar,Nav,Container, NavDropdown } from "react-bootstrap";
import React from "react";

const Header = () =>{
    return(
    //   <div className="header">
    //   <div data-cy="header-background" className="container">
    //     <h5 data-cy="header-title">TO DO LIST APP</h5>
    //   </div>
    // </div>
    <Navbar className="bg-blue header" data-cy='header-background'>
    <Container>
        <Navbar.Brand href="/" className="fw-bold text-white fs-24" data-cy='header-title'>TO DO LIST APP</Navbar.Brand>
    </Container>
</Navbar>
    )
};

export default Header;