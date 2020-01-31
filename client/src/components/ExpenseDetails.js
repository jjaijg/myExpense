import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  Container,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Badge,
  CardSubtitle,
  Row,
  Col
} from "reactstrap";

import { byType, byDoneFor } from "../helper/groupBy";
import { getTransactions } from "../actions/transactionActions";

const createDetails = arr => {
  const exp = byType(arr);
  const purposes = byDoneFor(arr);
  return (
    <Fragment>
      <Row className="ml-auto">
        <Col xl="6">
          <Card className="mb-3 mr-3" outline color="secondary">
            <CardBody>
              <CardTitle>
                <strong className="name">Overall Expense Details</strong>
              </CardTitle>
              <hr></hr>
              <CardSubtitle className="mb-3">
                <h5>
                  Earned : Rs. <Badge color="success">{exp.earned}</Badge>
                </h5>
                <h5>
                  Spent &nbsp;&nbsp;: Rs.{" "}
                  <Badge color="danger">{exp.spent}</Badge>
                </h5>
              </CardSubtitle>
              <CardText>
                <Badge color="info">Overall Expense</Badge>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <h5 className="center">Transactions based on Purpose</h5>
      <Table hover bordered responsive dark striped>
        <thead>
          <tr>
            <th className="">#</th>
            <th>Purpose</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(purposes).map((purpose, ind) => {
            return (
              <tr key={purpose[0]}>
                <th scope="row">{ind + 1}</th>
                <td>{purpose[0].toLocaleUpperCase()}</td>
                <td>{purpose[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
};

class ExpenseDetails extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }
  render() {
    const { loading, transactions } = this.props.transaction;

    const render = loading ? (
      <h4>Loading...</h4>
    ) : (
      <Container>{createDetails(transactions)}</Container>
    );

    return <div>{render}</div>;
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(mapStateToProps, { byDoneFor, byType, getTransactions })(
  ExpenseDetails
);
