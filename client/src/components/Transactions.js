import React, { Component } from "react";
import PropTypes from "prop-types";

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
import {
  getTransactions,
  deleteTransaction
} from "../actions/transactionActions";

export class Transactions extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired,
    getTransactions: PropTypes.func.isRequired,
    deleteTransaction: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getTransactions();
  }

  render() {
    const { transactions } = this.props.transaction;
    return (
      <Container>
        <CardColumns>
          {transactions.map(({ id, doneBy, doneFor, expense, doneAt }) => {
            return (
              <Card className="mb-3 mr-3" key={id} outline color="secondary">
                <CardBody>
                  <CardTitle>
                    <strong>Jai</strong>
                    <Button
                      close
                      className="text-danger"
                      onClick={() => this.props.deleteTransaction(id)}
                    />
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

export default connect(mapStateToProps, { getTransactions, deleteTransaction })(
  Transactions
);
