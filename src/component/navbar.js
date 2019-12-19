import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon
} from "mdbreact";
import { Link } from 'react-router-dom'
import { Logout } from '../redux/Action'
import { connect } from 'react-redux'


class NavbarPage extends Component {
  state = {
    collapseID: ""
  };

  logoutUser = () => {
    this.props.Logout()
    localStorage.removeItem('username')
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  render() {
    return (

      <MDBNavbar color="purple-gradient" dark expand="md" style={{ marginTop: "20px" }}>
        <MDBNavbarBrand>
          <Link to='/'>
            <strong className="white-text">Cinema Clone</strong>
          </Link>
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
                  {
                    this.props.role
                    ?
                    `Hi, ${this.props.username}`
                    :
                    <MDBIcon icon="user" className="mr-1"   />
                  }
                <MDBDropdownMenu className="dropdown-default" right>
                    {this.props.username
                      ?
                      <div>
                        {this.props.role === 'admin'
                          ?
                          <MDBDropdownItem>
                            <Link to='/manageMovies'>
                              Admin Page
                            </Link>
                            <Link to='/admintransaction'>
                              Transaction
                            </Link>
                          
                          </MDBDropdownItem>
                          :
                          <div>

                            <Link to='/UserPage'>
                              <MDBDropdownItem>
                                User Page
                          </MDBDropdownItem>
                            </Link>
                            <Link to='/changepassword'>
                              Change Password
                            </Link>
                            <Link to='/Cart'>
                              <MDBDropdownItem>
                                Cart
                          </MDBDropdownItem>
                          </Link>
                            <Link to='/usertransaction'>
                              <MDBDropdownItem>
                                Transaction
                          </MDBDropdownItem>
                          </Link>
                          </div>
                            }
                        <Link to='/'>

                              <MDBDropdownItem onClick={this.logoutUser}>
                                Logout
                        </MDBDropdownItem>
                            </Link>
                          </div>
                      :
                      <div>
                          <Link to='/login' style={{ fontWeight: 400, textDecoration: 'none', color: 'black' }}>
                            <MDBDropdownItem>
                              Login
                        </MDBDropdownItem>
                          </Link>
                          <Link to='/register' style={{ fontWeight: 400, textDecoration: 'none', color: 'black' }}>
                            <MDBDropdownItem>
                              Register
                        </MDBDropdownItem>
                          </Link>
                        </div>
                        }
                  </MDBDropdownMenu>
                </MDBDropdownToggle>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
        );
      }
    }
const mapStatetoProps = (state) => {
  return {
          username: state.user.username,
        role: state.user.role
      }
    }
    
export default connect(mapStatetoProps, {Logout})(NavbarPage)