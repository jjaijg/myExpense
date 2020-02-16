import React, { Component } from "react";
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
// import Chart from "./components/Chart";
import ExpenseDetails from "./components/ExpenseDetails";
import InFuture from "./components/InFuture";
import Main from "./components/dashboard/Main";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faPalette,
  faUser,
  faExchangeAlt,
  faLock,
  faPowerOff,
  faUserCircle,
  faRupeeSign
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
library.add(
  faCheckSquare,
  faPalette,
  faUser,
  faExchangeAlt,
  faLock,
  faPowerOff,
  faUserCircle,
  faRupeeSign
);
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <div className="fix-margin"></div>
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute
              inverse
              component={Verify}
              path="/verify/:confirmation?"
            />
            <PrivateRoute component={ExpenseDetails} path="/myexpense" />
            <PrivateRoute component={InFuture} path="/infuture" />
            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
