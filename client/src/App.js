import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "reactstrap";

import { connect } from "react-redux";
import { loadUser } from "./actions/authActions";

import AppNavbar from "./components/AppNavbar";
import Transactions from "./components/Transactions";
import TransactionModal from "./components/TransactionModal";

class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const { isLoading } = store.getState().auth;
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            {!isLoading ? (
              <Fragment>
                <TransactionModal />
                <Transactions />
              </Fragment>
            ) : (
              <h4>Loading....</h4>
            )}
          </Container>
        </div>
      </Provider>
    );
  }
}
const mapStateToProps = state => ({
  isLoading: state.auth.isLoading
});
export default App;
