import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { loadUser } from "./actions/authActions";

import PrivateRoute from "./components/route/PrivateRoute";
import AppNavbar from "./components/AppNavbar";
import Home from "./components/Home";
import Verify from "./components/auth/Verify";
import Chart from "./components/Chart";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const { auth } = store.getState();
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <div className="fix-margin"></div>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/verify">
              <Verify />
            </Route>

            {/* <PrivateRoute component={Verify} path="/verify/:confirmation?" /> */}
            <PrivateRoute component={Chart} path="/chart" />
            {/* <Route render={() => <Redirect to={{ pathname: "/" }} />} /> */}
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
