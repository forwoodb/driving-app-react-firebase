import React from 'react';
import {Link} from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function HeaderNavbar(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">DrivingApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">New Order</Link>
          <Link to="/OrdersList" className="nav-link">Orders List</Link>
          <Link to="/Analysis" className="nav-link">Analysis</Link>
          {props.user ?
            <button className="btn btn-sm" onClick={props.logout}>Log Out</button>
            :
            <button className="btn btn-sm" onClick={props.login}>Log In</button>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HeaderNavbar;