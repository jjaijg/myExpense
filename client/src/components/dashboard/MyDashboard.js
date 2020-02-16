import React from "react";
// import PropTypes from "prop-types";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardTitle
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

// const align = {
//   alignItems: "center"
// };
// const blue = {
//   backgroundColor: "blue"
// };
// const green = {
//   backgroundColor: "green"
// };
// const yellow = {
//   backgroundColor: "yellow"
// };

const MyDashboard = ({ history, renderPersonal, renderPassword }) => {
  return (
    <Card outline color="success" className="mb-3">
      <CardHeader>
        <CardTitle>
          <h5>My Dashboard</h5>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row xs="1" md="2" style={{ textAlign: "center" }}>
          <Col className="mb-2" onClick={() => history.push("/home")}>
            <Card align="center" inverse color="warning">
              <CardBody>
                <FontAwesomeIcon icon="exchange-alt" size="3x" />
                <CardText>My Transactions</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-2" onClick={() => renderPersonal()}>
            <Card align="center" inverse color="info">
              <CardBody>
                <FontAwesomeIcon icon="user-circle" size="3x" />
                <CardText>Personal</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-2" onClick={() => history.push("/myexpense")}>
            <Card align="center" inverse color="success">
              <CardBody>
                <FontAwesomeIcon icon="rupee-sign" size="3x" />
                <CardText>My Expense</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-2" onClick={() => renderPassword()}>
            <Card align="center" inverse color="danger">
              <CardBody>
                <FontAwesomeIcon icon="lock" size="3x" />
                <CardText>Change Password</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

MyDashboard.propTypes = {};

export default withRouter(MyDashboard);
