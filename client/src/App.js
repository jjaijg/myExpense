import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { loadUser } from "./actions/authActions";

import AppNavbar from "./components/AppNavbar";
import Home from "./components/Home";
import Chart from './components/Chart'
class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    // const { isLoading } = store.getState().auth;
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Home />
          <Chart />
        </div>
      </Provider>
    );
  }
}

export default App;
