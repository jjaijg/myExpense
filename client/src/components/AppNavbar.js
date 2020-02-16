import React, { Component, Fragment } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

class AppNavbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  state = {
    isOpen: false
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLink = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong className="name">
              {user ? `Welcome ${user.name}` : null}
            </strong>
          </span>
        </NavItem>
        <NavItem>
          <NavLink href="/">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/myexpense">My Expense</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/infuture">Coming Soon</NavLink>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );
    const guestLink = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
        <NavItem>
          <NavLink href="/verify">Verify</NavLink>
        </NavItem>
      </Fragment>
    );
    return (
      <div>
        <Navbar fixed={"top"} color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">My Expense</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLink : guestLink}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AppNavbar);
