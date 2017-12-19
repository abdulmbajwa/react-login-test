import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {actionCreators} from "../store/UserAuthentication";
import './NavMenu.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const NavMenu = props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>DWNMS.Web</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={'/'} exact>
          <NavItem>
            <Glyphicon glyph='home' /> Home
          </NavItem>
        </LinkContainer>

        <LinkContainer to={'/counter'}>
          <NavItem>
            <Glyphicon glyph='education' /> Counter
          </NavItem>
        </LinkContainer>
        <NavItem onClick={()=>props.actions.logoutUser()}>
          <Glyphicon glyph='user' /> Logout
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
const mapDispatchToProps = (dispatch)=>{
  return {actions:bindActionCreators(actionCreators,dispatch)};
};
export default connect(null,mapDispatchToProps)(NavMenu);