import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";

const PrivateRoute = ({
  inverse,
  token,
  isLoading,

  component: Component,
  ...rest
}) => {
  let route1 = null;
  let route2 = null;
  if (inverse) {
    route1 = <Redirect to={{ pathname: "/" }} />;
    route2 = <Route {...rest} render={props => <Component {...props} />} />;
  } else {
    route2 = <Redirect to={{ pathname: "/" }} />;
    route1 = <Route {...rest} render={props => <Component {...props} />} />;
  }
  console.log(route1, route2);

  return isLoading ? (
    <Spinner
      style={{
        position: "absolute",
        zIndex: "9999",
        width: "3rem",
        height: "3rem",
        top: "47vh",
        left: "47vw"
      }}
    />
  ) : token ? (
    route1
  ) : (
    route2
  );
};

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  token: state.auth.token
});

export default connect(mapStateToProps, {})(PrivateRoute);
