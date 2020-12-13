import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class HeaderNavbar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Delivery Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">New Order</Link>
            <Link to="/OrdersList" className="nav-link">Orders List</Link>
            <Link to="/Analysis" className="nav-link">Analysis</Link>
            {this.props.user ?
              <button className="btn btn-sm" onClick={this.props.logout}>Log Out</button>
              :
              <button className="btn btn-sm" onClick={this.props.login}>Log In</button>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderNavbar;