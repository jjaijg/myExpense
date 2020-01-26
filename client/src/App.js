import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { loadUser } from "./actions/authActions";

import AppNavbar from "./components/AppNavbar";
import Home from "./components/Home";
import Verify from "./components/auth/Verify";

class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const { isAuthenticated } = store.getState().auth;
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <div className="fix-margin"></div>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>

            <PrivateRoute
              component={Verify}
              path="/verify/:confirmation?"
              isAuthenticated={isAuthenticated}
            />
            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default App;
