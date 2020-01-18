import React, { Component } from "react";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  CardColumns,
  Container,
  Button,
  Badge,
  CardSubtitle
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getTransactions } from "../actions/transactionActions";

export class Transactions extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }

  render() {
    const { transactions } = this.props.transaction;
    return (
      <Container>
        <Button color="dark" className="sm mb-3">
          Add Transaction
        </Button>
        <CardColumns>
          {transactions.map(({ id, doneBy, doneFor, expense, doneAt }) => {
            return (
              <Card className="mb-3 mr-3" key={id} outline color="secondary">
                <CardBody>
                  <CardTitle>
                    <strong>Jai</strong>
                    <Button close className="text-danger" />
                    <CardText>
                      <Badge color="light">{doneAt.toDateString()}</Badge>
                    </CardText>
                  </CardTitle>
                  <hr></hr>
                  <CardSubtitle className="mb-3">
                    <h5>
                      Rs. <Badge color="danger">{expense}</Badge>
                    </h5>
                  </CardSubtitle>
                  <CardText>
                    <Badge color="info">{doneFor}</Badge>
                  </CardText>
                </CardBody>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(mapStateToProps, { getTransactions })(Transactions);
