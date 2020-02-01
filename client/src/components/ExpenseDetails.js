import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import DeleteConfirmModal from "./DeleteConfirmModal";
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
  Col,
  CardColumns,
  ListGroup,
  ListGroupItem,
  UncontrolledCollapse
} from "reactstrap";

import { byType, byDoneFor, byDoneAt } from "../helper/groupBy";
import {
  getTransactions,
  deleteTransaction
} from "../actions/transactionActions";

class ExpenseDetails extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }

  createDetails = arr => {
    const exp = byType(arr);
    const purposes = byDoneFor(arr);
    const byDates = byDoneAt(arr);
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
        <Table hover bordered responsive striped>
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
        <ListGroup style={{ cursor: "pointer" }}>
          {Object.entries(byDates).map((obj, ind) => {
            const [date, transactions] = obj;
            return (
              <ListGroupItem key={date}>
                <div id={`toggler${ind}`}>
                  <h5>{date}</h5>
                </div>
                <UncontrolledCollapse toggler={`toggler${ind}`}>
                  <CardColumns>
                    {transactions.map(
                      ({ _id, doneFor, expense, doneAt, type }) => {
                        const d = new Date(doneAt);
                        const color = type === "c" ? "success" : "danger";
                        return (
                          <Card
                            key={_id}
                            className="mb-3 mr-3"
                            outline
                            color={color}
                          >
                            <CardBody>
                              <CardTitle>
                                <strong className="name">
                                  {this.props.user.name}
                                </strong>
                                <DeleteConfirmModal id={_id} />
                                <CardText>
                                  <Badge color="light">
                                    {d.toDateString()}
                                  </Badge>
                                  <Badge color="light" className="ml-1">
                                    {d.toLocaleTimeString()}
                                  </Badge>
                                </CardText>
                              </CardTitle>
                              <hr></hr>
                              <CardSubtitle className="mb-3">
                                <h5>
                                  Rs. <Badge color={color}>{expense}</Badge>
                                </h5>
                              </CardSubtitle>
                              <CardText>
                                <Badge color="info">
                                  {doneFor.toUpperCase()}
                                </Badge>
                              </CardText>
                            </CardBody>
                          </Card>
                        );
                      }
                    )}
                  </CardColumns>
                </UncontrolledCollapse>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Fragment>
    );
  };
  render() {
    const { loading, transactions } = this.props.transaction;

    const render = loading ? (
      <h4>Loading...</h4>
    ) : (
      <Container>{this.createDetails(transactions)}</Container>
    );

    return <div>{render}</div>;
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  byDoneAt,
  byDoneFor,
  byType,
  getTransactions
})(ExpenseDetails);
