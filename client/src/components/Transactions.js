import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// width: "3rem", height: "3rem", marginLeft: "45%"
import { CardColumns, Container, Spinner, Input, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import {
  getTransactions,
  deleteTransaction,
  filterTransactions
} from "../actions/transactionActions";

import TransactionCard from "./TransactionCard";

export class Transactions extends Component {
  state = {
    search: ""
  };
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
    if (prevProps === this.props) {
      if (this.state === prevState) this.props.getTransactions();
    }
  }

  filterTrans = e => {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.props.filterTransactions(
          this.props.transaction.transactions,
          this.state.search
        );
      }
    );
  };

  render() {
    const {
      transactions,
      filteredTransactions,
      loading
    } = this.props.transaction;
    const { search } = this.state;
    const Loader =
      loading && this.props.isAuthenticated ? (
        <div className="align-h">
          <Spinner />
        </div>
      ) : null;

    let trans = filteredTransactions.length
      ? filteredTransactions
      : transactions;
    const AllTransactions =
      search && !filteredTransactions.length ? (
        <h4>No Transactions matched ☹ !!! </h4>
      ) : this.props.isAuthenticated ? (
        <CardColumns>
          {trans.map(({ _id, doneFor, expense, doneAt, type }) => {
            const cardProps = {
              _id,
              dd: new Date(doneAt),
              color: type === "c" ? "success" : "danger",
              doneFor,
              expense,
              name: this.props.user.name
            };
            return <TransactionCard key={_id} {...cardProps} />;
          })}
        </CardColumns>
      ) : null;

    return (
      <Container>
        {this.props.isAuthenticated ? (
          <Fragment>
            <FormGroup>
              <Input
                type="text"
                name="search"
                id="search"
                placeholder="Search by purpose / tag"
                className="mb-3"
                onChange={this.filterTrans}
              />
            </FormGroup>
            {Loader}
            {AllTransactions}
          </Fragment>
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

export default connect(mapStateToProps, {
  getTransactions,
  deleteTransaction,
  filterTransactions
})(Transactions);
