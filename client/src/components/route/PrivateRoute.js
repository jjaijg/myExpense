import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authActions";

class PrivateRoute extends Component {
  render() {
    console.log(this.props);
    let route = null;
    const { path, component: Component, auth } = this.props;
    const { isLoading, isAuthenticated, user } = auth;
    console.log(auth);
    if (isLoading) {
      route = <h4>Loading data...</h4>;
    } else if (isAuthenticated) {
      route = (
        <Route
          paht={path}
          render={props =>
            isAuthenticated ? (
              <Component />
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          }
        />
      );
    }
    return route;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(PrivateRoute);
