import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteConfirmModal from "./DeleteConfirmModal";
import {
  Container,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Badge,
  CardSubtitle,
  CardColumns,
  ListGroup,
  ListGroupItem,
  UncontrolledCollapse
} from "reactstrap";

import { byType, byDoneFor, byDoneAt } from "../helper/groupBy";
import { getTransactions } from "../actions/transactionActions";

class InFuture extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }

  createDetails = arr => {
    const byDates = byDoneAt(arr);
    return (
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
                                <Badge color="light">{d.toDateString()}</Badge>
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
    );
  };
  render() {
    const { loading, transactions } = this.props.transaction;

    const render = loading ? (
      <h4>Loading...</h4>
    ) : (
      <Container>
        {this.createDetails(transactions)}
        <div className="mb-3" />
      </Container>
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
})(InFuture);
