import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardColumns,
  Container,
  Badge,
  CardSubtitle,
  Spinner
} from "reactstrap";
import { connect } from "react-redux";
import {
  getTransactions,
  deleteTransaction
} from "../actions/transactionActions";

import DeleteConfirmModal from "./DeleteConfirmModal";

export class Transactions extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired,
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    getTransactions: PropTypes.func.isRequired,
    deleteTransaction: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.isAuthenticated) this.props.getTransactions();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps === this.props) this.props.getTransactions();
  }

  render() {
    const { transactions, loading } = this.props.transaction;
    return (
      <Container>
        {loading && this.props.isAuthenticated ? (
          <Spinner
            style={{ width: "3rem", height: "3rem", marginLeft: "45%" }}
          />
        ) : null}
        {this.props.isAuthenticated ? (
          <CardColumns>
            {transactions.map(({ _id, doneFor, expense, doneAt, type }) => {
              const dd = new Date(doneAt);
              const color = type === "c" ? "success" : "danger";
              return (
                <Card key={_id} className="mb-3 mr-3" outline color={color}>
                  <CardBody>
                    <CardTitle>
                      <strong className="name">{this.props.user.name}</strong>
                      <DeleteConfirmModal id={_id} />
                      <CardText>
                        <Badge color="light">{dd.toDateString()}</Badge>
                        <Badge color="light" className="ml-1">
                          {dd.toLocaleTimeString()}
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
                      <Badge color="info">{doneFor.toUpperCase()}</Badge>
                    </CardText>
                  </CardBody>
                </Card>
              );
            })}
          </CardColumns>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { getTransactions, deleteTransaction })(
  Transactions
);
