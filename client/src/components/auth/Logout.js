import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { NavLink } from "reactstrap";

import { connect } from "react-redux";

import { logout } from "../../actions/authActions";

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  render() {
    return (
      <Fragment>
        <NavLink href="#" onClick={this.props.logout}>
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);
