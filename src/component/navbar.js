import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon } from "mdbreact";
import { Link } from 'react-router-dom'

class NavbarPage extends Component {
state = {
  collapseID: ""
};

toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
  collapseID: prevState.collapseID !== collapseID ? collapseID : ""
}));

render() {
  return (
  
      <MDBNavbar color="purple-gradient" dark expand="md" style={{ marginTop: "20px" }}>
        <MDBNavbarBrand>
          <strong className="white-text">Cinema Clone</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon icon="fas fa-film" className="mr-1" />Now Playing</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" className="mr-1" />Profile
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right/>
                  <MDBDropdownItem href="#!">
                    <Link to='/Login' style={{fontWeight:400, textDecoration:'none', color:'black'}}>
                      Log in
                      </Link>
                    </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link to='Logout' style={{fontWeight:400, textDecoration:'none', color:'black'}}>
                    Log out
                    </Link>
                    </MDBDropdownItem>
                  <MDBDropdownItem href="#!">Log out</MDBDropdownItem>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      
        
    );
  }
}

export default NavbarPage;