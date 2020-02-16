import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Spinner
} from "reactstrap";

import { logout } from "../../actions/authActions";

import Welcome from "../Welcome";
import MyDashboard from "./MyDashboard";
import ChangePw from "./ChangePw";
import Personal from "./Personal";
import TransactionModal from "../TransactionModal";

const Main = ({ history, logout, isAuthenticated, isLoading }) => {
  const renderBoard = () => setComponent(myDash);

  const renderPersonal = () => setComponent(<Personal />);

  const renderPassword = () => setComponent(<ChangePw />);

  const myDash = (
    <MyDashboard
      renderPersonal={renderPersonal}
      renderPassword={renderPassword}
    />
  );

  // State
  const [component, setComponent] = useState(myDash);

  const goToTransactions = () => {
    history.push("/home");
  };
  const renderComp = isAuthenticated ? (
    <Row xs="1" sm="2">
      <Col md="3" className="mb-3">
        <TransactionModal />
        <Card>
          <CardHeader>
            <CardTitle>
              <h5>My Account</h5>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <ListGroup>
              <ListGroupItem color="success" onClick={renderBoard}>
                <FontAwesomeIcon icon="palette" size="lg" /> Account Dashboard
              </ListGroupItem>
              <ListGroupItem color="info" onClick={renderPersonal}>
                <FontAwesomeIcon icon="user" size="lg" /> Account Information
              </ListGroupItem>
              <ListGroupItem color="warning" onClick={goToTransactions}>
                <FontAwesomeIcon icon="exchange-alt" size="lg" /> My
                Transactions
              </ListGroupItem>
              <ListGroupItem color="danger" onClick={() => renderPassword()}>
                <FontAwesomeIcon icon="lock" size="lg" /> Change Password
              </ListGroupItem>
              <ListGroupItem color="danger" onClick={() => logout()}>
                <FontAwesomeIcon icon="power-off" size="lg" /> Logout
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </Col>
      <Col>{component}</Col>
    </Row>
  ) : (
    <Welcome />
  );
  return (
    <Container>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "70vh"
          }}
        >
          <Spinner
            style={{
              width: "4rem",
              height: "4rem"
            }}
          />
        </div>
      ) : (
        renderComp
      )}
    </Container>
  );
};

Main.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default withRouter(connect(mapStateToProps, { logout })(Main));
