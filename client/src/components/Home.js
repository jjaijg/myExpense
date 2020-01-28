import React, { Component, Fragment } from "react";
import { Container, Spinner } from "reactstrap";

import { connect } from "react-redux";

import Transactions from "./Transactions";
import TransactionModal from "./TransactionModal";

export class Home extends Component {
  render() {
    return (
      <Container>
        {!this.props.isLoading ? (
          <Fragment>
            <TransactionModal />
            <Transactions />
          </Fragment>
        ) : (
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
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(Home);
